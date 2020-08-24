import 'phaser';
import Button from '../objects/Button';
import Button2 from '../../assets/ui/blue_button02.png';

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  create() {
    const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bgImage');
    const scaleX = this.cameras.main.width / image.width;
    const scaleY = this.cameras.main.height / image.height;
    const scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    this.text = this.add.text(300, 40, 'How to play😎', { fontSize: 40 });

    this.leftButton = new Button(this, 300, 120, 'blueButton1', 'blueButton2', '⬅️');
    this.leftText = this.add.text(400, 100, 'Move the player to the left', { fontSize: 24 });

    this.rightButton = new Button(this, 300, 180, 'blueButton1', 'blueButton2', '➡️');
    this.rightText = this.add.text(400, 160, 'Move the player to the right', { fontSize: 24 });

    this.upButton = new Button(this, 300, 240, 'blueButton1', 'blueButton2', '⬆️');
    this.upText = this.add.text(400, 220, 'Move the player up', { fontSize: 24 });

    this.downButton = new Button(this, 300, 300, 'blueButton1', 'blueButton2', '⬇️');
    this.downText = this.add.text(400, 280, 'Move the player down', { fontSize: 24 });

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.intro = this.add.text(215, 400, 'Enter your name: ', { fontSize: 20, fontFamily: 'monospace' });

    const input = this.add.dom(480, 410, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '32px',
      backgroundColor: '#fff',
    });
    input.scaleX = 0.4;
    input.scaleY = 0.6;

    const style = `background: url(${Button2}); border: none; border-radius: 5px; color: #fff;`;
    const gameButton = this.add.dom(590, 412, 'button', style, 'Play');
    gameButton.scaleX = 1.5;
    gameButton.scaleY = 1.7;
    gameButton.addListener('click');

    gameButton.on('click', () => {
      if (input.node.value) {
        this.model = this.sys.game.globals.model;
        this.model.userName = input.node.value;
        this.scene.start('Game');
      }
    });
  }
}