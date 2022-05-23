import Phaser from 'phaser';
import bg from '../../assets/bg.png'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload () {
    this.load.image('bg', bg);
  }

  create () {
    this.scene.start('Preload');
  }
}
