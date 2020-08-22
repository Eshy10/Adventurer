import Spawner from './Spawner';
import PlayerModel from './PlayerModel';
import { SpawnerType } from './utils';

export default class GameManager {
    constructor(scene, mapData) {
      this.scene = scene;
      this.mapData = mapData;
  
      this.spawners = {};
      this.chests = {};
      this.monsters = {};
      this.players = {};
  
      this.playerLocations = [];
      this.chestLocations = {};
      this.monsterLocations = {};
    }
  
    setup() {
      this.parseMapData();
      this.setupEventListener();
      this.setupSpawners();
      this.spawnPlayer();
    }
  
    parseMapData() {
      this.mapData.forEach((layer) => {
        if (layer.name === 'player_locations') {
          layer.objects.forEach((obj) => {
            this.playerLocations.push([obj.x, obj.y]);
          });
        } else if (layer.name === 'chest_locations') {
          layer.objects.forEach((obj) => {
            if (this.chestLocations[obj.properties.spawner]) {
              this.chestLocations[obj.properties.spawner].push([obj.x, obj.y]);
            } else {
              this.chestLocations[obj.properties.spawner] = [[obj.x, obj.y]];
            }
          });
        } else if (layer.name === 'monster_locations') {
          layer.objects.forEach((obj) => {
            if (this.monsterLocations[obj.properties.spawner]) {
              this.monsterLocations[obj.properties.spawner].push([obj.x, obj.y]);
            } else {
              this.monsterLocations[obj.properties.spawner] = [[obj.x, obj.y]];
            }
          });
        }
      });
    }
  
    setupEventListener() {
      this.scene.events.on('pickUpChest', (chestId, playerId) => {
     
        if (this.chests[chestId]) {
          const { gold } = this.chests[chestId];
  
          // updating the players gold
          this.players[playerId].updateGold(gold);
          this.scene.events.emit('updateScore', this.players[playerId].gold);
  
          // removing the chest
          this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
          this.scene.events.emit('chestRemoved', chestId);
        }
      });
  
      this.scene.events.on('monsterAttacked', (monsterId, playerId) => {
        // update the spawner
        if (this.monsters[monsterId]) {
          const { gold, attack } = this.monsters[monsterId];
  
          // subtract health monster model
          this.monsters[monsterId].loseHealth();
  
          // check the monsters health, and if dead remove that object
          if (this.monsters[monsterId].health <= 0) {
            // updating the players gold
            this.players[playerId].updateGold(gold);
            this.scene.events.emit('updateScore', this.players[playerId].gold);
  
            // removing the monster
            this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
            this.scene.events.emit('monsterRemoved', monsterId);
  
            // add bonus health to the player
            this.players[playerId].updateHealth(2);
            this.scene.events.emit('updatePlayerHealth', playerId, this.players[playerId].health);
          } else {
            // update the players health
            this.players[playerId].updateHealth(-attack);
            this.scene.events.emit('updatePlayerHealth', playerId, this.players[playerId].health);
  
            // update the monsters health
            this.scene.events.emit('updateMonsterHealth', monsterId, this.monsters[monsterId].health);
  
            // check the player's health, if below 0 have the player respawn
            if (this.players[playerId].health <= 0) {
              // update the gold the player has
              this.players[playerId].updateGold(parseInt(-this.players[playerId].gold / 2), 10);
              this.scene.events.emit('updateScore', this.players[playerId].gold);
  
              // respawn the player
              this.players[playerId].respawn();
              this.scene.events.emit('respawnPlayer', this.players[playerId]);
            }
          }
        }
      });
    }
  
    setupSpawners() {
      const config = {
        spawnInterval: 1000,
        limit: 10,
        spawnerType: SpawnerType.CHEST,
        id: '',
      };
      let spawner;
  
      // create chest spawners
      Object.keys(this.chestLocations).forEach((key) => {
        config.id = `chest-${key}`;
        spawner = new Spawner(
          config,
          this.chestLocations[key],
          this.addChest.bind(this),
          this.deleteChest.bind(this),
  //        this.moveChests.bind(this),
        );
        this.spawners[spawner.id] = spawner;
      });
  
      // create monster spawners
      Object.keys(this.monsterLocations).forEach((key) => {
        config.id = `monster-${key}`;
        config.spawnerType = SpawnerType.MONSTER;
  
        spawner = new Spawner(
          config,
          this.monsterLocations[key],
          this.addMonster.bind(this),
          this.deleteMonster.bind(this),
          this.moveMonsters.bind(this),
        );
        this.spawners[spawner.id] = spawner;
      });
    }
  
    spawnPlayer() {
      const player = new PlayerModel(this.playerLocations);
      this.players[player.id] = player;
      this.scene.events.emit('spawnPlayer', player);
    }
  
    addChest(chestId, chest) {
      this.chests[chestId] = chest;
      this.scene.events.emit('chestSpawned', chest);
    }
  
    deleteChest(chestId) {
      delete this.chests[chestId];
    }
  //moveChests() {
  //this.scene.events.emit('chestMovement', this.chests);  
  //}
  
    addMonster(monsterId, monster) {
      this.monsters[monsterId] = monster;
      this.scene.events.emit('monsterSpawned', monster);
    }
  
    deleteMonster(monsterId) {
      delete this.monsters[monsterId];
    }
  
    moveMonsters() {
      this.scene.events.emit('monsterMovement', this.monsters);
    }
  }