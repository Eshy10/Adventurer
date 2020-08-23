import Phaser from 'phaser';
import Button from '../objects/Button';
import config from '../config/config';
import Api  from '../objects/Api';

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
    // Background
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bgImage')
    let scaleX = this.cameras.main.width / image.width
    let scaleY = this.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)

    const user = this.sys.game.globals.model.userName;

    this.score = this.add.text(230, 30,
      `Game over😩 ${user}, Your score is: ${this.sys.game.globals.model.score}`, {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });

      Api.submitScores(this.model.userName, this.model.score);

    this.gameButton = new Button(this, 400, (config.height / 2) + 170,
      'blueButton1', 'blueButton2', 'Submit', 'Score');
  }
}