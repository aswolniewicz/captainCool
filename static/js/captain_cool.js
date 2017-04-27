//allows us to actually catch errors that would otherwise fail silently
'use strict';

//global array for all pressed keys
var KEYS = [];
//Array storing objects picked up by the character
var OBJ = [];

var charX = 0;
var charY = 0;

//the game class, posesses the canvas and calls all of the draw functions
class Game {
  constructor(canvas,input,resolver)  {
    this.canvas = canvas;
    this.input=input;
    this.resolver=resolver;

	this.levels = [];
	this.currentLevel = null;
    this.drawables = [];
    this.collidables=[]; //List of collidable objects belonging to game instance
    this.context = this.canvas.getContext("2d");
  }

  //anything that's drawable we need to add to this list so that
  //we call its draw method on draw
  addDrawable(d) {
    this.drawables.push(d);
    if(d.collides){ //When adding drawables check also if they're collidable
		this.collidables.push(d);
	}
  }
  removeDrawable(d) {
    var index = this.drawables.indexOf(d);
    if (index > -1){
      this.drawables.splice(index,1);
    }
    this.removeCollidable(d);
    this.currentLevel.removeDrawable(d);
  }
  removeCollidable(c){
  	var index = this.collidables.indexOf(c) //Find collidable in list
  	if(index > -1){ // If its found
        this.collidables.splice(index,1) //Remove it from the list
      }
  }
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentLevel.displayScreen();
    var self = this;
    this.drawables.forEach(function(d) {
      d.draw();
    });
    //Append the current game's, level's, and screen's collidable list
    //To the collision resolver collidable list
    this.resolver.collidables=this.collidables.concat(this.currentLevel.collidables).concat(this.currentLevel.currentScreen.collidables);
    this.resolver.detectCollisions();
    this.input.pollForKeyboardInput();
    //updateLogs();
    window.requestAnimationFrame(function(){self.draw();});
  }
  //call the initial global draw function and set some values
  start() {
    this.canvas.width = 960;
    this.canvas.height = 640;
    this.canvas.style.backgroundColor = 'white';
    // Game will be 2d
    this.draw();
  }

}

//get the canvas from the html
var canvas = document.getElementById('canvas');
var collisionResolver = new CollisionResolver();
var inputHandler = new InputHandler();
var gameInstance = new Game(canvas,inputHandler,collisionResolver);

//lets create our character from the sprite sheet
// Changed speed to 5 from 3 to speed up testing.
var character = new PlayerCharacter (gameInstance, 44, 60, '../static/img/captain_cool.png', 5, 150, 0, true);
var masterCool = new NonPlayerCharacter(gameInstance, 53, 64, '../static/img/master_cool.png', 2, 400, 50, true);
var maArray = ['message','Test Message: Press enter to dismiss.']
var key1Array = ['message','You have found a key.  Press enter to dismiss','key','Key_For_Screen2_Door']
var key1 = new MessageArea(gameInstance, 48, 48, 500, 500, '../static/img/newKey.png', false, key1Array);
var barrier = new Obstacle(gameInstance, 20, 250, 300, 200);
var barrier2 = new Obstacle(gameInstance, 200, 20, 250, 350);
var barrier3 = new Obstacle(gameInstance, 20, 300, 40, 50);
// The following obstacles are part of the maze.
// var name = new Obstacle(gameInstance,width,height,x,y);
var rightWall = new Obstacle(gameInstance,20, 800, 900,0);
var topWall = new Obstacle(gameInstance,500,20,150,100);
var aWall = new Obstacle(gameInstance,20,200,650,100);
var bWall = new Obstacle(gameInstance,20,300,750,0);
var cWall = new Obstacle(gameInstance,120,20,650,300);
var dWall = new Obstacle(gameInstance,20,250,550,250);
var eWall = new Obstacle(gameInstance,220,20,550,500);
var fWall = new Obstacle(gameInstance,220,20,200,500);
var gWall = new Obstacle(gameInstance,20,150,150,220);
var hWall = new Obstacle(gameInstance,120,20,150,220);
var iWall = new Obstacle(gameInstance,20,150,250,220);
var jwall = new Obstacle(gameInstance,300,20,250,350);
var kwall = new Obstacle(gameInstance,20,200,650,500);
var lwall = new Obstacle(gameInstance,20,150,400,100);

//testScreen.addDrawable(barrier)
//
var testLevel = new Level(gameInstance,1);
var testScreen = new Screen(testLevel,1,'../static/img/background.png','image');
var testScreen2 = new Screen(testLevel,2,'../static/img/background.png','image');
var testDoor = new Door(testScreen, 10, 150, 950, 250,testScreen2, 'black',['location',15,300,'keyed','Key_For_Screen2_Door']);
var testDoor2 = new Door(testScreen2, 10, 150, 0, 250,testScreen, 'black',['location',900,300]);

//here we go with this same idea for collisions, drawing, and keyboard input polling
inputHandler.addPoller(character);
inputHandler.addPoller(key1);

//whoever is added second gets their draw method called second and is therefore drawn on top
//The argument before addDrawable determines where elements appear throughout the game.
//They can appear throughout the entire game, only on a screen, or only on a level
//testScreen.addDrawable(ma);
testScreen.addDrawable(key1);
testScreen.addDrawable(barrier);
testScreen.addDrawable(barrier2);
gameInstance.addDrawable(character);
testScreen.addDrawable(barrier3);
testScreen2.addDrawable(rightWall);
testScreen2.addDrawable(topWall);
testScreen2.addDrawable(aWall);
testScreen2.addDrawable(bWall);
testScreen2.addDrawable(cWall);
testScreen2.addDrawable(dWall);
testScreen2.addDrawable(eWall);
testScreen2.addDrawable(fWall);
testScreen2.addDrawable(gWall);
testScreen2.addDrawable(hWall);
testScreen2.addDrawable(iWall);
testScreen2.addDrawable(jwall);
testScreen2.addDrawable(kwall);
testScreen2.addDrawable(lwall);



testScreen.addDrawable(masterCool);
//order won't matter too much here, whoever is added second gets their collision method
//called second

console.log(this.drawables)

testLevel.currentScreen=testScreen;
gameInstance.currentLevel=testLevel;

//now that draw is defined we can start the game
gameInstance.start();