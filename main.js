//importing phaser
import Phaser from "phaser";
//importing game scene
import Game from "./game";

//phaser game config
const config = {
  width: 800,
  height: 500,
  //auto or canvas or webgl
  type: Phaser.AUTO,
  backgroundColor: '#432550',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y:0},
      debug: true
    }
  }
};

//make new game instance with our config
const game = new Phaser.Game(config)

//add our game scene
game.scene.add('game',Game)

//start our game scenes
game.scene.start('game')
