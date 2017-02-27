var KEYS = [];

class Character {
  constructor(context, width, height, image, speed) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.image =  new Image();
    this.image.src = image;
    this.x = 0; //position x
    this.y = 0; //position y
    this.cutX = 0;
    this.cutY = 0;
    this.direction = DIRECTIONS.RIGHT;
    this.animate = false;
    this.speed = speed;
  }

  draw() {
    this.move();
    this.context.drawImage(this.image, (this.cutX * this.width),
                          (this.height * this.cutY), this.width, this.height,
                          this.x, this.y,
                          this.width, this.height);
  }

  move() {}  
}

class PlayerCharacter extends Character {
  constructor(context, width, height, image, speed) {
    super(context, width, height, image, speed);
    this.count = 0;
  }

  move() {
   		if (KEYS[37])
      {
        this.animate = true;
        this.x -= this.speed;
        this.direction = DIRECTIONS.LEFT;
      } // If left key pressed go left
 		  else if (KEYS[39])
      {
        this.animate = true;
        this.x += this.speed;
        this.direction = DIRECTIONS.RIGHT;
      } // Right key
      else if (KEYS[38])
      {
        this.animate = true;
        this.y -= this.speed;
        this.direction = DIRECTIONS.DOWN;
      } // Down key
      else if (KEYS[40]) {
        this.animate = true;
        this.y += this.speed;
        this.direction = DIRECTIONS.UP;
      } // Up key
      else {
        this.animate = false;
      }
      this.setAnimationFrame();
  }


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

var DIRECTIONS = {
  UP : 0,
  LEFT : 1,
  RIGHT : 2,
  DOWN : 3
}

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



class Game {
  constructor(canvas)  {
    this.inputHandler = new InputHandler()
    this.drawables = [];
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  addDrawable(d) {
    this.drawables.push(d);
  }

  removeDrawable(d) {
    this.drawables.pop(d);
  }

  start() {
    this.canvas.width = 960;
    this.canvas.height = 640;
    this.canvas.style.backgroundColor = 'white'
    // Game will be 2d
    draw();
  }
}


canvas = document.getElementById('canvas');
var gameInstance = new Game(canvas)

//can't live in the class so we gave to do this hacky crap
function draw() {
    gameInstance.context.clearRect(0, 0, 960, 640);
    gameInstance.drawables.forEach(function(d) {
      d.draw(0,0,0,0)
    });
    window.requestAnimationFrame(draw);
}


var character = new PlayerCharacter(gameInstance.context, 32, 32, 'img/better_sprite.png', 2)
gameInstance.addDrawable(character);
//now that draw is defined we can start the game
gameInstance.start();
