import Phaser from "phaser";
import { COLORS } from '../scenes/GameScene';

export default class Dot extends Phaser.GameObjects.Image {
  constructor(scene, x, y, id, col, row) {
    super(scene, x, y, COLORS[id].texture);
    this.scene = scene;
    this.x = x;
    this.y = -this.scene.sys.game.config.height;
    this.col = col;
    this.row = row;
    this.texture = COLORS[id].texture;
    this.color = COLORS[id].color;
    this.setInteractive();
    this.on('pointerdown', this.startDraw, this);
    this.on('pointerover', this.overDotDraw, this);

    this.scene.tweens.add({
      targets: this,
      y,
      duration: 1000,
      ease: 'Bounce.out',
      delay: -this.row * 100
    });

    this.scene.add.existing(this);
  }

  startDraw() {;
    this.scene.drawStartDot = this;
    this.scene.lineColor = this.color;
    this.scene.dotsChain.push(this);
  }

  overDotDraw(pointer) {
    if (pointer.isDown && this.scene.drawStartDot) {
      const isSameDot = this.scene.dotsChain.find(dot => dot.x === this.x && dot.y === this.y);
      const isSameTexture = this.texture === this.scene.dotsChain[0].texture ? true : false;
      const isPreLastDot = this === this.scene.dotsChain[this.scene.dotsChain.length - 2];

      if (!isSameDot && isSameTexture && this.isAllowableDistance(this)) {
        this.scene.dotsChain.push(this);
        this.connectDots(pointer, this);
        this.scene.drawStartDot = this;
      }

      if (isPreLastDot) {
        this.scene.dotsChain.pop();
        this.scene.connectLines.pop().destroy();
        this.scene.drawStartDot = this.scene.dotsChain[this.scene.dotsChain.length - 1];
      }
    }
  }

  isAllowableDistance(dot) {
    const prevDot = this.scene.dotsChain[this.scene.dotsChain.length - 1];
    
    if (
      Math.abs(prevDot.x - dot.x) <= Math.ceil(this.scene.gapX) && prevDot.y === dot.y ||
      Math.abs(prevDot.y - dot.y) <= Math.ceil(this.scene.gapY) && prevDot.x === dot.x
    ) {
      return true;
    }

    return false;
  }

  connectDots(pointer, dot) {
    const connectLine = this.scene.add.graphics();

    if (pointer.isDown) {
      connectLine.lineStyle(4, this.scene.lineColor);
      connectLine.beginPath();
      connectLine.moveTo(this.scene.drawStartDot.x, this.scene.drawStartDot.y);
      connectLine.lineTo(dot.x, dot.y);
      connectLine.strokePath();

      this.scene.connectLines.push(connectLine);
    }
  }
}
