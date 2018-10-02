
import { DisplayObject, Tween, TextField, MasterAudio, Sprite } from 'black';
import { ScoreBoard } from './score-board';

export class CTA extends DisplayObject {
  constructor() {
    super();

    this.touchable = true;
    this.alpha = 0;

    /** @type {boolean} */
    this.shown = false;

    /** @type {ScoreBoard|null} */
    this.scoreBoard = null;

    /** @type {Sprite|null} */
    this.replayBtn = null;
  }
  
  onAdded() {
    const gameOverText = new TextField('Game Over', 'Bungee', 0xF2AA5B, 60);
    gameOverText.strokeThickness = 8;
    gameOverText.strokeColor = 0x000000;
    gameOverText.y = -200;
  
    gameOverText.dropShadow = true;
    gameOverText.shadowColor = 0x000000;
    gameOverText.shadowDistanceX = 5;
    gameOverText.shadowDistanceY = 5;

    gameOverText.alignPivotOffset();
    
    const scoreBoard = this.scoreBoard = new ScoreBoard();
    
    const replayBtn = this.replayBtn = new Sprite('btn_play');
    replayBtn.alpha = 0;
    replayBtn.x = -10;
    replayBtn.y = scoreBoard.height * 0.5 + 90;
    replayBtn.touchable = true;
    replayBtn.alignPivotOffset()
    
    this.add(scoreBoard, replayBtn, gameOverText);

    this.x = this.stage.centerX;
    this.y = this.stage.centerY;
  }

  show() {
    const fromY = 100;

    this.shown = true;
    this.y += fromY;
    this.replayBtn.y += fromY;

    const boardTw = new Tween({ alpha: 1, y: this.y - fromY }, 0.5);
    const replayTw = new Tween({ alpha: 1, y: this.replayBtn.y - fromY }, 0.5);

    this.add(boardTw);
    this.replayBtn.add(replayTw);

    replayTw.on('complete', () => {
      this.replayBtn.once('pointerDown', this.hide, this);

      MasterAudio.play('sfx_swooshing', 'master', 0.5);
    });
  }

  hide() {
    let fadeOut = new Tween({ alpha: 0 }, 0.3);
    
    fadeOut.on('complete', () => {
      // "~" stands for "bubbling" and all  parents will receive this message
      this.post('~restartGame');
    });

    this.add(fadeOut);
  }
}