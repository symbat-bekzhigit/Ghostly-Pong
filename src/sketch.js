
// Ghostly Pong Game
// Author: Symbat Bekzhigit


let RES_W = 800
let RES_H = 500

let disk1_speed_x = 3
let disk1_speed_y = 3

let disk2_speed_x = - 2
let disk2_speed_y = 2

let disk_xc = RES_W/2
let disk_yc = RES_H/2
let disk_w = 30
let disk_h = 30

let BORDER = 30
let border_color = "#646461"

let welcome_page = true
let game_over_page = false
let game_start = false
let instructions_page = false

let score_player1 = 0
let score_player2 = 0
let winning_player = 0

let paddle_left_x = 0
let paddle_right_x = RES_W
let paddle_left_y = RES_H/2
let paddle_right_y = RES_H/2
let paddle_width = 50
let paddle_height = 100
let paddle_vel = 10
let paddle_left_color = "#464044"
let paddle_right_color = "#e94e54"

let bgImage
let bgImageRetro
let bgImageNeon
let bgImageSpace

let bgWelcome
let bgInstructions
let bgGameOver

let BOX_Y = 13*RES_H / 15
let box1_x = 4*RES_W/9 + 20
let box2_x = 5*RES_W/9 + 20
let box3_x = 6*RES_W/9 + 20
let box4_x = 7*RES_W/9 + 20
let boxW = 70
let boxH = 30

let bgMusic
let bgMusicGame
let bgMusicSpooky
let bgMusicClassic
let bgMusicSpace
let bgMusicRetro
let collisionSound
let goalSound

let dissapearingRate = 0.1
  
//preload all the images and sounds asynchroniously
function preload() {
  bgImageRetro = loadImage("/images/bg_retro.jpg")
  bgImageSpace = loadImage("/images/bg_space.jpg") 
  bgImageSpooky = loadImage("/images/bg_spooky.jpeg") 
  bgImageClassic = loadImage("/images/bg_classic.jpg") 
  
  bgWelcome = loadImage("/images/bg_welcome.jpg") 
  bgInstructions = loadImage("/images/bg_instructions.jpg") 
  bgGameOver =  loadImage("/images/bg_gameover.jpg") 
  
  bgMusicSpooky = loadSound("/sounds/spooky.m4a")
  bgMusicClassic = loadSound("/sounds/classic.m4a")
  bgMusicSpace = loadSound("/sounds/space.m4a")
  bgMusicRetro = loadSound("/sounds/retro.m4a")
  bgMusic = loadSound("/sounds/general.m4a")
  
  collisionSound = loadSound("/sounds/collision.mp3")
  goalSound = loadSound("/sounds/goal.mp3")
}




//class for Disks
class Disk {
   constructor(disk_xc, disk_yc, disk_w, disk_h, disk_speed_x, disk_speed_y){
     this.disk_xc = disk_xc
     this.disk_yc = disk_yc
        
     this.disk_w = disk_w
     this.disk_h = disk_h
     
     this.disk_speed_x = disk_speed_x
     this.disk_speed_y = disk_speed_y

   }
  
  //code for displaying the disk    
    Disk_display(){

    //make the disk dissapear and reappear after certan time using frameCount and transparency
        fill(255,255,255, sin(frameCount * dissapearingRate) * 255)
        ellipse(this.disk_xc, this.disk_yc, this.disk_w, this.disk_h)
    }
  
   //Code for managing Disk movement               
    Disk_movement(){ 
        this.disk_xc = this.disk_xc + this.disk_speed_x
        this.disk_yc = this.disk_yc + this.disk_speed_y
    }

    //Code for managing Disk bouncing when it touches boundaries 
    Disk_bouncing(){
        //this if statement will be executed if the disk touches right-side boundaries of the table
        if(this.disk_xc + this.disk_w/2 > RES_W){
          
          //this indicates, player 2 missed the disk, so play 1 scores one point
          score_player1 += 1
          goalSound.play()
          continueGame() 
        }
                
         //this if statement will be executed if the disk touches left-side boundaries of the table       
        else if(this.disk_xc - this.disk_w/2 < 0){
          
           //this indicates, player 1 missed the disk, so play 2 scores one point
           score_player2 += 1
           goalSound.play()
           continueGame() 
        }
  
       
        //this if statement will be executed if the disk touches upper or lower boundaries of the table
        if(this.disk_yc + this.disk_h/2 > RES_H || this.disk_yc - this.disk_h/2 < 0){
            if(RES_H/2 + 100 < this.disk_yc  || this.disk_yc < RES_H/2 - 100){
                this.disk_speed_y = - this.disk_speed_y
            }   
        }
      
        this.disk_xc = this.disk_xc + this.disk_speed_x
        this.disk_yc = this.disk_yc + this.disk_speed_y     
      
      
      //whoever first scores 10 points wins the game
        if(score_player1 == 10){
            winning_player = 1
            game_start = false
            game_over_page = true
            bgMusicGame.stop()
          
            //turn on the general bacground music for the game-over page
            bgMusic.play()
            bgMusic.loop()
        }
  
        else if(score_player2 == 10){
            winning_player = 2
            game_start = false
            game_over_page = true
            bgMusicGame.stop()
            bgMusic.play()
            bgMusic.loop()
        }
     }
}



//class for Paddle objects
class Paddle{
    constructor(paddle_left_x, paddle_left_y, paddle_right_x, paddle_right_y, paddle_width, paddle_height,paddle_vel){
        
        this.px = paddle_left_x
        this.pxr = paddle_right_x
        this.py = paddle_left_y
        this.pyr = paddle_right_y
        this.pw = paddle_width
        this.ph = paddle_height
        this.ps = paddle_vel
        this.key_handler = {"w": false, "s": false, UP: false, DOWN: false}
   
    }  
  
//code for displaying two paddles          
    Paddle_display(){
    
      //Modifies the location from which rectangles are drawn to the Center
       rectMode(CENTER)
        noStroke()
  
        fill(paddle_left_color)
        rect(this.px, this.py, this.pw, this.ph)
      
        fill(paddle_right_color)
        rect(this.pxr, this.pyr, this.pw, this.ph) 
    }
  
//code for restricting paddle boundaries so that they don't go out of the table borders
    Paddle_boundaries(){
      
      //restricting lower boundary
        if(this.py + this.ph/2 > RES_H){
            this.py = this.py - this.ps
        }
            
        //restricting upper boundary
        else if(this.py - this.ph/2 < 0){
            this.py = this.py + this.ps
        }
      
        //restricting lower boundary
        if(this.pyr + this.ph/2 > RES_H){
            this.pyr = this.pyr - this.ps 
        }
        
        //restricting upper boundary
        else if(this.pyr - this.ph/2 < 0){
            this.pyr = this.pyr + this.ps
        }
            
    }
    
//Paddle movement is controlled through W, S and UP, DOWN keyboards
    Paddle_movement(){
        //if "w" is pressed, left paddle will move up
        if(this.key_handler["w"]){
            this.py = this.py - this.ps
        }
        
        //if "s" is pressed, left paddle will move down
        if(this.key_handler["s"]){
            this.py = this.py + this.ps
        }
            
        //if "UP" is pressed, right paddle will move up
        if(this.key_handler[UP_ARROW]){
            this.pyr = this.pyr - this.ps
        }
       
       //if "DOWN" is pressed, right paddle will move down
        if(this.key_handler[DOWN_ARROW]){
            this.pyr = this.pyr + this.ps
        }
      
    }

}


//function for displaying the scores of the players, along with the player name and round number 
function Score_display(){
  
        if(bgImage == bgImageRetro){
          
          //set different score color for the retro mode
           fill("#343b37")
        }
        else if(bgImage == bgImageSpace){
          
          //set different score color for the space mode
          fill("#232024")
        }
        else {
          fill(255)
        }
        textSize(30)
        textAlign(CENTER)
        text("Player 1", 100, 50)
        text(score_player1, 100, 80)
        text("Player 2", RES_W - 100, 50) 
        text(score_player2, RES_W - 100, 80) 
    }


//Code for managing Disk bouncing when it touches paddles 
function Disk_Paddle_Contact(paddle, disk){
        
        //check whether the disk contacted the left paddle
        if ((disk.disk_xc - disk.disk_w/2 < paddle.px + paddle.pw/2) && (disk.disk_yc + disk.disk_h/2 > paddle.py - paddle.ph/2) && (disk.disk_yc - disk.disk_h/2 < paddle.py + paddle.ph/2)){
            if(disk.disk_speed_x < 0){
              
                //play the collision sound when disk touches the paddle
                collisionSound.play()
              
                //print(paddle.px,paddle.py)
                disk.disk_speed_x = - disk.disk_speed_x
            }
        }      
        //check whether the disk contacted the right paddle      
        else if ((disk.disk_xc + disk.disk_w/2 > paddle.pxr - paddle.pw/2) && (disk.disk_yc + disk.disk_h/2 > paddle.pyr - paddle.ph/2) && (disk.disk_yc - disk.disk_h/2 < paddle.pyr + paddle.ph/2)){
            if(disk.disk_speed_x > 0){
              
              //play the collision sound when disk touches the paddle
                collisionSound.play()
              
                //print(paddle.pxr,paddle.pyr)
                disk.disk_speed_x = - disk.disk_speed_x
        
            }
        }   
}


//class for Game objects
class Game{
    constructor(){
      
      //everytime a new session of the game starts, we update the paddles and disks
      this.paddle = new Paddle(paddle_left_x, paddle_left_y, paddle_right_x, paddle_right_y, paddle_width, paddle_height,paddle_vel)
      
      this.disk1 = new Disk(disk_xc, disk_yc, disk_w, disk_h, disk1_speed_x, disk1_speed_y)
      
      this.disk2 = new Disk(disk_xc, disk_yc, disk_w, disk_h, disk2_speed_x, disk2_speed_y)
      
    }
              
    display(){
      
        if(bgImage != bgImageSpooky)
        {
          //make the background half transparent
          tint(255, 180)
        }
        else{
           tint(255, 160)
        }
        image(bgImage, 0, 0, RES_W, RES_H);
            
        //rectangle borders
        fill(border_color)
        rect(RES_W/2,RES_H/2,BORDER/4,RES_H*2)
        rect(0,0,RES_W*2,BORDER)
        rect(0,RES_H,RES_W*2,BORDER)
        rect(RES_W,0,BORDER,RES_H*2)
        rect(0,0,BORDER,RES_H*2)
        
      //display the disks and call the relevant functions
        this.disk1.Disk_display()
        this.disk1.Disk_bouncing()
        this.disk1.Disk_movement()
      
        this.disk2.Disk_display()
        this.disk2.Disk_bouncing()
        this.disk2.Disk_movement()
      
        Disk_Paddle_Contact(this.paddle, this.disk1)
        Disk_Paddle_Contact(this.paddle, this.disk2)
      
        this.paddle.Paddle_display()
        this.paddle.Paddle_movement()
        this.paddle.Paddle_boundaries()
        Score_display()
    }
}

      
//create a new isntange of the Game
game = new Game()    
        

function setup() {
  createCanvas(RES_W, RES_H)
  bgImage = bgImageSpooky

  bgMusic.play()
  bgMusic.loop()
}


function draw() {
  //the display changes based on which page we're in
  if(welcome_page == true){
      welcomePageDisplay()
  }

  if(instructions_page == true){
      instructionsPageDisplay()
  } 
  
  if(game_start == true){
      background(255)
      game.display()
  }
  
  if(game_start == false && game_over_page == true){
    gameOverPageDisplay()
  }
}


//this function is used to update the disk to its initial location whenever someone scores a goal
function continueGame(){
   game.disk1 = new Disk(disk_xc, disk_yc, disk_w, disk_h, disk1_speed_x, disk1_speed_y)
   game.disk2 = new Disk(disk_xc, disk_yc, disk_w, disk_h, disk2_speed_x, disk2_speed_y)
}


//this function is used for restarting the game 
function restartGame(){
    //update some of the variables to its initial default values
    score_player1 = 0
    score_player2 = 0
  
    welcome_page = true
    winning_player = 0
    game_over_page = false
    game_start = false
    instructions_page = false

    //create a new instance of the game
    game = new Game()
    bgMusic.play()
    bgMusic.loop()
}
  

//display for a welcome page
function welcomePageDisplay(){
    image(bgWelcome, 0, 0, RES_W, RES_H);
    
    //restore default alignment modes
    rectMode(CORNER)
    textAlign(LEFT)
  
    fill(255)
    textFont("Lakki Reddy", 25) 
    let msg1 = "Welcome to the"
    
    //place all the text in the center of the screen
    let tWidth1 = textWidth(msg1)
    text(msg1, RES_W / 2 - (tWidth1 / 2), RES_H / 9)
  
    textFont("Comforter Brush",60);
    let msg2 = "Ghostly Pong Game"
    let tWidth2 = textWidth(msg2)
    text(msg2, RES_W / 2 - (tWidth2 / 2), RES_H / 4)
  
    textFont("Lakki Reddy",15) 
    let msg3 = "Click anywhere to continue to instructions page"
    let tWidth3 = textWidth(msg3)
    text(msg3, RES_W / 2 - (tWidth3 / 2), 10*RES_H / 11)

}


//display for instructions page
function instructionsPageDisplay(){
    image(bgInstructions, 0, 0, RES_W, RES_H)
    fill(255)
  
    textFont("Lakki Reddy",35) 
    let msg1 = "Game Instructions";
    let tWidth1 = textWidth(msg1);
    text(msg1, RES_W / 2 - (tWidth1 / 2), RES_H / 8)
  
    textFont("Lakki Reddy",20) 
    let msg2 = "This game is similar to the Ping Pong game, only you will play with 2 disks which will keep disappearing, just like a ghost"
    let tWidth2 = textWidth(msg2)
    
    let msg3 = "You score the point when your opponent misses the disk, the first player to score 10 points wins"
    let tWidth3 = textWidth(msg3)
    
    let msg5 = "The control keys for the Player 1 are “W” and “S” keys, for the Player 2 – “UP” and “DOWN” keys"
    let tWidth5 = textWidth(msg5)
    
    let msg6 = "Please choose one of themes below to proceed with the game"
    let tWidth6 = textWidth(msg6)

    textWrap(WORD)
    textAlign(LEFT)
    text(msg2, RES_W  - (tWidth5 / 2) - 10, 3*RES_H / 12, 400)
    text(msg3, RES_W  - (tWidth3 / 2) - 10, 5*RES_H / 12, 400)
    text(msg5, RES_W  - (tWidth5 / 2) - 10, 7*RES_H / 12, 400) 
    text(msg6, RES_W  - (tWidth5 / 2) - 10, 9*RES_H / 12, 400) 
  
  
  
    textSize(20)
    //create buttons for different modes of the game
  
    //1st mode is Spooky
    let box1_name = "Spooky";
    let box1_name_w = textWidth(box1_name)
    if(mouseX > box1_x && mouseX < box1_x + boxW && mouseY > BOX_Y &&  mouseY < BOX_Y + boxH){
        //change the color of the box when the user hovers over this option
      fill("#777696")
    }
    else{
      fill("black")
    }
    rect(box1_x,BOX_Y,boxW,boxH)
    fill("white")
    text(box1_name,box1_x -(box1_name_w / 2) + boxW/2 ,BOX_Y+20)
  
  
      //1st mode is Retro
    let box2_name = "Retro";
    let box2_name_w = textWidth(box2_name)
    if(mouseX > box2_x && mouseX < box2_x + boxW && mouseY > BOX_Y &&  mouseY < BOX_Y + boxH){
       //change the color of the box when the user hovers over this option
      fill("#777696")
    }
    else{
      fill("black")
    }
    rect(box2_x,BOX_Y,boxW,boxH)
    fill("white")
    text(box2_name,box2_x -(box2_name_w / 2) + boxW/2 ,BOX_Y+20)
  
  
    //3rd mode is Space
    let box3_name = "Space";
    let box3_name_w = textWidth(box3_name)
    if(mouseX > box3_x && mouseX < box3_x + boxW && mouseY > BOX_Y &&  mouseY < BOX_Y + boxH){
       //change the color of the box when the user hovers over this option
      fill("#777696")
    }
    else{
      fill("black")
    }
    rect(box3_x,BOX_Y,boxW,boxH)
    fill("white")
    text(box3_name,box3_x -(box3_name_w / 2) + boxW/2 ,BOX_Y+20)
  
  
    //4th mode is Classic
    let box4_name = "Classic";
    let box4_name_w = textWidth(box3_name)
    if(mouseX > box4_x && mouseX < box4_x + boxW && mouseY > BOX_Y &&  mouseY < BOX_Y + boxH){
       //change the color of the box when the user hovers over this option
      fill("#777696")
    }
    else{
      fill("black")
    }
    rect(box4_x,BOX_Y,boxW,boxH)
    fill("white")
    text(box4_name,box4_x - (box4_name_w / 2) + boxW/2 ,BOX_Y+20)

}


//display for the game over page
function gameOverPageDisplay(){
      image(bgGameOver, 0, 0, RES_W, RES_H);
      fill(255)
      textAlign(LEFT)

      textFont("Lakki Reddy",40) 
      let msg1 = "Game is over!";
      let tWidth1 = textWidth(msg1);
      text(msg1, 4*RES_W / 6 - (tWidth1 / 2), 4*RES_H / 9);
  
      textFont("Lakki Reddy",25) 
      let msg2 = "Player " + str(winning_player) + " has won this game!";
      let tWidth2 = textWidth(msg2);
      text(msg2, 4*RES_W / 6 - (tWidth2 / 2), 5*RES_H / 9)
  
      textFont("Lakki Reddy",15) 
      let msg3 = "Click anywhere to restart the game";
      let tWidth3 = textWidth(msg3);
      text(msg3, RES_W / 2 - (tWidth3 / 2), 10*RES_H / 11);
}




function mouseClicked(){
    //when the mouse will be clicked while in a welcomePageDisplay(), game_start will change to False, thus allowing us to display the actual game
    if(welcome_page == true){
        welcome_page = false
        instructions_page = true
    }
  
    else if(instructions_page == true){
      
      //if the user clicks on the first box, it sets a spooky mode
     if(mouseX > box1_x && mouseX < box1_x + boxW && mouseY > BOX_Y &&  mouseY < BOX_Y + boxH){
       //print("box1 is clicked")
       bgImage = bgImageSpooky
       paddle_left_color = "#e6e3e3"
       paddle_right_color = "#2b3c3c"
       border_color = "#646461"
     
       //stop the geenral game music and play music specific fopr the theme chosen
       bgMusic.stop()
       bgMusicGame = bgMusicSpooky
       bgMusicGame.play()
       
       //lower the volume of the background music
       bgMusicGame.setVolume(0.3)
       bgMusicGame.loop()
     
      instructions_page = false
      game_start = true
     }
  
  //if the user clicks on the second box, it sets a retro mode
    else if(mouseX > box2_x && mouseX < box2_x + boxW && mouseY > BOX_Y &&  mouseY < BOX_Y + boxH){
     //print("box2 is clicked")
      bgImage = bgImageRetro
      paddle_left_color = "#abad83"
      paddle_right_color = "#cf7a56"
      border_color = "#54645b"
    
      //stop the geenral game music and play music specific fopr the theme chosen
      bgMusic.stop()
      bgMusicGame = bgMusicRetro
      bgMusicGame.play()
      bgMusicGame.setVolume(0.3)
      bgMusicGame.loop()
    
      instructions_page = false
      game_start = true
    
    }
  
    //if the user clicks on the third box, it sets a space mode
     else if(mouseX > box3_x && mouseX < box3_x + boxW && mouseY > BOX_Y &&  mouseY < BOX_Y + boxH){
      //print("box3 is clicked")
      bgImage = bgImageSpace
      paddle_left_color = "#6da1cb" 
      paddle_right_color = "#aeaeb8"
      border_color = "#3f3e4b"
    
      //stop the general game music and play music specific fopr the theme chosen
      bgMusic.stop()
      bgMusicGame = bgMusicSpace
      bgMusicGame.play()
      bgMusicGame.setVolume(0.3)
      bgMusicGame.loop()
     
      instructions_page = false
      game_start = true
  }
  
    //if the user clicks on the fourth box, it sets a classic mode
    else if(mouseX > box4_x && mouseX < box4_x + boxW && mouseY > BOX_Y &&  mouseY < BOX_Y + boxH){
      //print("box4 is clicked")
      bgImage = bgImageClassic
      paddle_left_color = "#464044"
      paddle_right_color = "#e94e54"
      border_color = "#ffffff"
    
      //stop the geenral game music and play music specific fopr the theme chosen
      bgMusic.stop()
      bgMusicGame = bgMusicClassic
      bgMusicGame.play()
      bgMusicGame.setVolume(0.3)
      bgMusicGame.loop()
    
      instructions_page = false
      game_start = true
    }
      
    //the user needs to choose one of the themes to proceed to the next stage
      
  }
  
  //if the usre clicks anywhere on the screen while in the Game Over page, the game will be restarted
  else if(game_over_page == true)
  {
    bgMusic.stop()
    game_over_page = false
    restartGame()
  }
  
           
}

//check whether the player presses UP,DOWN, "W", or "S", and move the paddles correspondingly 
function keyPressed(){
    if(key == "w" || key == "W"){
        game.paddle.key_handler["w"] = true
    }
    else if(key == "s" || key == "S"){
        game.paddle.key_handler["s"] = true
    }
    else if(keyCode == UP_ARROW){
        game.paddle.key_handler[UP_ARROW] = true
    }
    else if(keyCode == DOWN_ARROW){
        game.paddle.key_handler[DOWN_ARROW] = true 
    }
}

//player 1 controls the paddle using "w" and "s" keys player 2 controls the paddle using "UP" and "DOWN" arrows
function keyReleased(){
    if(key == "w" || key == "W"){
        game.paddle.key_handler["w"] = false
    }
    else if(key == "s" || key == "S"){
        game.paddle.key_handler["s"] = false
    }
    else if(keyCode == UP_ARROW){
        game.paddle.key_handler[UP_ARROW] = false
    }
    else if(keyCode == DOWN_ARROW){
        game.paddle.key_handler[DOWN_ARROW] = false 
    }
  
}
