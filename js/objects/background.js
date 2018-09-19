
import { GAME_SPEED } from '../kernel/constants';

import { AssetManager, Sprite, TilingInfo } from 'black';

export class Background extends Sprite {
  constructor() {
    super('bg');
    this.alignAnchor(0, 1);
  }
  
  onAdded() {
    this.x = this.stage.bounds.x;
    this.y = this.stage.height;
    
    // For tiling we need to know texture's size
    const t = AssetManager.default.getTexture('bg');
    this.tiling = new TilingInfo(t.width, t.height);
  
    // Scales background to whole screen
    this.scale = Math.max((this.stage.bounds.height - this.stage.bounds.y) / this.height, this.stage.bounds.width / this.width);
  }

  onUpdate() {
    // Change tiling wrapX we make it move
    this.tiling.wrapX -= GAME_SPEED * 0.25;
  }

  onGameOver() {
    this.onUpdate = () => {};
  }
}