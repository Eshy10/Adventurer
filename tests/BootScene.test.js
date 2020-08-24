/* eslint no-undef: 0 */
import BootScene from '../src/scenes/TitleScene';

test('Bootscene is a subclass of Phaser.SCENE', () => {
  expect(BootScene).toBeSubclassOf(Phaser.Scene);
});