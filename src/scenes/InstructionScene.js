import 'phaser';
import Button from '../objects/Button';

export default class InstructionScene extends Phaser.Scene {
  constructor () {
    super('Instructions');
  }
 

  create () {
    
let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bgImage')
let scaleX = this.cameras.main.width / image.width
let scaleY = this.cameras.main.height / image.height
let scale = Math.max(scaleX, scaleY)
image.setScale(scale).setScrollFactor(0)

this.text = this.add.text(300, 40, 'How to play😎', { fontSize: 40 });

    this.leftButton = new Button(this, 300, 120, 'blueButton1', 'blueButton2', '⬅️');
    this.leftText = this.add.text(400, 100, 'Move the player to the left', { fontSize: 24 });

    this.rightButton = new Button(this, 300, 180, 'blueButton1', 'blueButton2', '➡️');
    this.rightText = this.add.text(400, 160, 'Move the player to the right', { fontSize: 24 });
    
    this.upButton = new Button(this, 300, 240, 'blueButton1', 'blueButton2', '⬆️');
    this.upText = this.add.text(400, 220, 'Move the player up', { fontSize: 24 });

    this.downButton = new Button(this, 300, 300, 'blueButton1', 'blueButton2', '⬇️');
    this.downText = this.add.text(400, 280, 'Move the player down', { fontSize: 24 });

    this.startButton = new Button(this, 600, 500, 'blueButton1', 'blueButton2', 'Start', 'Game')
    
    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

}
}