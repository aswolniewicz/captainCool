/*
Welcome Friends!
Background.js contains all classes pertinant to the background
Those classes are Level, Screen, and Door
*/

/**
* This class creates level 
* @class Level */
class Level {
  //to construct pass a Game object and id number
  /** 
  * To create a level you need to pass a Game object and ID number
  * @constuctor */
  constructor(game)  {
	this.game=game;
	this.collidables=[]; //List of collidable objects belonging to game instance
	this.currentScreen = null; //pointer to the current screen
    this.screens = []; //screens belonging to level
    this.canvas = game.canvas; //level adopts canvas from Game object
    this.context = game.context; //level adopts context from Game object
    this.drawables = []; //drawables that persist throughout the level
  }
  /** 
  * Add a screen object to level screen list
  * @memberof Level 
  */
  addScreen(screen){
	  this.screens.push(screen);
  }
  /** 
  * Adds drawable object to the drawables list
  * @memberof Level
  * @param object to be added to list */
  addDrawable(d) {
    var dList = [].concat(d);
	for (var i = 0; i < dList.length; i++) {
      this.drawables.push(dList[i]);
      if(dList[i].collides){ //When adding drawables check also if they're collidable
	    this.collidables.push(dList[i]);
	  }
    }
  }
  /** 
  * remove a drawable from this list, remove from screen, remove from collidable list
  * @memberof Level
  * @param {Object} object to remove
  */
  removeDrawable(d) {
    var index = this.drawables.indexOf(d);
    if (index > -1){
      this.drawables.splice(index,1);
    }
    this.removeCollidable(d);
    this.currentScreen.removeDrawable(d);
  }
  /**  
  * remove an object from Collidable list, helper function to removeDrawable
  * @memberof Level
  * @param {Object} object to be removed 
  */
  removeCollidable(c){
  	var index = this.collidables.indexOf(c) //Find collidable in list
  	if(index > -1){ // If its found
        this.collidables.splice(index,1) //Remove it from the list
      }
  }
  /**
  * change the level's screen. 
  * resets command parser, collidable list, and prints screen message
  * @memberof Level
  * @param {Object} screen that we are changing to 
  */
  changeScreen(screen){
	  //set new screen
	  this.game.resolver.stop=true; // Stop current collision detection
	  this.game.resolver.collidables=[]; //Reset resolver collidable list
	  this.currentScreen=screen;
	  this.game.currentLevel=screen.level;
	  // Reset list of commands for parser to check
	  this.game.parser.checks=[];
	  // Add this screen's list of commands to check
	  for (var i = 0; i < screen.commands.length; i++) {
		  this.game.parser.checks.push(screen.commands[i]);
	  }
	  // Print screen message
	  this.game.parser.parsemsg(screen.message);
  }
  /** 
  * displays screen and all its drawable 
  * @memberof Level
  */
  displayScreen(){
	  if (this.currentScreen != null){
		  //draw background
		  this.currentScreen.draw();
		  //draw all level objects
		  this.drawables.forEach(function(d){d.draw();});
	  }
  }
  /** 
  * Debug helper method, print all screed ids to the console
  * @memberof Level
  */
  logScreens(){
	  this.screens.forEach(function(screen) {
		  console.log("hello from");
		  console.log(screen.id);
	  });
  }
}

/** 
* Creates a new screen 
* @class Screen
*/
class Screen{
  //to construct pass level object, id number, and background color
  /**
  * @constructor 
  * @param {Object} level object
  * @param file path to background image of screen
  * @param denote image
  * @param {string} message to display to screen  
  */
  constructor(level, color, type, message="")  {
	this.commands=[]; //List of commands to check for
    this.type = type;
    this.message = message; //Message shown on screen entry
	this.collidables=[]; //List of collidable objects belonging to game instance
	this.level = level; //parent level
	level.addScreen(this); //add itself to parent level's screen list
  //checks to see if the background is an image or a colo
  if (this.type == 'image'){
    document.getElementById("Background1");
    this.image = new Image();
    this.image.src = color;
  }
  else{
	   this.color = color; //background color
  }
	this.context=level.context; //adopt parent level's context
	this.doors = []; //doors belonging to screen
	this.drawables=[]; //drawables that persist throughout screen
  }
  /**
  * This function sets the command needed in order to open a door in game
  * @memberof Screen
  * @param {string} command 
  * @param {Object} door object 
  */
  waitforcommand(command,door){
	// Add command to screen
	this.commands.push({c:command, d:door, color:door.color, s:door.screen, type: "door"});
	door.locked=true;
	door.color=cmdlockedcolor;
  }
  /**
  * This function sets the command needed in order to spawn an object in game
  * @memberof Screen
  * @param {string} command 
  * @param {Object} drawable object
  * @param {Object} screen object
  */
  spawnoncommand(command,drawable,screen){
	this.commands.push({c:command, d:drawable, s:screen, type:"spawn"})
  }
  /**
  * This function sets the command needed in order to remove an object in game
  * @memberof Screen
  * @param {string} command 
  * @param {Object} drawable object 
  * @param {Object} screen object
  */
  removeoncommand(command,drawable,screen){
	this.commands.push({c:command, d:drawable, s:screen, type:"remove"});
  }
  /**
  * remove a command from the command list
  * @memberof Screen
  * @param {Object} door object command pairing
  */
  removeCommand(d) {
    var index = this.commands.indexOf(d);
    if (index > -1){
      this.commands.splice(index,1);
    }
  }
  //add Drawable object to drawable list
  /**
  * add an object to the drawable list 
  * @memberof Screen
  * @param {Object} object to draw to canvas 
  */
  addDrawable(d) {
    var dList = [].concat(d);
	for (var i = 0; i < dList.length; i++) {
      this.drawables.push(dList[i]);
      if(dList[i].collides){ //When adding drawables check also if they're collidable
	    this.collidables.push(dList[i]);
	  }
    }
  }
  /**
  * remove an object from the drawable list and remove from collidable list
  * @memberof Screen 
  * @param {Object} the object to be removed  
  */
  removeDrawable(d) {
    var index = this.drawables.indexOf(d);
    if (index > -1){
      this.drawables.splice(index,1);
    }
    this.removeCollidable(d);
  }
   /**
  * remove an object from the collidable list, helper function
  * @memberof Screen
  * @param {Object} the object to be removed  
  */
  removeCollidable(c){
  	var index = this.collidables.indexOf(c) //Find collidable in list
  	if(index > -1){ // If its found
        this.collidables.splice(index,1) //Remove it from the list
      }
  }
 /**
 * draws everything in the drawables list and the background 
 * @memberof Screen
 */
  draw(){
    //draws the background
    if(this.type == 'image'){
      var ctx = this.context;
      ctx.drawImage(this.image,0,0,960,640);
    }
    else{
      this.level.canvas.style.backgroundColor = this.color;
    }
    //draw all bawckground objects and make them solid
    this.drawables.forEach(function(d){d.draw();});
  }
}

/**
* This class is for Doors that transport you from screen to screen on touch
* @class Door 
* @classdesc The door class extends the collidable class. It inherits all the methods in Collidable and adds some of its own methods
*/
class Door extends Collidable {
  //to construct, give it a parent screen, draw arguments, destintion screen,
  //color and an array describing the effect the door should have.

  /**
  * The constuctor for the Door Class
  * @constructor 
  * @param {Object} screen
  * @param {int} width of door
  * @param {int} height of door 
  * @param {int} x position on the canvas 
  * @param {int} y position on the canvas
  * @param {Object} the destination screen 
  * @param effectsArray is an array of properties that the door should have. The property name should be followed by the specifications for that property. For example ['location', x-coord, y-coord]
  * @param boolean if door is locked 
  * @param {string} color that corresponds to whether the door is locked or not, green if unlocked
  */
  constructor(screen, width, height, x, y, destination, effectsArray, locked=false, color=unlockedcolor) {
    super(screen.level.game, width, height, x, y, false); //set draw arguments from superclass
    this.context=screen.context; //adopt parent screen context
    this.screen=screen; //parent screen
    screen.addDrawable(this); //add itself to parent screen's drawable list
    this.destination=destination; //destination screen
    this.color=color; //fill color; optional parameter default to global color variable
    this.effect = effectsArray;
    this.locked=locked; //Bool to track whether or not it's a command door, default locked  
  }
  /**
  * This function just renders the door on the canvas
  * @memberof Door
  */
  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
  /**
  * This function changes the screen when a door is collided with
  * @memberof Door
  * @param {Object} the object that collided with the door 
  */
  onCollision(collidedWith) {
    var locIndex = this.effect.indexOf('location');
    // If a key is not required or they have found the key the door opperates as usual
    if (!this.locked){
  		if(collidedWith.constructor.name == 'PlayerCharacter'){
          //get parent screen's parent level to change screens
            this.screen.level.changeScreen(this.destination);
            if (locIndex > -1){
              var sendToX = this.effect[locIndex+1];
              var sendToY = this.effect[locIndex+2];
              character.changeLocation(sendToX, sendToY);
            }
  	    }
      }
  }
}
