import Phaser from 'phaser';
import Button from '../objects/Button';
import Api  from '../objects/Api';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {

let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bgImage')
let scaleX = this.cameras.main.width / image.width
let scaleY = this.cameras.main.height / image.height
let scale = Math.max(scaleX, scaleY)
image.setScale(scale).setScrollFactor(0)
    this.add.text(400, 100, 'Leader Board', {
      color: 'white',
      fontSize: '32px ',
    }).setOrigin(0.5, 0.5);

    Api.fetchScores().then((scores) => {
      const scoreStyle = {
        color: 'white',
        fontSize: '38px ',
      };

      scores.sort((x, y) => y.score - x.score);
      const space = 40;
      for (let i = 0; i < 5; i += 1) {
        if (scores[i] !== undefined) {
          this.add.text(60, 200 + (space * i),
            `${i + 1}. Name: ${scores[i].user} -- Score: ${scores[i].score}`,
            scoreStyle);
        }
      }
    });

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Restart', 'Game').setInteractive();

    this.menuButton.on('pointerdown', () => {
      this.model = this.sys.game.globals.model;
      this.model.score = 0;
      this.scene.start('Game');
    });
  }
}