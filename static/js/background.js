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
  constructor(level, color,type)  {
  this.type = type;
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
  constructor(screen, width, height, x, y, destination, color,effectsArray,locked=false) {
    super(screen.level.game, width, height, x, y, false); //set draw arguments from superclass
    this.context=screen.context; //adopt parent screen context
    this.screen=screen; //parent screen
    screen.addDrawable(this); //add itself to parent screen's drawable list
    this.destination=destination; //destination screen
    this.color=color; //fill color
    this.effect = effectsArray;
    this.locked=locked;
  }
  //display door as simple colored rectangle
  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
  //when touched by player character change screens
  onCollision(collidedWith) {
      var keyIndex = this.effect.indexOf('keyed');
      var locIndex = this.effect.indexOf('location');
      var doorOn = false;
      if (keyIndex > -1){
        // If a key is required check to see if they have a key matching the required key name
        var keyName = this.effect[keyIndex + 1];
        var inObj = OBJ.indexOf(keyName);
        if (inObj > -1){
          // If they have the key allow the door to opperate
          doorOn = true;
        }
      }
      // If a key is not required or they have found the key the door opperates as usual
    if (!this.locked && (keyIndex<= -1 || doorOn)){
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
