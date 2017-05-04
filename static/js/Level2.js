//Intialize Screens
var Screen2_1 = new Screen(Level2,'../static/img/background.png','image',"Congratulations!<br>You've completed Level 1. Let's keep going");
var Screen2_2 = new Screen(Level2,'../static/img/background.png','image',"Let's try variables now");

//Intialize Doors

//Doors have new optional parameter locked, which can only be change through a command or key

//Level transition door
var Door2_1to2_1 = new Door(Screen2_1, 150, 10, 400, 0, Screen2_1,['location',500,300],locked=true);
var Door2_1to2_1v1 = new Door(Screen2_1, 10, 150, 950, 250, Screen2_1,['location',500,300],locked=true);
var Door2_1to2_1v2 = new Door(Screen2_1, 10, 150, 0, 250, Screen2_1,['location',500,300],locked=true);
// Commands
Screen2_1.waitforcommand("speak \"foo\"", Door2_1to2_1);
Screen2_1.waitforcommand("speak \"bar\"", Door2_1to2_1v1);
Screen2_1.waitforcommand("speak \"foobar\"", Door2_1to2_1v2);
commandParser.addVariable("foo","\"bar\"");
// Objects in Screen 1
//var masterCool = new NonPlayerCharacter(gameInstance, 53, 64, '../static/img/master_cool.png', 2, 400, 50, true,"Hey kid, pick up that key");

//Screen1_1.addDrawable([]);



// Start screen
Level2.changeScreen(Screen2_1);
