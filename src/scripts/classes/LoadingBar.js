export default class LoadingBar {
  constructor(scene) {
    this.scene = scene;
    this.style = {
      boxColor: 0xd3d3d3,
      barColor: 0xfff8dc,
      x: this.scene.game.config.width / 2 - 300,
      y: this.scene.game.config.height / 2 + 200,
      width: 600,
      height: 25
    };

    this.progressBox = this.scene.add.graphics();
    this.progressBar = this.scene.add.graphics();

    this.showProgressBox();
    this.setEvents();
  }

  setEvents() {
    this.scene.load.on('progress', this.showProgressBar, this);
    this.scene.load.on('complete', this.onLoadComplete, this);
  }

  onLoadComplete() {
    this.progressBox.destroy();
    this.progressBar.destroy();
  }

  showProgressBox() {
    this.progressBox
      .fillStyle(this.style.boxColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width,
        this.style.height
      );
  }

  showProgressBar(value) {
    this.progressBar
      .clear()
      .fillStyle(this.style.barColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width * value,
        this.style.height
      );
  }
}
