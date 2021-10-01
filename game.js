import Phaser from 'phaser'

//make a new game scene
export default class Game extends Phaser.Scene
{

  init(){
    this.paddleRightVelocity= new Phaser.Math.Vector2(0,0)
  }
  preload(){

  }
  //create stuff for our game scene
  create()
  {
    //making the ball
    this.ball = this.add.circle(400,250,10,0xfffff,1)
    //adding physics to our ball
    this.physics.add.existing(this.ball)
    //make the ball bounce
    this.ball.body.setBounce(1, 1)
    //make the ball collide with bounderies
    this.ball.body.setCollideWorldBounds(true,1,1)
    //make the ball move between x,y axis of our choice
    this.ball.body.setVelocity(Phaser.Math.Between(-200,200),Phaser.Math.Between(-200,200))

    //make a left paddle for the player (static=true)
    this.paddleLeft = this.add.rectangle(50,250,30,100,0xfffff,1)
    this.physics.add.existing(this.paddleLeft,true)

    //make a right paddle for the AI (static=true)
    this.paddleRight = this.add.rectangle(750,250,30,100,0xfffff,1)
    this.physics.add.existing(this.paddleRight,true)

    //make our paddles collide with the ball
    this.physics.add.collider(this.paddleLeft,this.ball)
    this.physics.add.collider(this.paddleRight,this.ball)

    //this is necassry to use cursers to control the our paddle
    this.cursors = this.input.keyboard.createCursorKeys()
  }
  update(){

    /**@type {Phaser.Physics.Arcade.StaticBody} */
    const body= this.paddleLeft.body

    if(this.cursors.up.isDown){
      this.paddleLeft.y -= 10
      body.updateFromGameObject()
    }else if(this.cursors.down.isDown){
      this.paddleLeft.y += 10
      body.updateFromGameObject()
    }
    const diff= this.ball.y - this.paddleRight.y
    if(Math.abs(diff)<10){
      return
    }
    const aiSpeed = 3
    if(diff<0){
      this.paddleRightVelocity.y = -aiSpeed
      if(this.paddleRightVelocity.y<-10){
        this.paddleRightVelocity.y=-10
      }
    }else if(diff>0){
      this.paddleRightVelocity.y = aiSpeed
      if(this.paddleRightVelocity.y>10){
        this.paddleRightVelocity.y=10
      }
    }
    this.paddleRight.y+=this.paddleRightVelocity.y
    this.paddleRight.body.updateFromGameObject()
  }
}
