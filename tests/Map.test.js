/* eslint no-undef: 0 */
import Map from '../src/classes/Map';

jest.mock('../src/classes/Map');

let map;

beforeEach(() => {
  map = new Map();
});

describe('Map', ()=> {
    test('Should set the for the map', () => {
        map.scene = 'map';
        expect(map.scene).toBe('map');
      });
    
      test('Should set the tileSetName layer level for the map', () => {
        map.tileSetName = 'tileSetName';
        expect(map.tileSetName).toBe('tileSetName');
      });
    
      test('Should set the bgLayerName layer level for the map', () => {
        map.bgLayerName = 'bgLayerName';
        expect(map.bgLayerName).toBe('bgLayerName');
      });
    
      test('Sould return an eblocked layer of the map', () => {
        map.blockedLayerName = 'blockedLayerName';
        expect(map.blockedLayerName).toBe('blockedLayerName');
      });
})


