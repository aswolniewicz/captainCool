//allows us to actually catch errors that would otherwise fail silently
'use strict';

//global array for all pressed keys
var KEYS = [];
//Array storing objects picked up by the character
var OBJ = [];


var charX = 0;
var charY = 0;

//Change the 'Submit Text' button's click function to parseInput()
document.getElementById("myButton").onclick=parseInput;

//Take input from text field and parse it
function parseInput(){
	//Print out a message to textBox
	function parsemsg(message){
		document.getElementById("textBox").innerHTML=message;
	}
	//Print out an error message to textBox
	function parsefail(error){
		//Print 'Parsing failed' then a newline of '='
		parsemsg("Parsing failed<br>"+"=".repeat(20)+"<br>"+error);
	}
	//Flush textBox, i.e., make it completely blank
	function parsereset(){
		parsemsg("")
	}
	//Get and store textField element
	var textField = document.getElementById("in-initials");
	//Save whatever text is in textfield as input
	var inText=textField.value;
	textField.value="";
	//If input is too large then fail on error
	if(inText.length>50){
		parsefail("Input too big bro");
		return;
	}
	//Separate input by semicolons into an array
	var commands = inText.split(";");
	//For each command (text up until semicolon), parse it
	for (var i = 0; i < commands.length; i++) {
		//Removing leading and trailing whitespace
		commands[i]=commands[i].trim();
		//Store each word of the command into another array
		var words=commands[i].split(" ");
		//If the first word is speak, run speak command
		if(words[0]=="speak"){
			//Get indices of the string to be spoken
			var dex = commands[i].indexOf(words[0]);
			var startq=commands[i].indexOf("\"", dex+1);
			var endq=commands[i].indexOf("\"", startq+1);
			//If spoken string cannot be found print error
			if(startq==-1||endq==-1){
				parsefail("Bad string");
				return;
			}
			//Spoken string is found
			else{
				//Speak the spoken string
				var quote = commands[i].substring(startq+1,endq);
				character.speak(quote,100);
				//Flush the output text
				parsereset();
			}
		}
		//If command string is empty then print error
		else if(!commands[i]){
			parsefail("Empty baby")
		}
		//if command is not parsed then print error
		else{
			parsefail("No such command:<br>" + commands[i]);
			return;
		}
	}
}

//the game class, posesses the canvas and calls all of the draw functions
class Game {
  constructor(canvas,input,resolver)  {
    this.canvas = canvas;
    this.input=input;
    this.resolver=resolver;

	this.levels = [];
	this.currentLevel = null;
    this.drawables = [];
    this.collidables=[]; //List of collidable objects belonging to game instance
    this.context = this.canvas.getContext("2d");
  }

  //anything that's drawable we need to add to this list so that
  //we call its draw method on draw
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
    this.currentLevel.removeDrawable(d);
  }
  removeCollidable(c){
  	var index = this.collidables.indexOf(c) //Find collidable in list
  	if(index > -1){ // If its found
        this.collidables.splice(index,1) //Remove it from the list
      }
  }
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentLevel.displayScreen();
    var self = this;
    this.drawables.forEach(function(d) {
      d.draw();
    });
    //Append the current game's, level's, and screen's collidable list
    //To the collision resolver collidable list
    this.resolver.collidables=this.collidables.concat(this.currentLevel.collidables).concat(this.currentLevel.currentScreen.collidables);
    this.resolver.detectCollisions();
    this.input.pollForKeyboardInput();
    //updateLogs();
    window.requestAnimationFrame(function(){self.draw();});
  }
  //call the initial global draw function and set some values
  start() {
    this.canvas.width = 960;
    this.canvas.height = 640;
    this.canvas.style.backgroundColor = 'white';
    // Game will be 2d
    this.draw();
  }

}

//get the canvas from the html
var canvas = document.getElementById('canvas');
var collisionResolver = new CollisionResolver();
var inputHandler = new InputHandler();
var gameInstance = new Game(canvas,inputHandler,collisionResolver);

//lets create our character from the sprite sheet
// Changed speed to 5 from 3 to speed up testing.
var character = new PlayerCharacter (gameInstance, 44, 60, '../static/img/captain_cool.png', 5, 150, 0, true);
inputHandler.addPoller(character);
gameInstance.addDrawable(character);


var Level1 = new Level(gameInstance);
var Level2 = new Level(gameInstance);
var Level3 = new Level(gameInstance);
var Level4 = new Level(gameInstance);
var Level5 = new Level(gameInstance);
var Level6 = new Level(gameInstance);
var Level7 = new Level(gameInstance);
var Level8 = new Level(gameInstance);

gameInstance.currentLevel=Level1;
