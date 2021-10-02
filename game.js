import Phaser from "phaser";

//make a new game scene
export default class Game extends Phaser.Scene {
  init() {
    //accelate to max velocity instead giving it max velocity directly
    //make a new vector
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);

    this.leftScore = 0
    this.rightScore = 0
  }
  preload() {}
  //create stuff for our game scene
  create() {
    //setting extra bounds to make to make the ball able to go past the bounds behind the player (in order to score)
    this.physics.world.setBounds(-100, 0, 1000, 500);

    //making the ball
    this.ball = this.add.circle(400, 250, 10, 0xfffff, 1);
    //adding physics to our ball
    this.physics.add.existing(this.ball);
    //make the ball bounce
    this.ball.body.setBounce(1, 1);
    //make the ball collide with bounderies
    this.ball.body.setCollideWorldBounds(true, 1, 1);

    //reseting the ball to make drop at a random number
    //see method below
    this.resetBall();

    //make a left paddle for the player (static=true)
    this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xfffff, 1);
    this.physics.add.existing(this.paddleLeft, true);

    //make a right paddle for the AI (static=true)
    this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xfffff, 1);
    this.physics.add.existing(this.paddleRight, true);

    //make our paddles collide with the ball
    this.physics.add.collider(this.paddleLeft, this.ball);
    this.physics.add.collider(this.paddleRight, this.ball);

    //adding score text for player
    this.leftScoreText = this.add.text(300, 125, "0", {
      fontSize: 40,
    }).setOrigin(0.5,0.5)

    //adding score text for ai
    this.rightScoreText = this.add.text(500, 375, "0", {
      fontSize: 40,
    }).setOrigin(0.5,0.5)

    //this is necessary to be able to use cursers to control the our paddle
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    //this to tell vscode what type body is
    //when it know the type it can suggest methods that can be used on body
    /**@type {Phaser.Physics.Arcade.StaticBody} */
    const body = this.paddleLeft.body;

    if (this.cursors.up.isDown) {
      //move the paddle up
      this.paddleLeft.y -= 10;
      //update the boundaries of the paddle
      body.updateFromGameObject();
    } else if (this.cursors.down.isDown) {
      //move the paddle down
      this.paddleLeft.y += 10;
      //update the boundaries of the paddle
      body.updateFromGameObject();
    }

    //this is the differce in y locations between the ai paddle and the ball
    const diff = this.ball.y - this.paddleRight.y;

    //if the ball is in the middle of the board dont the paddle
    if (Math.abs(diff) < 10) {
      return;
    }
    const aiSpeed = 3
    //if diff is negative ball is above paddle and vice versa
    //->if diff is negative move the ai paddle up
    //by adding acceleration instead of pure top speed
    if (diff < 0) {
      this.paddleRightVelocity.y = -aiSpeed;
      if(this.paddleRightVelocity.y<-10){
        this.paddleRightVelocity.y=-10
      }

      //->if diff is negative move the ai paddle down
    } else if (diff > 0) {
      this.paddleRightVelocity.y = aiSpeed;
      if(this.paddleRightVelocity.y>10){
        this.paddleRightVelocity.y=10
      }
    }

    //move the paddle according to the y velocity of the vector
    this.paddleRight.y += this.paddleRightVelocity.y;
    //update the border of the paddle in game
    this.paddleRight.body.updateFromGameObject();

    //scoring system
    if (this.ball.x < -30) {
      //scored on player side
      this.leftScore += 1
      this.leftScoreText.text = this.leftScore
      this.resetBall();
    } else if (this.ball.x > 830) {
      //scored on ai side
      this.rightScore += 1
      this.rightScoreText.text = this.leftScore
      this.resetBall();
    }
  }

  resetBall() {
    //reseting the ball either at start of game or after scoring
    //set a position
    this.ball.setPosition(400, 250);
    //pick a random angle around the ball to move in that direction
    const angle = Phaser.Math.Between(0, 360);
    //convert angle to a vector to give it velocity(because we need x,y number)
    //use conversion method to that
    //pass in speed to make it directional vector
    const vec = this.physics.velocityFromAngle(angle, 200);
    //make the ball move at the random angle when ball drops
    this.ball.body.setVelocity(vec.x, vec.y);
  }
}
