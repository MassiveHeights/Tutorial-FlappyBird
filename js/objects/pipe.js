
import { GameObject, Sprite, RigidBody, MathEx, AssetManager, TilingInfo } from 'black'
import { Pipes } from './pipes';

export default class Pipe extends Sprite {
  constructor(scaleYSign = 1) {
    super('pipe');

    this.scaleY *= scaleYSign;    

    /** @type {RigidBody} */
    this.rigidBody = /** @type {RigidBody}) */ (this.addComponent(new RigidBody()));
    this.rigidBody.isStatic = true;
  }

  onAdded() {
  }
}