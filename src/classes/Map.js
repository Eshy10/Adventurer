export default class Map {
    constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
      this.scene = scene; // the scene this map belongs to
      this.key = key; // Tiled JSON file key name
      this.tileSetName = tileSetName; // Tiled Tileset image key name
      this.bgLayerName = bgLayerName; // the name of the layer created in tiled for the map background
      this.blockedLayerName = blockedLayerName; // the name of the layer created in tiled for the blocked areas
  
      this.createMap();
    }
  
    createMap() {
      // create the tile map
      this.map = this.scene.make.tilemap({ key: this.key });
  
      // add the tileset image to our map
      this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);
  
      // create our background
      this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);
      this.backgroundLayer.setScale(2);
  
      // create blocked layer
      this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
      this.blockedLayer.setScale(2);
      this.blockedLayer.setCollisionByExclusion([-1]);
  
      // update the world bounds
      this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
      this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;
  
      // limit the camera to the size of our map
      this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);
    }
  }