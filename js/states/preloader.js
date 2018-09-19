
import { AssetManager, GameObject } from 'black'; 

export class Preloader extends GameObject {
  constructor() {
    super();
    this.name = 'preloader';

    const assets = AssetManager.default;
    assets.defaultPath = '/assets/';

    assets.enqueueGoogleFont('Bungee');
    assets.enqueueVector('assets', 'assets.json', false, true);
    assets.enqueueSoundAtlas('sound_atlas', 'atlas.mp3', 'sound_atlas.json');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded() {
    this.removeFromParent();
  }
}