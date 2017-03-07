//allows us to actually catch errors that would otherwise fail silently
'use strict';

//global array for all pressed keys
var KEYS = [];

//the game class, posesses the canvas and calls all of the draw functions
class Game {
  constructor(canvas)  {
    this.drawables = [];
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  //anything that's drawable we need to add to this list so that
  //we call its draw method on draw
  addDrawable(d) {
    this.drawables.push(d);
  }


  //call the initial global draw function and set some values
  start() {
    this.canvas.width = 960;
    this.canvas.height = 640;
    this.canvas.style.backgroundColor = 'white'
    // Game will be 2d
    draw();
  }
}

//get the canvas from the html
var canvas = document.getElementById('canvas');
var gameInstance = new Game(canvas)
var collisionResolver = new CollisionResolver();
var inputHandler = new InputHandler();

//can't live in the class so we gave to do this hacky crap
function draw() {
    gameInstance.context.clearRect(0, 0, 960, 640);
    gameInstance.drawables.forEach(function(d) {
      d.draw();
    });
    inputHandler.pollForKeyboardInput();
    collisionResolver.detectCollisions();
    if(!isBarrierSolid)
      barrier3.solid = false;
    updateLogs();
    window.requestAnimationFrame(draw);
}

//lets create our character from the sprite sheet
var character = new PlayerCharacter(gameInstance.context, 32, 32, 'img/better_sprite.png', 2, 0, 0, true);
var ma = new MessageArea(gameInstance.context, 20, 20, 500, 500, false, 'blue');
var barrier = new Obstacle(gameInstance.context, 20, 250, 300, 200);
var barrier2 = new Obstacle(gameInstance.context, 200, 20, 250, 350);

var barrier3 = new Obstacle(gameInstance.context, 20, 300, 40, 50);
var isBarrierSolid = true;

//here we go with this same idea for collisions, drawing, and keyboard input polling
inputHandler.addPoller(character);
inputHandler.addPoller(ma);

//whoever is added second gets their draw method called second and is therefore drawn on top
gameInstance.addDrawable(ma);
gameInstance.addDrawable(barrier);
gameInstance.addDrawable(barrier2);
gameInstance.addDrawable(character);
gameInstance.addDrawable(barrier3);
//order won't matter too much here, whoever is added second gets their collision method
//called second
collisionResolver.addCollidable(ma);
collisionResolver.addCollidable(character);
collisionResolver.addCollidable(barrier);
collisionResolver.addCollidable(barrier2);
collisionResolver.addCollidable(barrier3);
//now that draw is defined we can start the game
gameInstance.start();
