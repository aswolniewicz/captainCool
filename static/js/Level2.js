//Intialize Screens
var Screen2_1 = new Screen(Level2,'../static/img/background.png','image',"Congratulations!<br>You've completed Level 1. Let's keep going");
var Screen2_2 = new Screen(Level2,'../static/img/background.png','image',"You've just created your first variable");
var Screen2_3 = new Screen(Level2,'../static/img/background.png','image');
var Screen2_4 = new Screen(Level2,'../static/img/background.png','image',"Remember: you move with the arrow keys");
var Screen2_5 = new Screen(Level2,'../static/img/background.png','image',"A spoonful of sugar");

//Intialize Doors

var Door2_1to2_2 = new Door(Screen2_1, 150, 10, 400, 0, Screen2_2,['location',500,550]);
//Intialize this door to be invisible
var Door2_1to2_4 = new Door(Screen2_1, 150, 10, 400, 0, Screen2_4,['location',500,550]);
Screen2_1.removeDrawable(Door2_1to2_4);
var Door2_2to2_3= new Door(Screen2_2, 150, 10, 400, 630, Screen2_3,['location',500,50]);
var Door2_3to2_4 = new Door(Screen2_3, 150, 10, 400, 0, Screen2_4,['location',500,550]);
var Door2_4to2_5 = new Door(Screen2_4, 150, 10, 400, 0, Screen2_5,['location',500,550]);
//Level transition door

// Commands
Screen2_1.waitforcommand("foo=\"bar\"", Door2_1to2_2);
Screen2_2.waitforcommand("speak foo", Door2_2to2_3);

// Objects in Screen 1
var Wall2_1_1 = new Obstacle(gameInstance, 450, 640, 550,0); //Right wall
var Wall2_1_2 = new Obstacle(gameInstance, 400, 640, 0, 0); //Left wall
var fooBox = new MessageArea(gameInstance, 48, 48, 455, 300, message="Here's a new command: Type in 'foo=\"bar\"'");
//Replace the door to 2_2 with a door to 2_4 
Screen2_2.removeoncommand("speak foo", Door2_1to2_2,Screen2_1);
Screen2_2.spawnoncommand("speak foo", Door2_1to2_4,Screen2_1);

Screen2_1.addDrawable([fooBox,Wall2_1_1,Wall2_1_2]);

//Objects in Screen 2
var Wall2_2_1 = new Obstacle(gameInstance, 960, 350, 0, 0); //Top wall
var varBox = new MessageArea(gameInstance, 48, 48, 150, 500, message="A variable is a symbolic name:<br> It represents some value");
var varBox1 = new MessageArea(gameInstance, 48, 48, 750, 500, message="Type in 'speak foo'");
var masterCool2_2 = new NonPlayerCharacter(gameInstance, 450, 450,"Technically speaking aren't we all variables?");

Screen2_2.addDrawable([varBox,varBox1,masterCool2_2,Wall2_2_1]);

//Objects in Screen 3
var equalBox = new MessageArea(gameInstance, 48, 48, 455, 150, message="The '=' command will set an existing variable or create a new variable");
var equalBox1 = new MessageArea(gameInstance, 48, 48, 400, 250, message="The stuff to the left of the sign (the left operator) must be a valid variable name: variables must start with a letter and then only alphanumeric characters");
var equalBox2 = new MessageArea(gameInstance, 48, 48, 510, 250, message="The stuff to the right of the sign (the right operator) must be a valid value (we'll get to that) or another existing variable");
var Wall2_3_1 = new Obstacle(gameInstance, 450, 640, 650,0); //Right wall
var Wall2_3_2 = new Obstacle(gameInstance, 300, 640, 0, 0); //Left wall
var Wall2_3_3 = new Obstacle(gameInstance, 960, 300, 0,400); //Bottom wall

Screen2_3.addDrawable([equalBox,equalBox1,equalBox2,Wall2_3_1,Wall2_3_2,Wall2_3_3]);

//Objects in Screen 4
var Wall2_4_1 = new Obstacle(gameInstance, 450, 640, 550,0); //Right wall
var Wall2_4_2 = new Obstacle(gameInstance, 400, 640, 0, 0); //Left wall
var key2_4 = new Key(gameInstance, 48, 48, 455, 250, Door2_4to2_5);

Screen2_4.addDrawable([key2_4,Wall2_4_1,Wall2_4_2]);
// Start screen
Level2.changeScreen(Screen2_1);
