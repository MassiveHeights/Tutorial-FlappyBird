
import { TextField, Tween } from 'black';

export class Score extends TextField {
  constructor() {
    super('0', 'Bungee', 0xffffff, 62);
    this.alpha = 0;
    this.alignAnchor();

    this.strokeThickness = 8;
    this.strokeColor = 0x000000;
  
    this.dropShadow = true;
    this.shadowColor = 0x000000;
    this.shadowDistanceX = 5;
    this.shadowDistanceY = 5;
  }
  
  onAdded() {
    this.x = this.stage.width * 0.5;
    this.y = this.stage.height * 0.25;
  }

  addOne() {
    this.text = (++this.text).toString();
  }

  show() {
    let fadeIn = new Tween({ alpha: 1 }, 0.3, { delay: 0.2 });

    this.addComponent(fadeIn);
  }

  hide() {
    let fadeOut = new Tween({ alpha: 0 }, 0.3);

    this.addComponent(fadeOut);
  }

  getScoreValues() {
    if ( +this.text > +Score.bestScore ) {
      Score.bestScore = this.text;
    }

    return { current: this.text, best: Score.bestScore };
  }
}

Score.bestScore = '0';