import Phaser from "phaser";
import WebFontFile from "./webfontfile";


export default class TitleScreen extends Phaser.Scene{
  preload(){
    const fonts = new WebFontFile(this.load,'Press Start 2P')
    this.load.addFile(fonts)
  }
  create(){
    const title = this.add.text(400,250,'Ping Pong Game',{
      fontSize:50,
      fontFamily:'"Press Start 2P"'
    })
    title.setOrigin(0.5,0.5)
    this.add.text(300,350,"Press Space to Start",{
      fontSize:10,
      fontFamily:'"Press Start 2P"'
    })
    //press space to start game scene
    this.input.keyboard.on('keydown-SPACE',()=>{
      this.scene.start('game')
    })
  }
}
