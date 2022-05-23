import Phaser from 'phaser';
import Dot from '../classes/Dot';

const GRID = {
  ROWS: 6,
  COLS: 6,
}

export const COLORS = [
  { texture: 'yellowDot', color: '0xFFFF00', id: 1 },
  { texture: 'blueDot', color: '0x00BFFF', id: 2 },
  { texture: 'greenDot', color: '0x32CD32 ', id: 3 },
  { texture: 'redDot', color: '0xFF0000', id: 4 },
  { texture: 'purpleDot', color: '0xDDA0DD', id: 5}
];

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create () {
    this.createBackground()
    this.createDots();
    this.getDotsPosition();

    this.drawing = false;
    this.drawStartX = 0;
    this.drawStartY = 0;
    this.lineColor = '';
    this.drawLine();
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createDots() {
    const dotTexture = this.textures.get('yellowDot').getSourceImage();

    this.dot = {
      diameter: dotTexture.width,
      radius: dotTexture.width / 2
    }

    this.dots = this.add.group();
  }

  getDotsPosition() {
    const offsetX = (this.sys.game.config.width / GRID.COLS) - this.dot.radius;
    const offsetY = (this.sys.game.config.height / GRID.ROWS) - this.dot.radius;

    for (let col = 0; col < GRID.COLS; col++) {
      for (let row = 0; row < GRID.ROWS; row++) {
        const ballId = Phaser.Math.Between(0, COLORS.length - 1);
        const dotX = offsetX + col * offsetX;
        const dotY = offsetY + row * offsetY;

        this.dots.add(new Dot(this, dotX, dotY, ballId, this.dots));
      }
    }
  }

  drawLine() {
    const line = this.add.graphics();

    this.input.on('pointermove', pointer => {
      if (pointer.isDown && this.drawing) {
        line.lineStyle(4, this.lineColor);
        line.beginPath();
        line.moveTo(pointer.x, pointer.y);
        line.lineTo(this.drawStartX, this.drawStartY);
        line.strokePath();
      }
    });
  }
}
