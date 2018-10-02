import { RigidBody, Sprite, TilingInfo, AssetManager } from "black";

export default class Ground extends Sprite {
  constructor() {
    super('ground');

    this.alignPivot(0, 1);

    /** @type {RigidBody} */
    this.rigidBody = new RigidBody();
    this.rigidBody.isStatic = true;

    this.add(this.rigidBody);
  }

  onAdded() {
    this.tiling = new TilingInfo(this.stage.bounds.width, AssetManager.default.getTexture('ground').height);
  }
}