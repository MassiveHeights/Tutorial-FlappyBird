
import { GameObject, Sprite, RigidBody, MathEx, AssetManager, TilingInfo } from 'black'
import Pipe from './pipe';

export class Pipes extends GameObject {
  constructor() {
    super();
    this.passed = false;

    // Keep all rigid bodies to convenient collide checking
    /** @type {Array<RigidBody>} */
    this.rigidBodies = [];

    // anchor x 1 to convenient pass checking 
    this.alignPivot(1, 0.5);
  }

  onAdded() {
    this.createPipe(-1); // Top pipes
    this.createPipe(); // Bottom pipes
  }

  createPipe(scaleYSign = 1) {
    const pipe = new Pipe(scaleYSign);
    pipe.y = Pipes.DISTANCE_BETWEEN_PIPES * 0.5 * scaleYSign;

    //this.rigidBodies.push(pipe.pipeRigidBody, pipe.tileRigidBody);
    this.rigidBodies.push(pipe.pipeRigidBody);

    this.addChild(pipe);
  }

  reset() {
    this.y = this.stage.height * 0.5 + MathEx.randomBetween(-100, 100);
    this.passed = false;
  }

  removeRigidBodies() {
    this.rigidBodies.forEach((body) => {
      body.removeFromParent();
    });
  }
}

Pipes.DISTANCE_BETWEEN_PIPES = 150;