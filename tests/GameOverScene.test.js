/* eslint no-undef: 0 */
import GameOverScene from '../src/scenes/GameOverScene';

test('GameOverScene is a subclass of Phaser.Scene', () => {
  expect(GameOverScene).toBeSubclassOf(Phaser.Scene);
});