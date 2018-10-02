
import { GameObject, Sprite, RigidBody, MathEx, AssetManager, TilingInfo, DisplayObject } from 'black'
import { Pipes } from './pipes';

export default class Pipe extends DisplayObject {
  constructor(scaleYSign = 1) {
    super();

    let pipe = new Sprite('pipe');
    pipe.scaleY *= scaleYSign;

    /** @type {RigidBody} */
    this.pipeRigidBody = /** @type {RigidBody}) */ (this.addComponent(new RigidBody()));
    this.pipeRigidBody.isStatic = true;

    const tile = new Sprite('pipe_tile');
    tile.scaleY *= scaleYSign * 100;
    tile.x = (pipe.width - tile.width) * 0.5;

    /** @type {RigidBody} */
    this.tileRigidBody = /** @type {RigidBody}) */ (tile.addComponent(new RigidBody()));
    this.tileRigidBody.isStatic = true;

    this.add(tile, pipe);
  }

  onAdded() {
  }
}