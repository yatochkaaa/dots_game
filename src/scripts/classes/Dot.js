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
  }

  endDraw() {
    this.scene.drawing = false;
  }
}
