var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy,candy1,candy2,candy3,candy4
var ground, invisibleGround, groundImage,boyrunning,boycollided,chocolatescollected=0;


var obstaclesGroup, obstacle1, obstacle2, obstacle3
var candy1,candy2,candy3,candy4
var score;
var gameOverImg,restartImg


function preload(){
  boyrunning =("boy.png") ;
  boycollided = loadAnimation("boycollided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  
  candy1=loadImage("candy1.png")
  candy2=loadImage("candy2.png")
  candy3=loadImage("candy3.png")
  candy4=loadImage("candy4.png")
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameover.png")
  
  
}

function setup() {
  createCanvas(600, 200);

  boy = createSprite(50,90,20,50);
  boy.addAnimation("running", boyrunning);
  boy.addAnimation("collided", boycollided);
  boy.scale = 0.4;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.3;
  restart.scale = 0.1;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
   candyGroup=createGroup()
  
  boy.setCollider("rectangle",0,0,boy.width,boy.height);
  boy.debug = true
  
  score = 0;
  
}

function draw() {
  
  background("skyblue");
  
  text("Score: "+ score, 500,50);
  text("chocolatescollected:"+chocolatescollected,200,20)
  
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& boy.y >= 160) {
        boy.velocityY = -12;
        
    }
    
    boy.velocityY = boy.velocityY + 0.8
  
    if (candyGroup.isTouching(boy)){
      chocolatescollected=chocolatescollected+1
      candyGroup.destroyEach()
    }
    
    spawnClouds();
    spawnObstacles();
     candy()
    
    if(obstaclesGroup.isTouching(boy)){
      gameState = END;
      }
  }
    if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
  
      boy.changeAnimation("collided", boycollided);
   
     
      ground.velocityX = 0;
      boy.velocityY = 0
      candyGroup.velocityX=0
     
     obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     candyGroup.setLifetimeEach(-1)
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     candyGroup.setVelocityXEach(0)
     
     if(mousePressedOver(restart)) {
      reset();
    }

   }
  
  boy.collide(invisibleGround);
  
 
drawSprites();
}

function reset(){
gameState=PLAY
gameOver.visible=false
restart.visible=false
boy.changeAnimation("running",boyrunning)
obstaclesGroup.destroyEach()
cloudsGroup.destroyEach()
score=0
  candyGroup.destroyEach()
  chocolatescollected=0; 5
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
              
    obstacle.scale = 0.1  ;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
 
    cloud.lifetime = 200;
    
    cloud.depth = boy.depth;
    boy.depth = boy.depth + 1;
    cloudsGroup.add(cloud);
  }
}
 
function candy(){
 if (frameCount%80===0){ 
   var candy=createSprite(400,120,20,20)
   var rand=Math.round(random(1,4))
  
  switch(rand){
      case 1: candy.addImage(candy1);
              break;
      case 2: candy.addImage(candy2);
              break;
      case 3: candy.addImage(candy3);
              break;
       case 4: candy.addImage(candy4);
              break;       
      default: break;
    }
   candy.velocityX=-5
    candy.scale=0.1
   candy.lifetime=200
  candyGroup.add(candy)
  }
}
