var PLAY=1;
var END=0;
var gameState=PLAY;
var tower;
var ghost;
var door, doorImg;
var climber, climberImg;
var invisiBlock
var gameOver
function preload(){
  towerImg=loadImage('tower.png');
  ghostImg=loadAnimation('ghost-standing.png');
  doorImg=loadImage('door.png');
  climberImg=loadImage('climber.png');
  gameOverImg=loadImage('game_over.png');
  spookySound=loadSound('spooky.wav');
}
function setup(){
  createCanvas(400,400);
  tower=createSprite(200,0,50,50);
  tower.addImage('tower',towerImg)
  tower.scale=0.75;
  //tower.y=tower.height/2;
  tower.velocityY=1;
  ghost=createSprite(200,200,10,10);
  ghost.addAnimation('ghost',ghostImg);
  ghost.scale=0.3;
  doorG=new Group();
  climberG=new Group();
  invisiG=new Group();
  spookySound.play();
}
function draw(){
  background('purple');
  if(tower.y>300){
     tower.y=tower.height/20;
  }
  if(gameState==PLAY){
  spawnDoors();
  if(keyDown('space')){
    ghost.velocityY=-4;
  }
  ghost.velocityY=ghost.velocityY+0.4;
  if(keyDown('left_arrow')){
    ghost.x=ghost.x-3;
  }
  if(keyDown('right_arrow')){
    ghost.x=ghost.x+3;
  }
  if(ghost.isTouching(climberG)){
    ghost.velocityY=0;
  }
  if(ghost.isTouching(invisiG)||ghost.y>399){
    ghost.destroy();
    gameState=END
  }
  }
  if(gameState==END){
    gameOver=createSprite(200,200,10,10);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.25;
    tower.velocityY=0;
    doorG.destroyEach();
    climberG.destroyEach();
    invisiG.destroyEach();
    spookySound.stop();
  }
  drawSprites();
}
function spawnDoors(){
if(frameCount%50==0){
door=createSprite(Math.round(random(50,350)),0,20,20);
  door.velocityY=4;
  door.addImage('door',doorImg);
  door.lifetime=110;
  doorG.add(door);
  climber=createSprite(door.x,door.y+55,10,10);
  climber.velocityY=door.velocityY;
  climber.addImage(climberImg);
  climber.lifetime=110;
  ghost.depth=climber.depth+3;
  climberG.add(climber); invisiBlock=createSprite(climber.x,climber.y+10,climber.width,10);
  invisiBlock.velocityY=climber.velocityY;
  invisiBlock.visible=false;
  invisiBlock.lifetime=110;
  invisiG.add(invisiBlock);
}
}