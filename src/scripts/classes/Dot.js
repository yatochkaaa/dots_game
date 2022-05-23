import Phaser from "phaser";
import { COLORS } from '../scenes/GameScene';

export default class Dot extends Phaser.GameObjects.Image {
  constructor(scene, x, y, id, group) {
    super(scene, x, y, COLORS[id].texture);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.id = id;
    this.texture = COLORS[id].texture;
    this.color = COLORS[id].color;
    this.setInteractive();
    this.on('pointerdown', this.startDraw, this);
    this.on('pointerover', this.overDotDraw, this);
    this.on('pointerup', this.endDraw, this);

    this.init()
  }

  init() {
    this.createDot();
  };

  createDot() {
    this.scene.add.sprite(this.x, this.y, this.texture);
  }

  startDraw() {
    this.scene.drawing = true;
    this.scene.drawStartX = this.x;
    this.scene.drawStartY = this.y;
    this.scene.lineColor = this.color;
    this.scene.dotsChain.push(this);
  }

  overDotDraw() {
    if (this.scene.drawing) {
      const isSameDot = this.scene.dotsChain.find(dot => dot.x === this.x && dot.y === this.y);
      const isSameTexture = this.texture === this.scene.dotsChain[0].texture ? true : false;

      if (!isSameDot && isSameTexture && this.isAllowableDistance(this)) {
        this.scene.dotsChain.push(this);
      }
    }
  }

  endDraw() {
    this.scene.drawing = false;
    console.log(this.scene.dotsChain);
    this.scene.dotsChain = [];
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
}
