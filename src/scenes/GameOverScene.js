import Phaser from 'phaser';
import Button from '../objects/Button';
import config from '../config/config';
import Api from '../objects/Api';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  init() {
    this.model = this.sys.game.globals.model;
    this.gameScene = this.scene.get('Game');
  }

  preload() {
  }

  create() {
    const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bgImage');
    const scaleX = this.cameras.main.width / image.width;
    const scaleY = this.cameras.main.height / image.height;
    const scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    this.gameImage = this.add.image(300, 220, 'characters', 5);
    this.gameImage.setScale(5);

    this.gameImage = this.add.image(550, 220, 'monsters', 7);
    this.gameImage.setScale(5);

    this.gameImage = this.add.image(850, 220, 'monsters', 1);
    this.gameImage.setScale(5);

    const user = this.sys.game.globals.model.userName;

    this.score = this.add.text(230, 50,
      `Game over 😩 ${user}, Your score is: ${this.sys.game.globals.model.score}`, {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });

    Api.submitScores(this.model.userName, this.model.score);

    this.gameText = this.add.text(230, 100,
      'Click on the button below to add your score to the score board', {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });

    this.gameButton = new Button(this, 600, 370,
      'blueButton1', 'blueButton2', 'Submit', 'Score');
  }
}