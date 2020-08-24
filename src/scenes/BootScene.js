import 'phaser';
import logoImage from '../../assets/adventure.png';
import backgroundTiled from '../../assets/level/background-extruded.png';
import items from '../../assets/items.png';
import characters from '../../assets/characters.png';
import monsters from '../../assets/monsters.png';
import goldSound from '../../assets/audio/Pickup.wav';
import EnemyDeath from '../../assets/audio/EnemyDeath.wav';
import playerAttack from '../../assets/audio/PlayerAttack.wav';
import playerDamage from '../../assets/audio/PlayerDamage.wav';
import playerDeath from '../../assets/audio/PlayerDeath.wav';
/* eslint-disable no-undef */

const jsonMap = require('../../assets/level/forestland.json');

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', logoImage);
    this.load.image('background', backgroundTiled);
    this.loadSpriteSheets();
    this.loadAudio();
    this.loadTileMap();
  }

  loadSpriteSheets() {
    this.load.spritesheet('items', items, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('characters', characters, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monsters', monsters, { frameWidth: 32, frameHeight: 32 });
  }

  loadAudio() {
    this.load.audio('goldSound', goldSound);
    this.load.audio('enemyDeath', EnemyDeath);
    this.load.audio('playerAttack', playerAttack);
    this.load.audio('playerDamage', playerDamage);
    this.load.audio('playerDeath', playerDeath);
  }

  loadTileMap() {
    this.load.tilemapTiledJSON('map', jsonMap);
  }

  create() {
    this.scene.start('Preloader');
  }
}