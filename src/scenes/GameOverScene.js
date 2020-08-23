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
    this.load.image('gameOverTitle', 'assets/ui/blue_button02.png');
  }

  create() {
    // const user = this.sys.game.globals.model.userName;

    this.playerName = this.add.text(215, 400, 'Enter your name: ', { fontSize: 20, fontFamily: 'monospace' });
    const input = this.add.dom(480, 412, 'input', {
        type: 'text',
        name: 'nameField',
        fontSize: '32px',
        backgroundColor: '#fff',
      });
      input.scaleX = 0.4;
      input.scaleY = 0.6;
  
  
        if (input.node.value) {
          this.model = this.sys.game.globals.model;
          this.model.userName = input.node.value;
        }else {
            return
        }
      
    // Background
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bgImage')
    let scaleX = this.cameras.main.width / image.width
    let scaleY = this.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)

    this.score = this.add.text(230, 30,
      `Game over😩, Your score is: ${this.sys.game.globals.model.score}`, {
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