
import { Arcade, Black, GameObject, Input, Timer, Vector, MasterAudio, MessageBinding } from 'black';

import { GAME_SPEED } from '../kernel/constants';

import { Background } from '../objects/background';
import { Level } from '../objects/level';
import { Bird } from '../objects/bird';
import { Score } from '../objects/score';
import { Tutorial } from '../objects/tutorial';
import { CTA } from '../objects/cta';

export class Game extends GameObject {
  constructor() {
    super();

    // Propagate input events to children elements
    this.touchable = true;

    /** @type {Background} */
    this.background = new Background();

    /** @type {Level} */
    this.level = new Level();

    /** @type {Bird} */
    this.bird = new Bird();

    /** @type {Score} */
    this.score = new Score();

    /** @type {Tutorial} */
    this.tutorial = new Tutorial();

    /** @type {CTA} */
    this.cta = new CTA();

    /** @type {MessageBinding|null} */
    this.birdAddForceYBuilding = null;

    /** @type {boolean} */
    this.started = true;

    /** @type {Timer} */
    this.timerToSpawnPipes = new Timer(GAME_SPEED * 0.4, 1, false);
  }

  onAdded() {
    this.timerToSpawnPipes.on('complete', () => {
      this.timerToSpawnPipes.start();
      this.level.spawnPipes();
    });

    this.add(this.background, this.level, this.bird, this.score, this.tutorial, this.cta, this.timerToSpawnPipes);

    // Will run "startGame" method if user touch the screen, or click by mouse
    Input.once('pointerDown', this.startGame, this);

    // Save building for their offing in end screen ( prevents bird's flying on the end screen )
    this.birdAddForceYBuilding = Input.on('pointerDown', this.bird.addForceY, this.bird);
  }

  startGame() {
    this.tutorial.hide();
    this.score.show();

    this.bird.onGameStarted();
    this.level.onGameStarted();

    this.timerToSpawnPipes.start();

    this.started = true;
  }

  onGameOver() {
    if (this.cta.shown)
      return;

    this.level.onGameOver();
    this.bird.onGameOver();
    this.background.onGameOver();
    this.score.hide();

    // We can't fly anymore (
    this.birdAddForceYBuilding.off();

    this.cta.scoreBoard.setScore(this.score.getScoreValues());
    this.cta.show();

    MasterAudio.play('sfx_hit', 'master', 0.5);
  }
  
  /**
   * @protected
   */
  onUpdate() {
    const arcade = /** @type {Arcade} */ (Black.instance.getSystem(Arcade));
    const groundBody = this.level.ground.rigidBody;
    const birdBody = this.bird.rigidBody;

    // Checks colliding with ground
    arcade.isColliding(groundBody, birdBody, () => {
      this.onGameOver();
      this.bird.offRotationCalculating();
    });

    // Can't check collide with pipes if we haven't they
    if (!this.level.currentApproachingPipes)
      return;

    // We have 2 pipes and 2 rigid bodies on each 
    const rigidBodiesToCheck = this.level.currentApproachingPipes.rigidBodies;

    for (let i = 0, l = rigidBodiesToCheck.length, body; i < l; i++) {
      body = rigidBodiesToCheck[i];

      arcade.isColliding(body, birdBody, () => {
        this.onGameOver();

        // Allows bird to fall down to the ground 
        this.level.currentApproachingPipes.removeRigidBodies();
      });
    }

    // Checks that bird passed approaching pipes 
    // Bird and pipes have different parents, so we need check their global positions
    const localPipePosition = new Vector(this.level.currentApproachingPipes.x, 0);
    const globalPipesX = this.level.pipesContainer.localToGlobal(localPipePosition).x;

    if (!this.cta.shown && globalPipesX < this.bird.globalX) {
      this.score.addOne();
      this.level.currentApproachingPipes.passed = true;

      MasterAudio.play('sfx_point', 'master', 0.5);
    }
  }
}