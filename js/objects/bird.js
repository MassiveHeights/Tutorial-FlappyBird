
import { Sprite, AssetManager, AnimationController, RigidBody, BoxCollider, Vector, MathEx, MasterAudio } from 'black';

export class Bird extends Sprite {
  constructor() {
    super('bird_1');

    /** @type {boolean} */
    this.enabled = true;

    /** @type {number} */
    this.prevY = 0;

    /** @type {number} */
    this.globalX = 0;

    /** @type {RigidBody|null} */
    this.rigidBody = null;

    /** @type {AnimationController|null} */
    this.anim = null;

    this.alignPivot();
  }

  onAdded() {
    // Creates frame animation
    const anim = this.anim = new AnimationController();

    // "*" - means that all textures with prefix "bird_" and suffix as number will be taken ( bird_1, bird_2... )
    anim.add('idle', AssetManager.default.getTextures('bird_*'), 10);
    anim.play('idle');

    const rigidBody = this.rigidBody = new RigidBody();
    rigidBody.mass = 0.3;
    rigidBody.bounce = 0;
    rigidBody.isStatic = true;

    // We can customize colliding size of rigid body by box collider 
    // TIP: default value of box collider is equal to texture's bounds 
    const collider = new BoxCollider(-this.width * 0.4, -this.height * 0.3, this.width * 0.8, this.height * 0.6);

    this.add(anim, rigidBody, collider);

    this.x = this.stage.bounds.x + 100;
    this.y = this.stage.height * 0.5 - 100;

    this.prevY = this.y;

    // Our bird doesn't move, so we can calculate global x once
    this.globalX = this.parent.localToGlobal(new Vector(this.x - (this.width * 0.5), 0)).x;
  }

  onGameStarted() {
    this.rigidBody.isStatic = false;
  }

  onGameOver() {
    this.anim.stop();
  }

  /**
   * @protected
   */
  onUpdate() {
    if (this.enabled === false)
      return;

    this.rotation = MathEx.clamp(MathEx.angleBetween(this.x, this.prevY, this.x + 1, this.y), this.rotation - 0.5, this.rotation + 0.07);
    this.prevY = this.y;
  }

  addForceY() {
    // Clear previous velocity as in original game
    this.rigidBody.velocityY = 0;
    this.rigidBody.forceY = Bird.FORCE_Y;

    MasterAudio.play('sfx_wing', 'master', 0.5);
  }

  offRotationCalculating() {
    this.enabled = false;
  }
}

Bird.FORCE_Y = -1300 * 7;