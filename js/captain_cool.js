//the game class, posesses the canvas and calls all of the draw functions
class Game {
  constructor(canvas)  {
    this.inputHandler = new InputHandler()
    this.drawables = [];
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d'); // Game will be 2d
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
  
  draw(){
	this.context.clearRect(0, 0, 960, 640);
    this.drawables.forEach(function(d) {
      d.draw()
    });
    this.detectCollisions();
    this.resolveGlobalKeys();
    // weird bullshit that allows requestAnimationFrame inside the class
    var self=this; 
    window.requestAnimationFrame(function() {self.draw()});
  }
  
  //call the initial global draw function and set some values
  start() {
    this.canvas.width = 960;
    this.canvas.height = 640;
    this.canvas.style.backgroundColor = 'white'
    this.draw();
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


//lets create our character from the sprite sheet
var character = new PlayerCharacter(gameInstance.context, 32, 32, 'img/better_sprite.png', 2, 0, 0)
var ma = new MessageArea(gameInstance.context, 20, 20, 500, 500, 'blue')

//whoever is added second gets their draw method called second and is therefore drawn on top
gameInstance.addDrawable(ma);
gameInstance.addDrawable(character);
//now that draw is defined we can start the game
gameInstance.start();
