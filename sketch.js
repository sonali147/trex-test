var PLAY = 1;
var END = 0;
var fruit1img, fruit2img, fruit3img, fruit4img;
var alien1img, alien2img;
var sword, swordImage;
var gameOverImage;
var fruitGroup, enemyGroup;
var knifeSwoosh, gameOverSound;
var selectFruit;
var selectEnemy;
var gameState = PLAY;
var score = 0;
var position;

function preload() {
  fruit1img = loadImage("fruit1.png");
  fruit2img = loadImage("fruit2.png");
  fruit3img = loadImage("fruit3.png");
  fruit4img = loadImage("fruit4.png");
  alien1img = loadImage("alien1.png");
  alien2img = loadImage("alien2.png");
  swordImage = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSwoosh = loadSound("knifeSwoosh.mp3");
}

function setup() {
  createCanvas(400, 400);
  sword = createSprite(200, 200, 10, 10);
  sword.addImage(swordImage);
  sword.scale = 0.5;

  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {
  background(167, 252, 247);

  textSize(20);
  text("SCORE : " + score, 260, 30);

  if (gameState === PLAY) {
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    sword.setCollider("circle", 0,0,40);
    if (World.frameCount % 60 === 0) {
      createFruit();
      createEnemy();
    }
    if (fruitGroup.isTouching(sword)) {
      score += 2;
      fruitGroup.destroyEach();
      knifeSwoosh.play();
    }
    if (enemyGroup.isTouching(sword)) {
      enemyGroup.destroyEach();
      gameState = END;
      gameOverSound.play();
    }
  } else if (gameState === END) {
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityYEach(0);
    enemyGroup.setVelocityYEach(0);
    sword.addImage(gameOverImage);
    sword.scale = 2;
    sword.x = 200;
    sword.y = 200;
  }
  drawSprites();
}

function createFruit() {
  selectFruit = Math.round(random(1, 4));
  fruit = createSprite(405, Math.round(random(50, 350)), 20, 20);
  position = Math.round(random(1,2));
  if (position == 1) {
    fruit.x = -5;
    if (score >= 4) {
      fruit.velocityX = 7+score/4;
    } else {
      fruit.velocityX = 7;
    }
  }
  else if (position == 2) {
    if (score >= 4) {
      fruit.velocityX = -(7+score/4);
    } else {
      fruit.velocityX = -7;
    }
}
  switch (selectFruit) {
    case 1: fruit.addImage(fruit1img);
      break;
    case 2:fruit.addImage(fruit2img);
      break;
    case 3:fruit.addImage(fruit3img);
      break;
    case 4:fruit.addImage(fruit4img);
      break;
    default:break;
  }
  fruitGroup.add(fruit);
  fruitGroup.setScaleEach(0.2);
  fruitGroup.setLifetimeEach(50);
  fruitGroup.setColliderEach("circle",0,0,30);
  
}

function createEnemy() {
  selectFruit = Math.round(random(1, 2));
  var alien = createSprite(405, Math.round(random(50, 350)), 20, 20);
  position = Math.round(random(1,2));
  if (position == 1) {
    alien.x = -5;
    if (score >= 10) {
      alien.velocityX = 5 + score/10;
    } else {
      alien.velocityX = 5;
    }
  }
  else if (position == 2) {
    if (score >= 10) {
      alien.velocityX = -(5 + score/10);
    } else {
      alien.velocityX = -5;
    }
  }
  switch (selectFruit) {
    case 1:alien.addImage(alien1img);
      break;
    case 2:alien.addImage(alien2img);
      break;
    default:break;
  }
  enemyGroup.add(alien);
  enemyGroup.setLifetimeEach(60);
}