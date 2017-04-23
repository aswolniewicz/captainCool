/*
Welcome Friends!
Background.js contains all classes pertinant to the background
Those classes are Level, Screen, and Door
*/

//indiviual levels of the game
class Level {
  //to construct pass a Game object and id number
  constructor(game, id)  {
	this.game=game
	this.id = id; //number to track level
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
  }
  //change level's current screen
  changeScreen(screen){
	  //make previous screen drawables unsolid
	  this.currentScreen.drawables.forEach(function(d){d.solid=false;});
	  //set new screen
	  this.currentScreen=screen;
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
  constructor(level, id, color,type)  {
  this.type = type;
	this.level = level; //parent level
	level.addScreen(this); //add itself to parent level's screen list
	this.id = id; //number to track screen
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
  //add Door object to door list
  addDoor(door){
	  this.doors.push(door);
  }
  //add Drawable object to drawable list
  addDrawable(d) {
    this.drawables.push(d);
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
    this.drawables.forEach(function(d){d.solid=true;d.draw();});
    //draw all doors belonging to this background
    this.doors.forEach(function(door) {
	  door.draw();
	});
  }
}

//collidable objects that transport you from screen to screen on touch
class Door extends Collidable {
  //to construct, give it a parent screen, draw arguments, destintion screen,
  //color and an array describing the effect the door should have.
  // Note that if the door should change the players location then 'location'
  //be the first element of the array, the next element should be the x value of
  //the destination and the third element should be the y value.
  constructor(screen, width, height, x, y, destination, color,effectsArray) {
    super(screen.level.game, width, height, x, y, false); //set draw arguments from superclass
    this.context=screen.context; //adopt parent screen context
    this.screen=screen; //parent screen
    screen.addDoor(this); //add itself to parent screen's door list
    this.destination=destination; //destination screen
    this.color=color; //fill color
    this.effect = effectsArray;
  }
  //display door as simple colored rectangle
  display() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
  //when touched by player character change screens
  onCollision() {
	  //get parent screen's parent level to change screens
      this.screen.level.changeScreen(this.destination);
      if (this.effect[0]=='location'){
        var sendToX = this.effect[1];
        var sendToY = this.effect[2];
        character.changeLocation(sendToX, sendToY);
      }
  }
}
