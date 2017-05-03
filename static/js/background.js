/*
Welcome Friends!
Background.js contains all classes pertinant to the background
Those classes are Level, Screen, and Door
*/

//indiviual levels of the game
class Level {
  //to construct pass a Game object and id number
  constructor(game)  {
	this.game=game;
	this.collidables=[]; //List of collidable objects belonging to game instance
	this.currentScreen = null; //pointer to the current screen
    this.screens = []; //screens belonging to level
    this.canvas = game.canvas; //level adopts canvas from Game object
    this.context = game.context; //level adopts context from Game object
    this.drawables = []; //drawables that persist throughout the level
  }
  //add screen object to screen list
  addScreen(screen){
	  this.screens.push(screen);
  }
  //add drawable object to drawable list
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
    this.currentScreen.removeDrawable(d);
  }
  removeCollidable(c){
  	var index = this.collidables.indexOf(c) //Find collidable in list
  	if(index > -1){ // If its found
        this.collidables.splice(index,1) //Remove it from the list
      }
  }
  //change level's current screen
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
  //Show current screen's background and all its drawables
  displayScreen(){
	  if (this.currentScreen != null){
		  //draw background
		  this.currentScreen.draw();
		  //draw all level objects
		  this.drawables.forEach(function(d){d.draw();});
	  }
  }
  //Print all screen ids to the console
  logScreens(){
	  this.screens.forEach(function(screen) {
		  console.log("hello from");
		  console.log(screen.id);
	  });
  }
}

//individual background segments of level map
class Screen{
  //to construct pass level object, id number, and background color
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
  //Set specific command to open specific door
  waitforcommand(command,door){
	// Add command to screen
	this.commands.push({c:command, d:door, color:door.color});
	door.color=cmdlockedcolor;
  }
  // Remove a command from the command list
  removeCommand(d) {
    var index = this.commands.indexOf(d);
    if (index > -1){
      this.commands.splice(index,1);
    }
  }
  //add Drawable object to drawable list
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
  }
  removeCollidable(c){
  	var index = this.collidables.indexOf(c) //Find collidable in list
  	if(index > -1){ // If its found
        this.collidables.splice(index,1) //Remove it from the list
      }
  }
  //display background
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

//collidable objects that transport you from screen to screen on touch
class Door extends Collidable {
  //to construct, give it a parent screen, draw arguments, destintion screen,
  //color and an array describing the effect the door should have.

  //The effectsArray parameter is an array of properties that the door should have.
  //The property name should be followed by the specifications for that property.
  //For example ['location', x-coordinat,y-coordinate]
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
  //display door as simple colored rectangle
  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
  //when touched by player character change screens
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
