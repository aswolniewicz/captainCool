class Level {
  constructor(game, id)  {
	this.id= id;
	this.currentScreen = null;
    this.screens = [];
    this.canvas = game.canvas;
    this.context = game.context;
    this.drawables = [];
  }
  addScreen(screen){
	  this.screens.push(screen);
  }
  addDrawable(d) {
    this.drawables.push(d);
  }
  changeScreen(screen){
	  this.currentScreen=screen;
  }
  displayScreen(){
	  if (this.currentScreen != null){
		  this.currentScreen.draw();
		  this.drawables.forEach(function(d){d.draw();});
	  }
  }
  logScreens(){
	  this.screens.forEach(function(screen) {
		  console.log("hello from"); 
		  console.log(screen.id);
	  });
  }
}

class Screen{
  constructor(level, id, color)  {
	this.level = level;
	this.id = id;
	this.color = color;
	this.context=level.context;
	this.doors = [];
	this.drawables=[];
	level.addScreen(this);
  }
  addDoor(door){
	  this.doors.push(door);
  }
  addDrawable(d) {
    this.drawables.push(d);
  }
  draw(){
    this.level.canvas.style.backgroundColor = this.color;
    this.drawables.forEach(function(d){d.draw();});
    this.doors.forEach(function(door) {
		door.collided=false;door.draw();
	}); 
  }
}

class Door extends Collidable {
  constructor(screen, width, height, x, y, destination,color) {
    super(null, width, height, x, y, false);
    this.context=screen.context;
    this.screen=screen;
    this.destination=destination;
    this.color=color;
    this.collided=false;
    screen.addDoor(this);
  }
  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  onCollision() {
	if(!this.collided){
      this.screen.level.changeScreen(this.destination);
      this.collided=true;
    }
  }

  
}
