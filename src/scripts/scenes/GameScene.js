import Phaser from 'phaser';

const DOT = {
  RADIUS: 20,
  COLOR: {
    YELLOW: '0xFFFF00',
    BLUE: '0x0000FF',
    GREEN: '0x00FF00',
    RED: '0xFF0000',
    PURPLE: '0x800080'
  }
}

const GRID = {
  ROWS: 6,
  COLUMNS: 6,
  COLORS: Object.keys(DOT.COLOR).length
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create () {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.createDots();
  }

  createDots() {
    const colors = [];
    for (let color in DOT.COLOR) {
      colors.push(color);
    }

    const offsetX = (this.sys.game.config.width / GRID.COLUMNS) - DOT.RADIUS;
    const offsetY = (this.sys.game.config.height / GRID.ROWS) - DOT.RADIUS;

    for (let col = 0; col < GRID.COLUMNS; col++) {
      for (let row = 0; row < GRID.ROWS; row++) {
        const dotColor = DOT.COLOR[colors[Phaser.Math.Between(0, GRID.COLORS - 1)]];
        const dotX = offsetX + col * offsetX;
        const dotY = offsetY + row * offsetY;

        this.add.graphics()
          .fillStyle(dotColor)
          .fillCircle(
            dotX,
            dotY,
            DOT.RADIUS
          );
      }
    }
  }
}
