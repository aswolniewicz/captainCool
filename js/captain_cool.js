//global array for all pressed keys
var KEYS = [];

//base drawable class, anything drawn on the screen inherits this.
class Drawable {
  constructor(context, width, height, x, y) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  //draw method to overload
  draw() { }
}

class MessageArea extends Drawable {
  constructor(context, width, height, x, y, color) {
    super(context, width, height, x, y);
    //can't access this in constructor until we call super
    this.color = color; //color is a string (think css)
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

//any character that moves extends this class
class Character extends Drawable {
  constructor(context, width, height, image, speed, x, y) {
    //super calls the base class constructor
    //super.methodname() calls that method from the base class
    super(context, width, height, x, y)
    this.image =  new Image();
    this.image.src = image;
    this.cutX = 0;
    this.cutY = 0;
    this.direction = DIRECTIONS.RIGHT;
    this.animate = false;
    this.speed = speed;
  }

  //draws to canvas context based on the source image and the position
  draw() {
    this.move();
    this.context.drawImage(this.image, (this.cutX * this.width),
                          (this.height * this.cutY), this.width, this.height,
                          this.x, this.y,
                          this.width, this.height);
  }

  //move must be overridden if we want to do anything
  move() {}
}


//player character that responds to key input
class PlayerCharacter extends Character {
  constructor(context, width, height, image, speed, x, y) {
    super(context, width, height, image, speed, x, y);
    this.count = 0;
  }

  //checks if keys are pressed and if they are, move and animate
  move() {
      if (KEYS[37] && KEYS[40]) // Go Left and Down
      {
        this.animate = true;
        this.x -= this.speed;
        this.y += this.speed;
        this.direction = DIRECTIONS.LEFT;
      }
      else if (KEYS[37] && KEYS[38]) // Go Left and Up
      {
        this.animate = true;
        this.x -= this.speed;
        this.y -= this.speed;
        this.direction = DIRECTIONS.LEFT;
      }
      else if (KEYS[39] && KEYS[40]) // Go Right and Down
      {
        this.animate = true;
        this.x += this.speed;
        this.y += this.speed;
        this.direction = DIRECTIONS.RIGHT;
      }
      else if (KEYS[39] && KEYS[38]) // Go Right and Up
      {
        this.animate = true;
        this.x += this.speed;
        this.y -= this.speed;
        this.direction = DIRECTIONS.RIGHT;
      }
   		else if (KEYS[37]) // Go Left
      {
        this.animate = true;
        this.x -= this.speed;
        this.direction = DIRECTIONS.LEFT;
      }
 		  else if (KEYS[39]) // Go Right
      {
        this.animate = true;
        this.x += this.speed;
        this.direction = DIRECTIONS.RIGHT;
      }
      else if (KEYS[38]) // Go Up
      {
        this.animate = true;
        this.y -= this.speed;
        this.direction = DIRECTIONS.DOWN;
      }
      else if (KEYS[40]) // Go Down
      {
        this.animate = true;
        this.y += this.speed;
        this.direction = DIRECTIONS.UP;
      }
      else {
        this.animate = false;
      }
      this.setAnimationFrame();
  }

  //figure out where on the spritesheet to animate from
  setAnimationFrame() {
        if(!this.animate)
          return;
        //set yImage based on direction for most sprites
        this.cutY = this.direction;
        if(this.count % 15 == 0) { // Every 15 movement frames (frame group) cycle through sprites
          if (this.count == 0){ // Begin cycle at sprite 2
            this.cutX = 0;
          }
          else if (this.count <= 30){ // Go to next sprite for 3 frame groups
            this.cutX++;
          }
          else if (this.count <= 60){ // Go to previous sprite for 2 frame groups
            this.cutX--;
          }
          else { // Reset cycle
            this.count = -1; // Increments up to 0 before next call
          }
        }
        this.count++;
    }

}

//an 'enum' for directions not sure how much milage we will get out
//of this as it's pretty specific to our only sprite sheet
var DIRECTIONS = {
  UP : 0,
  LEFT : 1,
  RIGHT : 2,
  DOWN : 3
}

//adds the key even listeners when it's constructed
class InputHandler {
  constructor() {
    window.addEventListener('keydown', function (e) {
 		      KEYS =(KEYS || []); //Boolean array of which keys are down
 		      KEYS[e.keyCode] = true;
 	  })
 	  window.addEventListener('keyup', function (e) {
 		    KEYS[e.keyCode] = false;
 	    })
  }
}

//the game class, posesses the canvas and calls all of the draw functions
class Game {
  constructor(canvas)  {
    this.inputHandler = new InputHandler()
    this.drawables = [];
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  //anything that's drawable we need to add to this list so that
  //we call its draw method on draw
  addDrawable(d) {
    this.drawables.push(d);
  }

  //pretty self explanatory
  removeDrawable(d) {
    this.drawables.pop(d);
  }

  //call the initial global draw function and set some values
  start() {
    this.canvas.width = 960;
    this.canvas.height = 640;
    this.canvas.style.backgroundColor = 'white'
    // Game will be 2d
    draw();
  }

  showMessage() {
    var messageArea = document.getElementById('message-area');
    messageArea.innerHTML = 'Test Message: Press enter to dismiss.';
  }

  hideMessage() {
    var messageArea = document.getElementById('message-area');
    messageArea.innerHTML = '';
  }

  //really great O(n^2) method that needs to be re written
  //maybe only check every object against objects that moved?
  detectCollisions() {
    var self = this;
    self.drawables.forEach(function(d1) {
      self.drawables.forEach(function(d2) {
        if(((d1.x >= d2.x) && (d1.x <= d2.x + d2.width))
            && ((d1.y >= d2.y) && (d1.y <= d2.y + d2.height)) && !(d1 === d2)) {
            self.showMessage(); //eventaully need to raise a method that notifies its args of the collision (observer)
        }
      });
    });
  }

  //keys that impact the entire game
  resolveGlobalKeys() {
    if(KEYS[13])
      this.hideMessage();
  }

}


//get the canvas from the html
canvas = document.getElementById('canvas');
var gameInstance = new Game(canvas)

//can't live in the class so we gave to do this hacky crap
function draw() {
    gameInstance.context.clearRect(0, 0, 960, 640);
    gameInstance.drawables.forEach(function(d) {
      d.draw()
    });
    gameInstance.detectCollisions();
    gameInstance.resolveGlobalKeys();
    window.requestAnimationFrame(draw);
}

//lets create our character from the sprite sheet
var character = new PlayerCharacter(gameInstance.context, 32, 32, 'img/better_sprite.png', 2, 0, 0)
var ma = new MessageArea(gameInstance.context, 20, 20, 500, 500, 'blue')

//whoever is added second gets their draw method called second and is therefore drawn on top
gameInstance.addDrawable(ma);
gameInstance.addDrawable(character);
//now that draw is defined we can start the game
gameInstance.start();
