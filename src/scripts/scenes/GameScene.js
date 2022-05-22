import Phaser from 'phaser';
import Grid from '../classes/Grid';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {}

  create () {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.grid = new Grid(this);
  }
}
