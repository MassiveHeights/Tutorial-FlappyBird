
import { GAME_SPEED } from '../kernel/constants';
import { AssetManager, Sprite, TilingInfo } from 'black';

export class Background extends Sprite {
  constructor() {
    super('bg');

    /** @type {boolean} */
    this.enabled = true;

    /** @type {TilingInfo|null} */
    this.tiling = null;

    /** @type {number} */
    this.scale = 0;

    this.alignPivot(0, 1);
  }

  onAdded() {
    this.x = this.stage.bounds.x;
    this.y = this.stage.height;

    // For tiling we need to know texture's size
    const t = AssetManager.default.getTexture('bg');
    this.tiling = new TilingInfo(t.width, t.height);

    // Scales background to whole screen
    this.scale = Math.max((this.stage.height - this.stage.bounds.y) / t.width, this.stage.width / t.height);
  }

  /**
   * @protected
   */
  onUpdate() {
    if (this.enabled === false)
      return;

    // Change tiling wrapX we make it move
    this.tiling.wrapX -= GAME_SPEED * 0.25;
  }

  onGameOver() {
    this.enabled = false;
  }
}