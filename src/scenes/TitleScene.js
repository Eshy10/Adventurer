import 'phaser';
import Button from '../objects/Button';
import config from '../config/config';
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }
 
  create () {

let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bgImage')
let scaleX = this.cameras.main.width / image.width
let scaleY = this.cameras.main.height / image.height
let scale = Math.max(scaleX, scaleY)
image.setScale(scale).setScrollFactor(0)



this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Instructions');
 
this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');

this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');


this.model = this.sys.game.globals.model;
if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
  this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
  this.bgMusic.play();
  this.model.bgMusicPlaying = true;
  this.sys.game.globals.bgMusic = this.bgMusic;
}
  }
};

