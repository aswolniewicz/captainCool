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
  // uses the WASD keys
  move() {
    this.animate = false; //presume no movement unless movement key is pressed
   	if (KEYS[65]){ // Go Left
      this.animate = true; // Bool that allows the sprite to move
      this.x -= this.speed; // Move left (x value is decremented)
      this.direction = DIRECTIONS.LEFT; //  use the left-facing image of the sprite                                    
    }
    if (KEYS[68]){ // Go Right 
      this.animate = true;
      this.x += this.speed;
      this.direction = DIRECTIONS.RIGHT;
    }
    if (KEYS[87]){ // Go Up
      this.animate = true;
      this.y -= this.speed;
      this.direction = DIRECTIONS.UP;
    }
    if (KEYS[83]){ // Go Down
      this.animate = true;
      this.y += this.speed;
      this.direction = DIRECTIONS.DOWN;
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
  DOWN : 0,
  LEFT : 1,
  RIGHT : 2,
  UP : 3
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

