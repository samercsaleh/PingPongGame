import Phaser from "phaser";

export default class GameOver extends Phaser.Scene
{
  create(data)
  {
    let titleText = "Game Over!"
    if(data.leftScore > data.rightScore){
      titleText = "You Win!"
    }
    this.add.text(400,200,titleText,{
      fontFamily: '"Press Start 2P"',
      fontSize: 38
    }).setOrigin(0.5)
    this.add.text(400,300,"Press Space to Continue",{
      fontFamily: '"Press Start 2P"',
      fontSize: 12
    }).setOrigin(0.5)
    this.input.keyboard.on('keydown-SPACE',()=>{
      this.scene.start('titlescreen')
    })
  }
}
