import 'phaser';
import config from './config/config';
import GameScene from './scenes/GameScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import InstructionScene from './scenes/InstructionScene';
import LeaderBoardScene from './scenes/LeaderBoardScene';
import UiScene from './scenes/UiScene';
import Model from './classes/Model';
import GameOverScene from './scenes/GameOverScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Instructions', InstructionScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Score', LeaderBoardScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Ui', UiScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();