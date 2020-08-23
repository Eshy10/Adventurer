import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';
import { submitScores } from '../objects/Api';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameOver' });
  }

  init() {
    this.model = this.sys.game.globals.model;
    this.gameScene = this.scene.get('Game');
  }

  preload() {
    this.load.image('gameOverTitle', 'assets/ui/blue_button02.png');
  }

  create() {
    const user = this.sys.game.globals.model.userName;
    // Background
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bgImage')
    let scaleX = this.cameras.main.width / image.width
    let scaleY = this.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)

    this.score = this.add.text(230, 30,
      `Hello ${user}, your score is: ${this.sys.game.globals.model.score}`, {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });

      submitScores(this.model.userName, this.model.score);

    this.gameButton = new Button(this, 400, (config.height / 2) + 170,
      'blueButton1', 'blueButton2', 'Submit', 'Score');
  }
}