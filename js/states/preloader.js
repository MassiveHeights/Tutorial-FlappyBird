
import { AssetManager, GameObject } from 'black'; 

export class Preloader extends GameObject {
  constructor() {
    super();

    this.name = 'preloader';

    const assets = AssetManager.default;
    assets.defaultPath = '/assets/';

    assets.enqueueGoogleFont('Bungee');

    // false  means that svg file itself should not be baked
    // true means that we want to bake every group inside svg into separate texture
    assets.enqueueVector('assets', 'assets.json', false, true);

    assets.enqueueSoundAtlas('sound_atlas', 'atlas.mp3', 'sound_atlas.json');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded() {
    window['done'] = true;
    
    this.removeFromParent();
  }
}