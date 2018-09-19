
import { Black, Arcade, AssetManager, GameObject, StageScaleMode, StageOrientation } from 'black';

import { Preloader } from './states/preloader';
import { Game } from './states/game';

export class App extends GameObject {
  constructor () {
    super();

    // Initialize gravity for arcade physics
    const arcade = Black.instance.getSystem(Arcade);
    arcade.gravityY = 1400;

    // Propagate input events to children elements
    this.touchable = true;

    // Needs to remove current game on restarting 
    this.currentGame = null;

    // Try to keep stage size withing desired width and height
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(960, 640);

    Black.stage.orientation = StageOrientation.PORTRAIT;
    
    // Prevents orientation changing
    Black.stage.orientationLock = true;

    // When all assets is loaded - start the game
    AssetManager.default.on('complete', this.startGame, this);

    // Runs when "restartGame" event will be posted from the "cta.js" file
    this.on('restartGame', this.restartGame, this);
  }

  onAdded() {
    this.addChild(new Preloader());
  }

  startGame() {
    this.currentGame = new Game();
    this.addChild(this.currentGame);
  }

  restartGame() {
    
    // Clears previous game
    this.currentGame.removeFromParent();

    this.startGame();
  }
}