import Phaser from 'phaser';
import LoadingBar from '../classes/LoadingBar';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload () {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.LoadingBar = new LoadingBar(this);
  }

  create () {
    console.log('preload create');
    this.scene.start('Game');
  }
}