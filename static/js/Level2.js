/**
* This whole file sets Level2 in motion 
*/

/**
* new instances of the Screen Class for Level 2
* First we initialized all the screens with images, and messsages 
* @event Screen
*/
var Screen2_1 = new Screen(Level2,'../static/img/background.png','image',"Congratulations!<br>You've completed Level 1. Let's keep going");
var Screen2_2 = new Screen(Level2,'../static/img/background.png','image',"You've just created your first variable");
var Screen2_3 = new Screen(Level2,'../static/img/background.png','image');
var Screen2_4 = new Screen(Level2,'../static/img/background.png','image',"Remember: you move with the arrow keys");
var Screen2_5 = new Screen(Level2,'../static/img/background.png','image',"A spoonful of sugar");

/**
* new instances of the Door Class for level 2
* Initiatlize doors with screen object that door belongs to, x coord of canvas, y coord of canvas, destination screen, and effects array
* @event Door
*/

var Door2_1to2_2 = new Door(Screen2_1, 150, 10, 400, 0, Screen2_2,['location',500,550]);
//Intialize this door to be invisible
var Door2_1to2_4 = new Door(Screen2_1, 150, 10, 400, 0, Screen2_4,['location',500,550]);
Screen2_1.removeDrawable(Door2_1to2_4);
var Door2_2to2_3= new Door(Screen2_2, 150, 10, 400, 630, Screen2_3,['location',500,50]);
var Door2_3to2_4 = new Door(Screen2_3, 150, 10, 400, 0, Screen2_4,['location',500,550]);
var Door2_4to2_5 = new Door(Screen2_4, 150, 10, 400, 0, Screen2_5,['location',500,550]);
var Door2_5to2_5vr = new Door(Screen2_5, 10, 150, 950, 250, Screen2_5,['location',500,100]);
var Door2_5to2_5vl = new Door(Screen2_5, 10, 150, 0, 250, Screen2_5,['location',800,300]);

//Level transition door
var Door2_5to3_1 = new Door(Screen2_5, 150, 10, 400, 0, Screen3_1,['location',500,550]);

/**
* call waitforcommand method from Screen class
* @event Screen
*/
Screen2_1.waitforcommand("foo=\"bar\"", Door2_1to2_2);
Screen2_2.waitforcommand("speak \"bar\"", Door2_2to2_3);
commandParser.addVariable("MaryPoppins","\"supercalifragilisticexpialidocious\"")
Screen2_5.waitforcommand("speak \"supercalifragilisticexpialidocious\"",Door2_5to2_5vl)
/**
* create the walls for level2 screen 1
* @event Obstacle
*/
var Wall2_1_1 = new Obstacle(gameInstance, 450, 640, 550,0); //Right wall
var Wall2_1_2 = new Obstacle(gameInstance, 400, 640, 0, 0); //Left wall

/**
* create a messageArea or level 2 screen 1
* @event MessageArea
*/

var fooBox = new MessageArea(gameInstance, 48, 48, 455, 300, message="Here's a new command: Type in 'foo=\"bar\"'");
//Replace the door to 2_2 with a door to 2_4 
Screen2_2.removeoncommand("speak \"bar\"", Door2_1to2_2,Screen2_1);
Screen2_2.spawnoncommand("speak \"bar\"", Door2_1to2_4,Screen2_1);

Screen2_1.addDrawable([fooBox,Wall2_1_1,Wall2_1_2]);

/**
* create the walls for level2 screen 2
* @event Obstacle
*/
var Wall2_2_1 = new Obstacle(gameInstance, 960, 350, 0, 0); //Top wall
/**
* create a messageArea or level 2 screen 2
* @event MessageArea
*/
var varBox = new MessageArea(gameInstance, 48, 48, 150, 500, message="A variable is a symbolic name:<br> It represents some value");
var varBox1 = new MessageArea(gameInstance, 48, 48, 750, 500, message="Type in 'speak foo'");
/**
* create a new masterCool for level 2 screen 2 
* @event NonPlayerCharacter
*/
var masterCool2_2 = new NonPlayerCharacter(gameInstance, 450, 450,"Technically speaking aren't we all variables?");

Screen2_2.addDrawable([varBox,varBox1,masterCool2_2,Wall2_2_1]);

/**
* create the control boxes for level2 screen 3
* @event MessageArea
*/
var equalBox = new MessageArea(gameInstance, 48, 48, 455, 150, message="The '=' command will set an existing variable or create a new variable");
var equalBox1 = new MessageArea(gameInstance, 48, 48, 400, 250, message="The stuff to the left of the sign (the left operand) must be a valid variable name: variables must start with a letter and then only alphanumeric characters");
var equalBox2 = new MessageArea(gameInstance, 48, 48, 510, 250, message="The stuff to the right of the sign (the right operand) must be a valid value (we'll get to that) or another existing variable");

/**
* create the walls for level2 screen 3
* @event Obstacle
*/
var Wall2_3_1 = new Obstacle(gameInstance, 450, 640, 650,0); //Right wall
var Wall2_3_2 = new Obstacle(gameInstance, 300, 640, 0, 0); //Left wall
var Wall2_3_3 = new Obstacle(gameInstance, 960, 300, 0,400); //Bottom wall

Screen2_3.addDrawable([equalBox,equalBox1,equalBox2,Wall2_3_1,Wall2_3_2,Wall2_3_3]);

/**
* create the walls for level2 screen 4
* @event Obstacle
*/
var Wall2_4_1 = new Obstacle(gameInstance, 450, 640, 550,0); //Right wall
var Wall2_4_2 = new Obstacle(gameInstance, 400, 640, 0, 0); //Left wall
var key2_4 = new Key(gameInstance, 48, 48, 455, 250, Door2_4to2_5);
var stringBox = new MessageArea(gameInstance, 48, 48, 455, 450, message="There are two types of values: strings and numbers");
var string2Box = new MessageArea(gameInstance, 48, 48, 455, 100, message="Number is just that, a number<br>A string is a list of characters inside \"\"");

Screen2_4.addDrawable([key2_4,Wall2_4_1,Wall2_4_2,string2Box,stringBox]);

/**
* create the walls for level2 screen 4
* @event Obstacle
*/
var Wall2_5_1 = new Obstacle(gameInstance, 450, 250, 550,0); //TopRight wall
var Wall2_5_2 = new Obstacle(gameInstance, 400, 250, 0, 0); //TopLeft wall
var Wall2_5_3 = new Obstacle(gameInstance, 400, 250, 0,400); //BottomLeft wall
var Wall2_5_4 = new Obstacle(gameInstance, 450, 250, 550,400); //BottomRight wall
var Wall2_5_5 = new Obstacle(gameInstance, 950, 10, 0, 240);
var Wall2_5_6 = new Obstacle(gameInstance, 10, 640, 550, 0);
var key2_5_1 = new Key(gameInstance, 48, 48, 455, 100, Door2_5to3_1);
var key2_5_2 = new Key(gameInstance, 48, 48, 850, 300, Door2_5to2_5vr);
var poppinBox = new MessageArea(gameInstance, 48, 48, 455, 300, message="Here's a new variable for ya: 'MaryPoppins'");
var poppinBox2 = new MessageArea(gameInstance, 48, 48, 200, 300, message="Speak that famous word");

Screen2_5.addDrawable([Wall2_5_4,poppinBox,poppinBox2,Wall2_5_6,Wall2_5_5,Wall2_5_3,Wall2_5_1,Wall2_5_2,key2_5_1, key2_5_2])

/**
* start level2 at screen 1
* @event Level
*/
Level2.changeScreen(Screen2_1);
