import 'phaser';

const jsonMap = require('../../assets/level/forestland.json');
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('logo', 'assets/adventure.png');
    this.load.image('background', 'assets/level/background-extruded.png');
    this.loadSpriteSheets();
    this.loadAudio();
    this.loadTileMap();
  }

  loadSpriteSheets() {
    this.load.spritesheet('items', 'assets/items.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('characters', 'assets/characters.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monsters', 'assets/monsters.png', { frameWidth: 32, frameHeight: 32 });
  }

  loadAudio() {
    this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
    this.load.audio('enemyDeath', ['assets/audio/EnemyDeath.wav']);
    this.load.audio('playerAttack', ['assets/audio/PlayerAttack.wav']);
    this.load.audio('playerDamage', ['assets/audio/PlayerDamage.wav']);
    this.load.audio('playerDeath', ['assets/audio/PlayerDeath.wav']);
  }

  loadTileMap() {

    this.load.tilemapTiledJSON('map', jsonMap);
  }
 
  create () {
    this.scene.start('Preloader');
  }
};