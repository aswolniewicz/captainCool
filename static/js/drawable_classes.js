/**
* @class Drawable
* base drawable class, anything drawn on the sreen inherits this 
*/
class Drawable {
  constructor(game, width, height, x, y) {
    this.context = game.context;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  /**
  * @memberof Drawable
  * base draw class that needs to be overloaded 
  */
  draw() { }
}

/**
* @class Collidalbe
* extends Drawable 
*/
class Collidable extends Drawable{
  /**
  * @constructor
  * @param {Object} the game instance
  * @param {int} width of the object
  * @param {int} height of the object
  * @param {int} x-coord of the object on the canvas 
  * @param {int} y-coord of the object ont he canvas 
  * @param {boolean} tells whether the object can be walked over or not. If true then the object is solid, if false it is not
  */
  constructor(game, width, height, x, y, solid) {
    super(game, width, height, x, y);
    this.resolver= game.resolver;
    this.collides=true;
    this.solid = solid;
    this.contactList = [];
  }
  /**
  * @memberof Collidable
  * draw method not overloaded 
  */
  draw(){
  }
  /**
  * @memberof Collidable 
  * @param {Object} the object on the contact list that is no longer in contact with the object of owner
  * removes from contact list
  */
  baseOnContactLost(lostWith, i) {
    this.contactList.splice(i, 1);
  }

  /**
  * @memberof Collidable
  * this method is being overrided by baseOnContactLost but because of js inheritance rules has to call the base method
  */
  onContactLost(lostWith, i) {
    this.baseOnContactLost(lostWith, i);
  }

  /**
  * @memberof Collidable
  * when an object collides with another object add it to the contact list
  */
  baseOnCollision(collidedWith) {
    //if it doesn't exist in the contactList, add it
    if(this.contactList.indexOf(collidedWith) <= -1)
      this.contactList.push(collidedWith);
  }

  /**
  * @memberof Collidable
  * this method is being overrided by baseOnCollision
  * all it does is call baseOnCollision
  */
  onCollison(collidedWith) {
    this.baseOnCollision(collidedWith);
  }
}

/**
* @class Obstacle
* extends Collidable 
*/
class Obstacle extends Collidable {
  /**
  * @constructor
  * @param {object} instance of game l
  * @param {int} width of obstacle
  * @param {int} height of obstacle
  * @param {int} x-coord of obstacle on canvas
  * @param {int} y-coord of obstacle on canvas 
  */
  constructor(game, width, height, x, y) {
    super(game, width, height, x, y, true) //true b/c solid
  }
  /**
  * @memberof Obstacle
  * draw method for obstacle 
  */
  draw() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
/**
* @memberof Obstacle
* calls baseOnCollision method from Collidable
*/
  onCollision() {
    this.baseOnCollision();
  }
/**
* @memberof Obstacle
* calls baseOnContactLost method from Collidable
*/
  onContactLost() {
    this.baseOnContactLost();
  }

}
/**
* @class MessageArea
* extends collidable
* an interactive obstacle 
*/
class MessageArea extends Collidable {
  /**
  * @constructor 
  * @param {object} game instance
  * @param {int} width of the message area
  * @param {int} height of the message area
  * @param {int} x-coord of the message area
  * @param {imt} y-coord of the message area 
  * @param {file} file path to the image source
  * @param {boolean} solid flag. 
  * @param {string} string containing the message being printed by the message are 
  */
  constructor(game, width, height, x, y, message="", image='../static/img/alert.png', solid=false) {
    super(game, width, height, x, y, solid);
    //can't access this in constructor until we call super
   // this.color = color; //color is a string (think css)
    this.game = game;
    this.image = new Image();
    this.image.src = image;
    this.displayMessage = true;
    this.message=message;
    this.cutX = 0;
    this.cutY = 0;
  }

/**
* @memberof MessageArea
* draw method overloaded for message area 
*/
 draw() {
  charX = this.x;
  charY = this.y;
  this.context.drawImage(this.image, (this.cutX * this.width),
                          (this.height * this.cutY), this.width, this.height,
                          this.x, this.y,
                          this.width, this.height);

  }

  /**
  * @memberof MessageArea 
  * onCollision method for message area
  */
  onCollision(collidedwith) {
    this.baseOnCollision(collidedwith);
    if(this.displayMessage) {
      this.showMessage(this.message);
      this.displayMessage = false;
    }
  }

  /**
  * @memberof MessageArea
  * onContactLost method for message area
  */
  onContactLost(lostWith, i) {
    this.baseOnContactLost(lostWith, i);
    //do whatever else you need to do
    this.displayMessage = true;
  }

  /**
  * @memberof MessageArea
  * show message, show what the user inputed to the text box
  */
  showMessage(message) {
    var messageArea = document.getElementById('textBox');
    messageArea.innerHTML = message;
  }

  /**
  * @memberof MessageArea
  * hide message, hide what the user inputed to the text box
  */
  hideMessage() {
    var messageArea = document.getElementById('textBox');
    messageArea.innerHTML = '';
  }
}
/**
* @class Key
* extends message area, inherits everything from message area and adds to it
*/
class Key extends MessageArea {
  /**
  * @constructor 
  * @param {Object} game instance
  * @param {int} width of key
  * @param {int} height of key
  * @param {string} message belonging to the key
  * @param {file} image source for the key
  * @param {string} color of door, keylockedcolor
  */
  constructor(game, width, height, x, y, door, message=keymessage,  image='../static/img/key.png', lockcolor=keylockedcolor) {
    //Intialize all the same stuff as a MessageArea, assume unsolid
    super(game, width, height, x, y, message, image); 
    this.door=door; //Door to unlock
    this.color=door.color; //Store color of door when its unlocked
    this.door.color=lockcolor; //Change color to door to lockedcolor
	this.door.locked=true; //If it has a key, intialize door to being locked;
  }
/**
* @memberof Key
* this function deals with the key and door connection. If key has been collided with then remove key from canvas
* and set door to unlocked 
* @param {Object} the object that is colliding with the Key 
*/
  onCollision(collidedwith) {
	// Do the same message area stuff
    super.onCollision(collidedwith);
    // If you have already picked up the key don't pick it up again.
    if (OBJ.indexOf(this) <= -1){
	  // Unlock door
	  this.door.locked=false;
	  // Change door color back to its unlocked state
	  this.door.color=this.color;
	  // Add to item list
      OBJ.push(this);
      // Remove object from drawable list
      this.game.removeDrawable(this);
      var count; //Index of other object in this object's contact array
      var index; //Index of this object in other object's contact array
      var other; //Other object that is touching current object

      //Call contactLost function on all objects that were
      //Touching this object and vice versa
      for(count = 0; count < this.contactList.length; count++){
        other=this.contactList[count];
		this.onContactLost(other,count);
		index=other.contactList.indexOf(this);
		other.onContactLost(this,index);
	  }
    }
  }
}

/**
* @class Character
* base class for any object on canvas that moves. any subsequest character class extends this one
* extends the class Collidable because a character is also a Collidable 
*/
class Character extends Collidable {
  /**
  * @constructor
  * @param {Object} the game instance
  * @param {int} width of the character
  * @param {int} height of the character
  * @param {file} image source file for character
  * @param {int} speed that the character is moving, set to 5
  * @param {int} x-coord of start postion of character on canvas
  * @param {int} y-coord of start postion of character on canvas
  * @param {boolean} whether character is solid or not, i.e. collidable or not
  */
  constructor(game, width, height, image, speed, x, y, solid) {
    //super calls the base class constructor
    //super.methodname() calls that method from the base class
    super(game, width, height, x, y, solid)
    this.image =  new Image();
    this.image.src = image;
    this.cutX = 0;
    this.cutY = 0;
    this.direction = DIRECTIONS.RIGHT;
    this.animate = false;
    this.speed = speed;
    this.dialogue = "";
    this.isSpeaking = false;
    this.speechCounter = 0;
    this.speechDuration;
  }

  /**
  @memberof Character
  * base draw method for any character, renders the sprite sheet and sets speak style, fill 
  */
  draw() {
    charX = this.x;
    charY = this.y;
    this.context.drawImage(this.image, (this.cutX * this.width),
                          (this.height * this.cutY), this.width, this.height,
                          this.x, this.y,
                          this.width, this.height);
    if(this.isSpeaking) {
      if(this.speechCounter <= this.speechDuration) {
        this.context.font = "14px Arial";
        this.context.fillStyle = 'white';
        this.context.fillText(this.dialogue, this.x - 20, this.y - 20);
        this.speechCounter += 1;
      }
      else {
        this.silence();
      }
    }
  }
  /**
  * @memberof Character 
  * @param {string} the message to be spoken to the screen
  * @param {int} duration of the message in frames. 120 = 2 seconds 
  */
  speak(dialogue, duration) {
    this.isSpeaking = true;
    this.dialogue = dialogue;
    this.speechDuration = duration;
  }
/**
* @memberof Character
* sets isSpeaking boolean to false to silence character
*/
  silence() {
    this.isSpeaking = false;
    this.speechCounter = 0;
  }
  /**
  * @memberof Character
  * calls the base on collision method for Collidable 
  */
  onCollision(){
	  this.baseOnCollision();
  }

  /**
  * @memberof Characer
  * base move method that does nothing, needs to be overwritten for a moving character
  */
  move(up, left, right, down, direction) {}
}


/**
* @class NonPlayerCharacter 
* extends Character class
* for characters like masterCool who animate but are not controlled by keyboard input. 
*/
class NonPlayerCharacter extends Character{
  /**
  * @constructor
  * @param {object} game instance
  * @param {int} x-coord on the canvas
  * @param {int} y-coord on the canvas 
  * @param {string} message that the nonPlayerCharacter speaks when collided with
  * @param {int} width dimension of the character
  * @param {int} height dimension of the character
  * @param {file} image source, currently hardcoded because we have only one nonplayer character
  * @param {int} speed also hardcoded to be 2 
  * @param {boolean} solid boolean, pass true 
  */
	constructor(game, x, y, message="", width=53, height=64,image= '../static/img/master_cool.png', speed=2, solid=true) {
    super(game, width, height, image, speed, x, y, solid);
    this.message = message;
    this.count = 0;
}
  /**
  * @memberof NonPlayerCharacter
  * @param {Object} the object that collided with the NPC 
  * calls base on collision from collidable class and also speaks message passed in constructor 
  */
  onCollision(collidedWith){
    this.baseOnCollision(collidedWith);

    if(collidedWith.solid == true){
     this.speak(this.message, 120);
   }

  }
  /**
  * @memberof NonPlayerCharacter
  * this function allows the NPC to constantly animate 
  */
  rock(){
    this.setAnimationFrame();
  }
  /**
  * @memberof NonPlayerCharacter
  * uses the sprite sheet to animate. Every 15 frames the image changes 
  */
  setAnimationFrame() {

        if(this.count % 15 == 0) { // Every 15 movement frames (frame group) cycle through sprites
          if (this.count == 0){ // Begin cycle at sprite 0
            this.cutX = 0;
          }
          else if (this.count == 15){ // Go to sprite 1
            this.cutX = 1;
          }
          else if (this.count == 30){ // go to sprite 2
            this.cutX = 2;
          }
          else if (this.count == 45){ // return to sprite 1
            this.cutX = 1;
            this.count = -15; // This will make it go back to sprite 0
          }
        }
        this.count++;

    }

    /**
    * @memberof NonPlayerCharacter
    * draw function for NPC. Calls rock which calls setAnimationFrame then calls the draw method from Character
    */
    draw(){
      this.rock();
      super.draw();
    }
}


//player character that responds to key input
/**
* @class PlayerCharacter
* extends character
* PlayerCharacter moves based on keyboard input
*/
class PlayerCharacter extends Character {
  /**
  * @constructor
  * @param {object} game instance
  * @param {int} width dimension of the character
  * @param {int} height dimension of the character
  * @param {file} image source
  * @param {int} speed should be 5
  * @param {int} x-coord on the canvas
  * @param {int} y-coord on the canvas 
  * @param {boolean} solid boolean, pass true 
  */
  constructor(game, width, height, image, speed, x, y, solid) {
    super(game, width, height, image, speed, x, y, solid);
    this.count = 0;
    this.parser=game.parser;
    this.canMoveUp = true;
    this.canMoveLeft = true;
    this.canMoveRight = true;
    this.canMoveDown = true;
  }
  /**
  * @memberof PlayerCharacter
  * initializes playercharcter to be able to move all directions
  * in place so we can disable movement later when dealing with collisions
  */
  allowMovement() {
    this.canMoveUp = true;
    this.canMoveLeft = true;
    this.canMoveRight = true;
    this.canMoveDown = true;
  }

  /**
  * @memberof PlayerCharacter
  * @param {Object} the object that has collided with the player character
  * onCollision method of Player Character builds off of baseOnCollision
  * disables movement based on where the character collided with an object
  * also has the character speak "I can't go this way" when colliding with an Obstacle
  */
  onCollision(collidedWith) {
    this.baseOnCollision(collidedWith);
    //for debug purposes
   // debugContactList = this.contactList;

    if(collidedWith.solid == true) {
      if(this.direction == DIRECTIONS.UP) {
        this.canMoveUp = false;
        this.bounce(0, 0, 0, 2);
      }
      if(this.direction == DIRECTIONS.LEFT) {
        this.canMoveLeft = false;
        this.bounce(0, 0, 2, 0);
      }
      if(this.direction == DIRECTIONS.RIGHT) {
        this.canMoveRight = false;
        this.bounce(0, 2, 0, 0);
      }
      if(this.direction == DIRECTIONS.DOWN) {
        this.canMoveDown = false;
        this.bounce(2, 0, 0, 0);
      }

    }
    if (collidedWith.constructor.name == 'Obstacle'){
      this.speak("I can't go this way", 30);
    }
  }

  /**
  * @memberof PlayerCharacter
  * onContactLost method of player character
  * if lost contact with obstacle then allow movement again 
  */
  onContactLost(lostWith, i) {
    this.baseOnContactLost(lostWith, i);
    //for debug purposes
  //  debugContactList = this.contactList;
    if(lostWith.solid)
      this.allowMovement();
  }

/**
* @memberof PlayerCharacter 
* move method of character overwritten
* @param {boolean} pass a 1 if you want to move up 
* @param {boolean} pass a 1 if you want to move left
* @param {boolean} pass a 1 if you want to move right
* @param {boolean} pass a 1 if you want to move down 
* @param {object} directions.direction i.e. DIRECTIONS.LEFT
* when you call move you pass all bool params 0 except for 1 and that determines the direction the sprite moves
*/
  move(up, left, right, down, direction) {
      this.animate = true;
      // use pressed to normaize the speed.  Its not perfect right now but its closer.
      var pressed = up + left + right + down;
      pressed = 1 / pressed;
      if(this.canMoveLeft) this.x -= (left * pressed * this.speed);
      if(this.canMoveRight) this.x += (right * pressed * this.speed);
      if(this.canMoveDown) this.y += (down * pressed * this.speed);
      if(this.canMoveUp) this.y -= (up * pressed * this.speed);
      this.direction = direction;
      this.setAnimationFrame();
      this.checkOutOfBounds();
      //at some point have to turn off animation
  }
  /**
  * @memberof PlayerCharacter
  * bounce method bounces character off of collidables so it can move again 
  */
  bounce(up, left, right, down) {
    this.x -= (left * 2);
    this.x += (right * 2);
    this.y += (down * 2);
    this.y -= (up * 2);
  }


  /**
  * @memberof PlayerCharacter
  * method to change the location of the PC 
  * used when going through doors 
  * @param {int} destination x-coord on canvas
  * @param {int} destination y-coord on canvas 
  */
  changeLocation(destX, destY){
    this.x = destX;
    this.y = destY;
  }
  /**
  * @memberof PlayerCharacter
  * method to check if PC is still on canvas
  * forbids the player from going off the screen 
  */
  checkOutOfBounds(){
    // Forbid the player character to go off the screen.
    if (this.x < 0){
      this.x = 0
    }
    else if( this.x > window.canvas.width - this.width){
      this.x = window.canvas.width - this.width;
    }
    if (this.y < 0){
      this.y = 0
    }
    else if( this.y > window.canvas.height- this.height){
      this.y = window.canvas.height - this.height;
    }
  }

    /**
  * @memberof PlayerCharacter
  * uses the sprite sheet to animate. Every 15 frames the image changes 
  */
  setAnimationFrame() {
        //set yImage based on direction for most sprites
        this.cutY = this.direction;
        if(this.count % 15 == 0) { // Every 15 movement frames (frame group) cycle through sprites
          if (this.count == 0){ // Begin cycle at sprite 0
            this.cutX = 0;
          }
          else if (this.count == 15){ // Go to sprite 1
            this.cutX = 1;
          }
          else if (this.count == 30){ // go to sprite 2
            this.cutX = 2;
          }
          else if (this.count == 45){ // return to sprite 1
            this.cutX = 1;
            this.count = -15; // This will make it go back to sprite 0
          }
        }
        this.count++;

    }
/**
* @memberof PlayerCharacter
* listens for keys pressed, based on the arrow keys
* calls the move function to move the character based on keys pressed
*/
  pollForKeyboardInput() {

   	  if (KEYS[37]) // Go Left
      {
        this.move(0, 1, 0, 0, DIRECTIONS.LEFT)
      }
 	  else if (KEYS[39]) // Go Right 39
      {
        this.move(0, 0, 1, 0, DIRECTIONS.RIGHT)
      }
      else if (KEYS[38]) // Go Up
      {
        this.move(1, 0, 0, 0, DIRECTIONS.UP);
      }
      else if (KEYS[40]) // Go Down
      {
        this.move(0, 0, 0, 1, DIRECTIONS.DOWN);
      }
      if(KEYS[13]) // If enter is pressed
      {
		this.parser.parsereset(); //Clear text
	  }
    }
}

/**
* @enum
* contains the sprite sheet cut based on the direction
*/
var DIRECTIONS = {
  UP : 3,
  LEFT : 1,
  RIGHT : 2,
  DOWN : 0
}

/**
* @function startTimer
* sets up the timer and starts it
*/
function startTimer(length, display) {
  // Set up the parameters.
  var start = Date.now(), elapsed, min, sec;

  // This is the timer function
  function timer() {
    // Get the elapsed seconds.
    elapsed = length + (((Date.now() - start) / 1000) | 0);

    // Turn into ints.
    min = (elapsed / 60) | 0;
    sec = (elapsed % 60) | 0;

    // Make ready for display.
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    // display
    display.textContent = min + ":" + sec;

    // Start countdown at the very top.
    if (elapsed <= 0) {
      start = Date.now() + 1000;
    }
  };
  // Start timer.
  timer();
  setInterval(timer, 1000);
}

/**
* @function 
* deploys the timer to the canvas
*/
window.onload = function() {
  var display = document.querySelector('#time');
  startTimer(1, display);
}
