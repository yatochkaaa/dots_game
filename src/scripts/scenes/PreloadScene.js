import Phaser from 'phaser';
import LoadingBar from '../classes/LoadingBar';
import blueDot from '../../assets/blueDot.png'
import greenDot from '../../assets/greenDot.png'
import purpleDot from '../../assets/purpleDot.png'
import redDot from '../../assets/redDot.png'
import yellowDot from '../../assets/yellowDot.png'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload () {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.LoadingBar = new LoadingBar(this);

    this.load.image('blueDot', blueDot);
    this.load.image('greenDot', greenDot);
    this.load.image('purpleDot', purpleDot);
    this.load.image('redDot', redDot);
    this.load.image('yellowDot', yellowDot);
  }

  create () {
    this.scene.start('Game');
  }
}