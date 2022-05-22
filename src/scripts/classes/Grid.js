import Phaser from "phaser";
import Dot from "./Dot";

const GRID = {
  ROWS: 6,
  COLS: 6,
}

export default class Grid {
  constructor(scene) {
    this.scene = scene;
    this.init();
  }

  init() {
    const offsetX = (this.scene.sys.game.config.width / GRID.COLS) - 20;
    const offsetY = (this.scene.sys.game.config.height / GRID.ROWS) - 20;

    for (let col = 0; col < GRID.COLS; col++) {
      for (let row = 0; row < GRID.ROWS; row++) {
        const dotX = offsetX + col * offsetX;
        const dotY = offsetY + row * offsetY;

        new Dot(this.scene, dotX, dotY)
      }
    }
  }
}
