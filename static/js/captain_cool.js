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
    //Session variables
    this.variables={};
    //Key words
    this.keywords=["speak"];
  }
  //Print out a message to textBox
  parsemsg(message){
    this.outField.innerHTML=message;
  }
  //Print out an error message to textBox
  parsefail(error){
    //Print 'Parsing failed' then a newline of '='
    this.parsemsg(error);
  }
  //Flush textBox, i.e., make it completely blank
  parsereset(){
    this.parsemsg("");
  }
  findVariable(name){
	if(!this.variables){
	  return -1;
	}
	var nameList=Object.keys(this.variables);
    for(var i=0; i<nameList.length; i++){
	  if(nameList[i]==name){
	    return i;
	  }
	}
	return -1;
  }
  addVariable(name,value){
	if(Object.keys(this.variables).length<=100){
	  this.variables[name]=value;
	}
  }
  setVariable(name,value){
	if(this.findVariable(name) > -1){
	  this.variables[name]=value;
	}
	else{
	  this.addVariable(name,value);
	}
	return this.findVariable(name);
  }
  useVariable(name){
    if(this.findVariable(name) > -1){
	  return this.variables[name];
	}
  }
  removeVariable(name){
	if(this.findVariable(name) > -1){
	  delete this.variables[name];
	}
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
      //Put spaces around equals sign
      commands[i]=commands[i].split("=").join(" = ");
      //Store each word of the command into another array
      var words=commands[i].split(" ");
      //Check for and evaulate variables
      var dex=-1;
      //Get list of existing variables
      var varList=Object.keys(this.variables);
      //Variable to track if it appears behind an equal sign
      var wdex=-1;
      //For each word check if it matchs an exisiting variable
      for(var j=0; j<words.length;j++){
		  //Find the variable 
		  dex=this.findVariable(words[j]);
		  //If the variable is found
		  if(dex > -1){
			//Find its position
			wdex=commands[i].indexOf(words[j],wdex+1);
			//If its on the right of the equal sign
			if(wdex > commands[i].indexOf("=")){
			  //Evaluate it
		      words[j]=this.variables[varList[dex]];
		    }
		  }
	  }
	  //Set command equal to the evaulated input
	  commands[i]=words.join(" ");
	  console.log(commands[i]);
	  //If there's an equal sign attempt to set variable
      if(commands[i].indexOf("=") > -1){
		//Look at input on either side of the equal sign
	    var equalSplit=commands[i].split("=");
	    //If more than 1 equal sign or a missing operator call usage failure
	    if(equalSplit.length != 2 || equalSplit[0]=='' || equalSplit[1]==''){
		  this.parsefail("Usage error, should be ' [variable1] = [variable2] '");
		  return;
		}
		// Name of variable is left of the equal sign
		var varName=equalSplit[0].trim();
		// Value of the variable is right of the equal sign
		var varValue=equalSplit[1].trim();
		if(!RegExp(/^[a-z][a-z0-9]*$/i).test(varName)){
		  this.parsefail("Bad variable, must start with a letter and be alphanumeric");
		  return;
		}
		if(!RegExp(/^"[^"]*"$/i).test(varValue) && !RegExp(/^[0-9]*$/i).test(varName)){
		  this.parsefail("Bad value, must be a number or string");
		  return;
		}
		if(this.keywords.indexOf(varName) < 0){
		  if(this.setVariable(varName,varValue) < 0){
		    this.parsefail("Setting variable failed");
		    return;
		  }
		  this.parsemsg(varName+" is now equal to "+varValue);
		}
		else{
		  this.parsefail("Cannot use command as variable");
		  return;
		}
      }
      //If the first word is speak, run speak command
      else if(words[0].toLowerCase()=="speak"){
        //Get indices of the string to be spoken
        dex = commands[i].indexOf(words[0]);
        var startq=commands[i].indexOf("\"", dex+1);
        var endq=commands[i].indexOf("\"", startq+1);
        //If spoken string cannot be found print error
        if(startq==-1||endq==-1){
          this.parsefail("Put what you want to say in \"\"");
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
        this.parsefail("Ya gotta type something");
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
