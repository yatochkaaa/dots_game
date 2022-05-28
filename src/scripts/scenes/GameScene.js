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

    this.drawStartDot;
    this.connectLines = [];
    this.lineColor = '';
    this.dotsChain = [];

    this.drawLine();
    this.endDraw();
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createDots() {
    const dotTexture = this.textures.get(COLORS[0].texture).getSourceImage();

    this.dot = { radius: dotTexture.width / 2 };
    this.dots = this.add.group();
  }

  getDotsPosition() {
    this.newDotsArr = [];
    this.gapX = (this.sys.game.config.width / GRID.COLS) - this.dot.radius;
    this.gapY = (this.sys.game.config.height / GRID.ROWS) - this.dot.radius;

    for (let col = 1; col <= GRID.COLS; col++) {
      for (let row = 1; row <= GRID.ROWS; row++) {
        const ballId = Phaser.Math.Between(0, COLORS.length - 1);
        const dotX = col * this.gapX;
        const dotY = row * this.gapY;
;
        this.dots.add(new Dot(this, dotX, dotY, ballId, col, row));
      }
    }
  }

  drawLine() {
    const moveLine = this.add.graphics();

    this.input.on('pointermove', pointer => {
      if (pointer.isDown && this.drawStartDot) {
        moveLine.clear();
        moveLine.lineStyle(4, this.lineColor);
        moveLine.beginPath();
        moveLine.moveTo(pointer.x, pointer.y);
        moveLine.lineTo(this.drawStartDot.x, this.drawStartDot.y);
        moveLine.strokePath();
      }
    })

    this.input.on('pointerup', () => moveLine.clear())
  }

  endDraw() {
    this.input.on('pointerup', () => {

      if (this.dotsChain.length > 1) {
        this.dotsChain.forEach(dot => {
          const dotRow = dot.row;
          const dotCol = dot.col;

          dot.destroy();

          this.dots.children.entries.forEach(groupDot => {
            if (groupDot.col === dotCol && groupDot.row < dotRow) {
              groupDot.row++;

              if (groupDot.newY) {
                groupDot.newY += this.gapY;
              } else {
                groupDot.newY = groupDot.y + this.gapY;
              }
            }
          });

          this.dots.children.entries.forEach(groupDot => {
            if (groupDot.newY) {
              this.tweens.add({
                targets: groupDot,
                y: groupDot.newY,
                duration: 1500,
                ease: 'Bounce.out',
                delay: 100
              });
            }
          });
        });
      }

      this.dotsChain = [];
      this.connectLines.forEach(connectLine => connectLine.destroy()); 
      this.connectLines = [];
    }, this)
  }
}
