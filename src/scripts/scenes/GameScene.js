import Phaser from 'phaser';

const GAME_CONSTANTS = {
  NUM_ROWS: 6,
  NUM_COLUMNS: 6,
  NUM_COLORS: 5
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create () {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }
}
