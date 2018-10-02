
import { TextField, Tween } from 'black';

export class Tutorial extends TextField {
  constructor() {
    super('Tap to fly higher!', 'Bungee', 0xffffff, 52);

    this.alignPivot();

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

  hide() {
    let fadeOut = new Tween({ alpha: 0 }, 0.3);

    this.add(fadeOut);
  }
}