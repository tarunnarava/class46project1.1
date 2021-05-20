var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var bg,cars, car1, car2, car3, car4;

var aster,kepler,asterGroup,asteroid1,asteroid2,asteroid1img,asteroid2img;

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){

  track = loadImage("images/ground.png");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  asteroid1img=loadImage("images/asteroid.png");
  asteroid2img=loadImage("images/asteroid2.png");
  bg=loadImage("images/bg.jpg");
  kepler=loadImage("images/kepler.png");

}


function setup(){

  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  asterGroup=createGroup();

}


function draw(){
  background(bg);
  if(playerCount === 4){
   
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
 

//drawSprites();

}

