import Phaser from 'phaser';
import BootScene from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import GameScene from './scripts/scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [BootScene, PreloadScene, GameScene]
};

const game = new Phaser.Game(config);
