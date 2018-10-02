
import { GameObject, Sprite, RigidBody, TilingInfo, Vector, AssetManager, Graphics, BoxCollider } from 'black'

import { GAME_SPEED } from '../kernel/constants';
import { Pipes } from './pipes';
import Ground from './ground';

export class Level extends GameObject {
  constructor() {
    super();

    /** @type {boolean} */
    this.enabled = true;

    /** @type {Array<Pipes>} */
    this.freePipes = [];

    /** @type {Array<Pipes>} */
    this.currentVisiblePipes = [];

    /** @type {Pipes|null} */
    this.currentApproachingPipes = null;

    // Will start after tutorial's completing
    /** @type {boolean} */
    this.pipesSpawningStarted = false;

    // Container for convenient moving (all pipes together)
    /** @type {GameObject} */
    this.pipesContainer = new GameObject();

    /** @type {Ground|null} */
    this.ground = null;

    /** @type {RigidBody|null} */
    this.topRigidBody = null;
  }

  onAdded() {
    this.x = this.stage.bounds.x;

    this.ground = new Ground();
    this.ground.y = this.stage.height;

    // Fills area from ground to screen's bottom
    const groundBottomRectangle = new Graphics();
    groundBottomRectangle.beginPath();
    groundBottomRectangle.fillStyle(0xded895);
    groundBottomRectangle.rect(this.stage.bounds.x, this.ground.y - 1, this.stage.bounds.width, this.stage.bounds.height);
    groundBottomRectangle.fill();

    // Prevents the bird's flying out of screen ( top )
    this.topRigidBody = new RigidBody();
    this.topRigidBody.isStatic = true;

    const topCollider = new BoxCollider(0, this.stage.bounds.y, this.stage.bounds.width, 10);

    this.add(this.pipesContainer, this.ground, groundBottomRectangle, this.topRigidBody, topCollider);
  }

  spawnPipes() {
    // If we have free pipes ( what move out of screen ), get free. If haven't, create new pipes.
    const pipes = /** @type {Pipes} */ (this.freePipes.length ? this.freePipes.pop() : this.pipesContainer.addChild(new Pipes()));
    pipes.reset();

    if (!this.currentApproachingPipes) {
      this.currentApproachingPipes = pipes;
    }

    // Sets pipes x to right edge of screen
    pipes.x = this.stage.bounds.width + pipes.width - this.pipesContainer.x;

    this.currentVisiblePipes.push(pipes);
  }
  
  /**
   * @protected
   */
  onUpdate() {
    if (this.enabled === false)
      return;

    if (this.pipesSpawningStarted)
      this.pipesContainer.x -= GAME_SPEED;

    this.ground.tiling.wrapX -= GAME_SPEED;

    // Check that pipes out of screen
    if (this.currentVisiblePipes[0] && this.pipesContainer.localToGlobal(new Vector(this.currentVisiblePipes[0].x, 0)).x < this.stage.bounds.x) {
      this.freePipes.push(this.currentVisiblePipes.shift());
      this.currentApproachingPipes = this.currentVisiblePipes[0];
    }

    if (this.currentApproachingPipes && this.currentApproachingPipes.passed) {
      this.currentApproachingPipes = this.currentVisiblePipes[1];
    }
  }

  onGameStarted() {
    this.pipesSpawningStarted = true;
  }

  onGameOver() {
    this.enabled = false;
  }
}