//Intialize Screens
var Screen1_1 = new Screen(Level1,'../static/img/background.png','image',"Talk to the old man");
var Screen1_2 = new Screen(Level1,'../static/img/background.png','image',"These question marks explain the controls");
var Screen1_3 = new Screen(Level1,'../static/img/background.png','image',"Now for the actual controls");
var Screen1_4 = new Screen(Level1,'../static/img/background.png','image');
var Screen1_5 = new Screen(Level1,'../static/img/background.png','image',"Speak no evil");

//Intialize Doors

//Doors have new optional parameter locked, which can only be change through a command or key
var Door1_1to1_2 = new Door(Screen1_1, 10, 150, 950, 250,Screen1_2,['location',15,300]); //right wall door
var Door1_2to1_3 = new Door(Screen1_2, 10, 150, 950, 250,Screen1_3,['location',15,300]);
var Door1_3to1_4 = new Door(Screen1_3, 10, 150, 950, 250,Screen1_4, ['location',425,550]);
var Door1_4to1_3 = new Door(Screen1_4, 10, 150, 400, 500,Screen1_3, ['location',860,300]);
var Door1_4to1_5 = new Door(Screen1_4, 150, 10, 400, 0, Screen1_5, ['location',25,550]); //top wall door
var Door1_5to1_4 = new Door(Screen1_5, 150, 10, 0, 630, Screen1_4, ['location',450,15]);
//Level transition door
var Door1_5to2_1 = new Door(Screen1_5, 150, 10, 400, 0, Screen2_1,['location',500,600]);

// Commands
// Function ties command " speak 'hello' " to opening Door on Screen 1_5
Screen1_5.waitforcommand("speak \"hello\"",Door1_5to2_1);

// Objects in Screen 1
var masterCool1_1 = new NonPlayerCharacter(gameInstance,400,50,"Hey kid, pick up that key");
var key1_1 = new Key(gameInstance, 48, 48, 50, 550, Door1_1to1_2, message="Good! Now go through the door on the right");

Screen1_1.addDrawable([key1_1,masterCool1_1]);

// Objects in Screen 2
var Wall1_2_1 = new Obstacle(gameInstance, 960, 250, 0,400); //Bottom wall
var Wall1_2_2 = new Obstacle(gameInstance, 960, 250, 0, 0); //Top wall
var ctrl = new MessageArea(gameInstance, 48, 48, 150, 300, message="FYI, you move with the arrow keys");
var ctrl1 = new MessageArea(gameInstance, 48, 48, 350, 300, message="Just so we're clear, you move with the arrow keys");
var ctrl2 = new MessageArea(gameInstance, 48, 48, 550, 300, message="To avoid any confusion, you move with the arrow keys");
var ctrl3 = new MessageArea(gameInstance, 48, 48, 750, 300, message="Did you know that you move with the arrow keys?");

Screen1_2.addDrawable([ctrl, ctrl1, ctrl2, ctrl3, Wall1_2_2,Wall1_2_1]);

// Objects in Screen 2
var ctrl4 = new MessageArea(gameInstance, 48, 48, 150, 300, message="Click on the text box below to type in a command");
var ctrl5 = new MessageArea(gameInstance, 48, 48, 350, 300, message="Click on the submit command button to run that command");
var ctrl6 = new MessageArea(gameInstance, 48, 48, 550, 300, message="Not everything you'll type will run but you'll learn as you go");
var ctrl7 = new MessageArea(gameInstance, 48, 48, 750, 300, message="Press the enter key to dismiss any message <br> Press the left control key to mute");

Screen1_3.addDrawable([ctrl4,ctrl5,ctrl6,ctrl7,Wall1_2_2, Wall1_2_1]);

// Objects in Screen 4
var Wall1_3_1 = new Obstacle(gameInstance, 450, 640, 550,0); //Right wall
var Wall1_3_2 = new Obstacle(gameInstance, 400, 640, 0, 0); //Left wall

Screen1_4.addDrawable([Wall1_3_2, Wall1_3_1]);

// Objects in Screen 5
var masterCool1_5 = new NonPlayerCharacter(gameInstance,450,300,"The door is shy, go introduce yourself");
var speakBox = new MessageArea(gameInstance, 48, 48, 150, 300, message= "Type in 'speak' then what you want to say in double quotes");
var speakBox1 = new MessageArea(gameInstance, 48, 48, 750, 300, message="Try speaking \"hello\"");

Screen1_5.addDrawable([masterCool1_5,speakBox,speakBox1]);

// Start screen
Level1.changeScreen(Screen1_1);
