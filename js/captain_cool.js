//allows us to actually catch errors that would otherwise fail silently
'use strict';

//global array for all pressed keys
var KEYS = [];

//the game class, posesses the canvas and calls all of the draw functions
class Game {
  constructor(canvas,input,resolver)  {
    this.canvas = canvas;
    this.input=input;
    this.resolver=resolver;

	this.levels = [];
	this.currentLevel = null;
    this.drawables = [];
    this.context = this.canvas.getContext('2d');
  }

  //anything that's drawable we need to add to this list so that
  //we call its draw method on draw
  addDrawable(d) {
    this.drawables.push(d);
  }
  draw() {
    this.context.clearRect(0, 0, 960  , 640);
    this.currentLevel.displayScreen();
    this.drawables.forEach(function(d) {
      d.draw();
    });
    this.input.pollForKeyboardInput();
    this.resolver.detectCollisions();
    updateLogs();
    var self = this;
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
var character = new PlayerCharacter(gameInstance.context, 44, 60, 'img/captain_cool.png', 5, 150, 0, true);
var masterCool = new Character(gameInstance.context, 53, 64, 'img/master_cool.png', 2, 400, 50, true);
var ma = new MessageArea(gameInstance.context, 20, 20, 500, 500, false, 'blue');
var barrier = new Obstacle(gameInstance.context, 20, 250, 300, 200);
var barrier2 = new Obstacle(gameInstance.context, 200, 20, 250, 350);
var barrier3 = new Obstacle(gameInstance.context, 20, 300, 40, 50);

//testScreen.addDrawable(barrier)
//
var testLevel = new Level(gameInstance,1);
var testScreen = new Screen(testLevel,1,'purple');
var testScreen2 = new Screen(testLevel,2,'magenta');
var testDoor = new Door(testScreen, 10, 150, 950, 250,testScreen2, testScreen2.color,15,300);
var testDoor2 = new Door(testScreen2, 10, 150, 0, 250,testScreen, testScreen.color,900,300);

//here we go with this same idea for collisions, drawing, and keyboard input polling
inputHandler.addPoller(character);
inputHandler.addPoller(ma);

//whoever is added second gets their draw method called second and is therefore drawn on top
gameInstance.addDrawable(ma);
//could remove gameInstance and replace with testScreen
gameInstance.addDrawable(barrier);
testLevel.addDrawable(barrier2);
gameInstance.addDrawable(character);
testScreen.addDrawable(barrier3);

gameInstance.addDrawable(masterCool);
//order won't matter too much here, whoever is added second gets their collision method
//called second
collisionResolver.addCollidable(ma);
collisionResolver.addCollidable(character);
collisionResolver.addCollidable(barrier);
collisionResolver.addCollidable(barrier2);
collisionResolver.addCollidable(barrier3);
collisionResolver.addCollidable(masterCool);

testLevel.currentScreen=testScreen;
gameInstance.currentLevel=testLevel;
collisionResolver.addCollidable(testDoor);
collisionResolver.addCollidable(testDoor2);

//now that draw is defined we can start the game
gameInstance.start();
