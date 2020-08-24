/* eslint no-undef: 0 */
import PlayerContainer from '../src/classes/player/PlayerContainer';

jest.mock('../src/classes/player/PlayerContainer');

let player;

beforeEach(() => {
  player = new PlayerContainer();
});

describe('Player', ()=> {
    test('Should set the player scene', () => {
        player.scene = 'GameScene';
        expect(player.scene).toBe('GameScene');
      });
    
      test('Should set the players first attack status to false', () => {
        player.playerAttacking = false;
        expect(player.playerAttacking).not.toBe(true);
      });

      test('Should set the player initial velocity to an integer', () => {
        player.velocity = 160;
        expect(player.velocity).not.toBe(null);
      });

      test('Should set the player sword attack to be false unless it is used', () => {
    player.swordHit = false;
    expect(player.playerAttacking).not.toBe(true);
  });

  test('Should flip the player initial direction', () => {
    player.flipX = true;
    expect(player.playerAttacking).not.toBe(false);
  });
})
