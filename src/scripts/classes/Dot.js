import Phaser from "phaser";

const COLORS = [
  '0xFFFF00', // YELLOW
  '0x0000FF', // BLUE
  '0x00FF00', // GREEN
  '0xFF0000', // RED
  '0x800080', // PURPLE
];

export default class Dot {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.color = COLORS[Phaser.Math.Between(0, COLORS.length - 1)];
    this.init();
  }

  init() {
   this.scene.add.graphics()
    .fillCircle(this.x, this.y, 20)
    .fillStyle(this.color);
  }
}
