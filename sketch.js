var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";
var spookySound;
function preload(){
  //load images
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  //load sound
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  //to create tower
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  //to create ghost
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
  climbersGroup = new Group();
  
}

function draw(){
  background(220);
  
  if(gameState === "play"){
    if(tower.y > 400){
    tower.y = 300;
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }
 if(keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  } 
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    tower.velocityY = 0;
    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600 ){
    ghost.destroy();
    gameState = "end";
  }
  spawnDoors();
    drawSprites();
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(20);
    text("GAME OVER",300,300);
  }
  
}

function spawnDoors(){
  if(frameCount % 250 === 0){
    door = createSprite(300,-50,18,18);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 900;
    door.x = Math.round(random(120,400));
    doorsGroup.add(door);
    
    climber = createSprite(300,0,20,20);
    climber.addImage(climberImg);
    climber.x = door.x
    climber.velocityY = 1;
    climber.lifetime = 900;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(300,15,20,2)
    invisibleBlock.width = climber.width;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.x = door.x;
    
    door.depth = climber.depth;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
  }
  
}

