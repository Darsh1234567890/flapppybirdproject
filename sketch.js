var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bird, bird_running, bird_collided;
var ground, invisibleGround, groundImage, gr;

var obstaclesGroup, obstacle, obstaclee, obstacle3, obstacle4, obstacle5, obstacle6;


var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var bgImg;

var score; 
score = 0;

function preload(){
  bird_running = loadAnimation("bird.png");
  bird_collided = loadAnimation("bird_collided.png");
  
  groundImage = loadImage("ground2.png");

  bgImg = loadImage("bg.jpg");
  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bird = createSprite(50,windowHeight-40,20,50);
  bird.addAnimation("running", bird_running);
  bird.addAnimation("collided", bird_collided);
  

  bird.scale = windowHeight/1500;
  
  ground = createSprite(200,windowHeight-16,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,windowHeight-16,400,10);
  invisibleGround.visible = false;

  gr = createSprite(200,16,400,10);
  gr.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();


  
  bird.setCollider("rectangle",0,0,bird.width+bird.width,bird.height+bird.height/1.8);
  


  
  
}

function draw() {
  
  background(bgImg);
  //displaying score
  
  textSize(30);
  // setTimeout(() => {
  //   var score; 
  //   score = 0;
  // }, 100);
  console.log(score);
  //text("Score: "+ score, windowWidth - 200,100);
  // console.log(message);
  // console.log(bird.position.x);
  // console.log(bird.position.y);
  // console.log(windowHeight);
  // console.log(windowHeight-(bird.height-1));

  if(bird.position.y > 69 && bird.position.y <70){
    bird.position.y = 71
  }
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    //score = score + Math.round(getFrameRate()/60);
    
    // if(score>0 && score%100 === 0){
    //    checkPointSound.play() 
    // }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    // if(obstacle.x == bird.x){
    //   score+=10;
    // }
    
    //add gravity
    bird.velocityY = bird.velocityY + 0.8
  
    //spawn the 
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(bird)){
        //bird.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
    
    
     if(mousePressedOver(restart)) {
      reset();
    }
     
      ground.velocityX = 0;
      bird.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

     
     obstaclesGroup.setVelocityXEach(0);
 
   }
  
 
  //stop bird from falling down
  bird.collide(invisibleGround);
  bird.collide(gr);
  
  


  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();

  score = 0
  bird.changeAnimation("running", bird_running)
  bird.position.x = 50;
  bird.position.y = windowHeight-40;

}


function spawnObstacles(){
 if (frameCount % 100 === 0){

   obstacle = createSprite(windowWidth+100,random(0, windowHeight-(800)),10,windowHeight/15);
   obstacle.velocityX = -(6 + score/100);

   obstaclee = createSprite(windowWidth+100,obstacle.position.y+windowHeight+(windowHeight/3.5),10,windowHeight/6.9);
   obstaclee.velocityX = -(6 + score/100);

   //score+=10

   obstacle.shapeColor = "#0ef454";
   obstaclee.shapeColor = "#0ef454";
  
   console.log(obstacle.x, "obstacle");
   console.log(bird.x, "bird");
   //obstacle.velocityX = bird.position.y/-50;
   
    //generate random obstacles
    // var rand = Math.round(random(1,6));
    // switch(rand) {
    //   case 1: obstacle.addImage(obstacle1);
    //           break;
    //   case 2: obstacle.addImage(obstacle2);
    //           break;
    //   case 3: obstacle.addImage(obstacle3);
    //           break;
    //   case 4: obstacle.addImage(obstacle4);
    //           break;
    //   case 5: obstacle.addImage(obstacle5);
    //           break;
    //   case 6: obstacle.addImage(obstacle6);
    //           break;
    //   default: break;
    // }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = windowHeight/100;
    obstacle.lifetime = windowWidth + 500;

    obstaclee.scale = windowHeight/100;
    obstaclee.lifetime = windowWidth + 500;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstaclesGroup.debug = true;

    obstaclesGroup.add(obstaclee);
    obstaclesGroup.debug = true;
    
 }
}



function keyReleased(){
  if(keyCode === 32){

  }
}

function keyPressed(){
  if(keyCode === 32){
    bird.velocityY = -windowHeight/88;
    jumpSound.play();
  }
}