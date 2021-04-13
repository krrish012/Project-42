var b1 ,obstacleImage, obstaclegroup, foodgroup, back, backimg, score;

score = 0;

var player, player_running, banana, obstacle, invground, player_dead, dplayer;

function preload() {
  
backimg = loadImage("jungle.jpg");
  
player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png","Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png" ,"Monkey_10.png");
  
player_dead = loadImage("Monkey_02.png");
b1 = loadImage("banana.png");
  
obstacleImage = loadImage("stone.png");
  
}

function setup() {
createCanvas(800, 400);

back = createSprite(200,200,10,10);
back.addImage(backimg);
back.velocityX = -4;
back.scale = 1.5;
back.x = back.width/2;
  
player = createSprite(60,330,10,10); 
player.addAnimation("running", player_running);
player.scale = 0.1;
  
dplayer = createSprite(120,330,10,10); 
dplayer.addImage(player_dead);
dplayer.visible = false;
  
invground = createSprite(400, 390, 800, 10);
invground.visible = false;
invground.velocityX = -4;
invground.x = invground.width/2;
  
foodgroup = new Group();
obstaclegroup = new Group();
  
score = 0;

}

function draw() {
  
  if(invground.x <0) {
    invground.x = invground.width/2;
  }
    
  if(back.x <100) {
    back.x = back.width/2;
  }
  
  if(keyDown("space")) {  
    player.velocityY = -12;
  }
  
  player.velocityY = player.velocityY+0.8;
  
  player.collide(invground);
    
  if(player.isTouching(obstaclegroup)) {
    player.scale = 0.08;
    score = 10;
  }
  
  if(foodgroup.isTouching(player)) {
    foodgroup.destroyEach();
    score = score+2;
  }
  
  spawnfood();
  spawnobstacles();
  
  switch(score) {
    case 2: player.scale = 0.12;
      break;
    case 4: player.scale = 0.14;
      break;
    case 6: player.scale = 0.16;
      break;
    case 8: player.scale = 0.18;
      break;
    case 10: player.scale = 0.20;
      break;
    default: break;
  }
  
  if(score === 10) {
    player.velocityX = 0;
    back.velocityX = 0;
    foodgroup.visible = false;
    obstaclegroup.visible = false;
    dplayer.visible = true;
    dplayer.scale = player.scale;
    player.visible = false;
    score = 12;
   }
  
 drawSprites();
  
 stroke("white");
 textSize(20);
 fill("white");
 text("Score: "+ score, 50,50);

 if(score === 12) {
  stroke("black");
  textSize(40);
  fill("white");
  text("Game Over", 285,200);
 }

  
} 

function spawnfood() {
  if(frameCount % 80 === 0){
    var food1 = createSprite(600,250,40,10);
    food1.y = random(120,200);
    food1.addImage(b1);
    food1.scale = 0.05;
    food1.velocityX = -5;
    food1.lifetime = 300;
    player.depth = food1.depth +1;
    foodgroup.add(food1);
  }
}

function spawnobstacles() {
  if(frameCount % 300 === 0){
    var obs1 = createSprite(800,350,10,40);
    obs1.velocityX = -7;
    obs1.addImage(obstacleImage);
    obs1.scale = 0.2;
    obs1.lifetime = 300;
    obstaclegroup.add(obs1);
  }
}