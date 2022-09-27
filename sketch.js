var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount=0;
var gameState
var allPlayers
var car1,car2
var cars
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1img=loadImage("assets/car1.png")
  car2img=loadImage("assets/car2.png")
  trackimg=loadImage("assets/track.jpg")

  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  cars=[]
  game = new Game();
  game.start();

}

function draw() {
  background(backgroundImage);
  if(playerCount==2){
    game.update(1)
    game.play()
    console.log(allPlayers)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
