
import { Sprite, TextField } from "black";

export class ScoreBoard extends Sprite {
  constructor() {
    super('board');
    this.alignAnchor();
  }

  onAdded() {
    const offset = 50;

    const currentScoreText = this.createText('SCORE', 'arial', 0xE57C47, 35, this.height * 0.25);
    const currentScoreNumber = this.currentScoreNumber = this.createText('0', 'Bungee', 0xFFFFFF, 40, currentScoreText.y + offset);
    currentScoreNumber.strokeThickness = 4;
    currentScoreNumber.strokeColor = 0x000000;

    const bestScoreText = this.createText('BEST', 'arial', 0xE57C47, 35, this.height * 0.65);
    const bestScoreNumber = this.bestScoreNumber = this.createText('0', 'Bungee', 0xFFFFFF, 40, bestScoreText.y + offset);
    bestScoreNumber.strokeThickness = 4;
    bestScoreNumber.strokeColor = 0x000000;
    
    this.add(currentScoreText, currentScoreNumber, bestScoreText, bestScoreNumber);
  }

  createText(value, font, color, size, y) {
    const text = new TextField(value, font, color, size);
    text.alignAnchor();
    text.x = this.width * 0.5;
    text.y = y;

    return text;
  }

  setScore(scoreValue) {
    this.currentScoreNumber.text = scoreValue.current;
    this.bestScoreNumber.text = scoreValue.best;
  }
}