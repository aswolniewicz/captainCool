//allows us to actually catch errors that would otherwise fail silently
'use strict';

//global array for all pressed keys
var KEYS = [];
//Array storing objects picked up by the character
var OBJ = [];

var keylockedcolor='red';
var cmdlockedcolor='orange';
var unlockedcolor='green';
var keymessage="You found a key! Press enter to dismiss.";

var charX = 0;
var charY = 0;

class Parser {
  constructor(buttonid,inFieldId,outFieldId){
    //Change the 'Submit Text' button's click function to parseInput()
    this.button=document.getElementById(buttonid);
    var self=this;
    this.button.onclick= function (){self.parse();};
    //Get and store textField and textBox element for input/output
    this.inField = document.getElementById(inFieldId);
    this.outField = document.getElementById(outFieldId);
    //Array of commands to look for during parsing
    this.checks=[];
  }
  //Print out a message to textBox
  parsemsg(message){
    this.outField.innerHTML=message;
  }
  //Print out an error message to textBox
  parsefail(error){
    //Print 'Parsing failed' then a newline of '='
    this.parsemsg("Parsing failed<br>"+"=".repeat(20)+"<br>"+error);
  }
  //Flush textBox, i.e., make it completely blank
  parsereset(){
    this.parsemsg("");
  }
  
  //Check if a command matches one of the waiting command
  matchcommand(command){
	//Loop through array of all commands we're checking for
	for (var i = 0; i < this.checks.length; i++) {
      //If the door is valid
      if(this.checks[i].d){
		// Remove all spaces so its whitespace independent
	    var strip1=command.split(' ').join('');
	    var strip2=this.checks[i].c.split(' ').join('');
	    if(strip1==strip2){ //If the passed command matchs a stored command
		  //Unlock the corresponding door
		  this.checks[i].d.locked=false;
		  this.checks[i].d.color=this.checks[i].color
		  //Remove command/door pair from screen list
		  this.checks[i].d.screen.removeCommand(this.checks[i]);
		  //Remove command/door pair from the check list
		  this.checks.splice(i,1);
		  //Stop loop
		  return;
	    }
	  }  
    }
  }
  parse(){
    //Save whatever text is in textfield as input
    var inText=this.inField.value;
    this.inField.value="";
    //If input is too large then fail on error
    if(inText.length>50){
      this.parsefail("Input too big bro");
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
          this.parsefail("Bad string");
          return;
        }
        //Spoken string is found
        else{
          //Speak the spoken string
          var quote = commands[i].substring(startq+1,endq);
          character.speak(quote,100);
          //Flush the output text
          this.parsereset();
        }
      }
      //If command string is empty then print error
      else if(!commands[i]){
        this.parsefail("Empty baby");
        return;
      }
      //if command is not parsed then print error
      else{
        this.parsefail("No such command:<br>" + commands[i]);
        return;
      }
      //After parsing command check if it matches one of commands in checklist
      this.matchcommand(commands[i]);
    }
  }
}
//the game class, posesses the canvas and calls all of the draw functions
class Game {
  constructor(canvas,input,resolver,parser)  {
    this.canvas = canvas;
    this.input=input;
    this.resolver=resolver;
	this.parser=parser;
	this.levels = [];
	this.currentLevel = null;
    this.drawables = [];
    this.collidables=[]; //List of collidable objects belonging to game instance
    this.context = this.canvas.getContext("2d");
  }

  //anything that's drawable we need to add to this list so that
  //we call its draw method on draw
  addDrawable(d) {
    var dList = [].concat(d);
	for (var i = 0; i < dList.length; i++) {
      this.drawables.push(dList[i]);
      if(dList[i].collides){ //When adding drawables check also if they're collidable
	    this.collidables.push(dList[i]);
	  }
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
var commandParser= new Parser("myButton","myText","textBox");
var collisionResolver = new CollisionResolver();
var inputHandler = new InputHandler();
var gameInstance = new Game(canvas,inputHandler,collisionResolver,commandParser);

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
