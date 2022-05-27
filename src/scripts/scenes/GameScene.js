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
    this.drawStartDot;
    this.drawStartX = 0;
    this.drawStartY = 0;
    this.connectLines = [];
    this.lineColor = '';
    this.dotsChain = [];

    this.drawLine();
  }

  // changePos() {
  //   const newDotYPosition = this.newDotsArr[this.count - 1].newY + 53; 

  //   return newDotYPosition;
  // };

  // moveDots() {
  //   this.count = 0;

  //   this.tweens.add({
  //       onRepeate: () => {
  //           this.count++;
  //           this.changePos();
  //       },
  //       targets: [...this.dots.children.entries],
  //       y: this.changePos,
  //       duration: 1000,
  //       ease: 'Sine.easeInOut',
  //       repeat: 0,
  //       delay: this.tweens.stagger(100),
  //   });
  // };

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createDots() {
    const dotTexture = this.textures.get(COLORS[0].texture).getSourceImage();

    this.dot = {
      diameter: dotTexture.width,
      radius: dotTexture.width / 2
    }

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

        const newDotY = dotY + this.gapY;
        this.newDotsArr.push({ newY: newDotY });
        this.dots.add(new Dot(this, dotX, dotY, ballId, col, row));
      }
    }
  }

  drawLine() {
    const moveLine = this.add.graphics();

    this.input.on('pointermove', pointer => {
      if (pointer.isDown && this.drawing && this.drawStartDot) {
        moveLine.clear();
        moveLine.lineStyle(4, this.lineColor);
        moveLine.beginPath();
        moveLine.moveTo(pointer.x, pointer.y);
        moveLine.lineTo(this.drawStartDot.x, this.drawStartDot.y);
        moveLine.strokePath();
      }
    })

    this.input.on('pointerup', () => {
      this.drawing = false;

      if (this.dotsChain.length > 1) {
        this.dotsChain.forEach(dot => {
          dot.destroy();
        });
        console.log(this.dotsChain)
      }

      this.dotsChain = [];
      moveLine.clear();
      this.connectLines.forEach(connectLine => connectLine.destroy()); 
      this.connectLines = [];
    }, this)
  }
}
