
/**
* new instances of the Screen Class for Level 3
* First we initialized all the screens with images, and messsages 
* @event Screen
*/
var Screen3_1 = new Screen(Level3,'../static/img/background.png','image',"");
var Screen3_2 = new Screen(Level3,'../static/img/background.png','image',"Create a new variable call 'ten' thats equal to '5+5'");
var Screen3_3 = new Screen(Level3,'../static/img/background.png','image',"Math time!");
var Screen3_4 = new Screen(Level3,'../static/img/background2.png','image',"You Did it!");



/**
* new instances of the Door Class for level 3
* Initiatlize doors with screen object that door belongs to, x coord of canvas, y coord of canvas, destination screen, and effects array
* @event Door
*/
var Door3_1to3_2 = new Door(Screen3_1, 150, 10, 400, 0, Screen3_2,['location',455,550]);
var Door3_1to3_3vr = new Door(Screen3_1, 10, 150, 950, 250, Screen3_3,['location',100,300]);
var Door3_1to3_3vl = new Door(Screen3_1, 10, 150, 0, 250, Screen3_3,['location',800,300]);
var Door3_2to3_1vr = new Door(Screen3_2, 10, 150, 950, 250, Screen3_1,['location',150,300]);
var Door3_2to3_1vl = new Door(Screen3_2, 10, 150, 0, 250, Screen3_1,['location',750,300]);
var Door3_2to3_2 = new Door(Screen3_2, 150, 10, 400, 400, Screen3_2,['location',455,330]);
var Door3_3to3_1vr = new Door(Screen3_3, 10, 150, 950, 250, Screen3_1,['location',455,550]);
var Door3_3to3_1vl = new Door(Screen3_3, 10, 150, 0, 250, Screen3_1,['location',455,550]);
//Intialize this door to be invisible
var Door3_1to3_4 = new Door(Screen3_1, 150, 10, 400, 630, Screen3_4,['location',500,100]);
Screen3_1.removeDrawable(Door3_1to3_4);
/**
* call waitforcommand method from Screen class
* @event Screen
*/
Screen3_2.waitforcommand("ten=10",Door3_2to3_2);
Screen3_2.waitforcommand("foobar=\"foobar\"",Door3_2to3_1vl);
Screen3_2.waitforcommand("twenty=20",Door3_2to3_1vr);
Screen3_3.waitforcommand("fib=4",Door3_3to3_1vl);
Screen3_3.waitforcommand("fac=120",Door3_3to3_1vr);
Screen3_1.waitforcommand("final=0",Door3_1to3_4);
Screen3_2.spawnoncommand("ten=10",Door3_1to3_4,Screen3_1);

/**
* create the walls for level3 screen 1
* @event Obstacle
*/
var Wall3_1_1 = new Obstacle(gameInstance, 50, 640, 300, 0);
var Wall3_1_2 = new Obstacle(gameInstance, 50, 640, 600, 0);
var plusBox = new MessageArea(gameInstance, 48, 48, 455, 300, message="It's time for more commands: Use '+' to add numbers or strings");
var plusBox2 = new MessageArea(gameInstance, 48, 48, 455, 200, message="'+' by itself won't do anything try setting your result equal to a variable");
var multiBox = new MessageArea(gameInstance, 48, 48, 100, 300, message="* and / do multiplication and division respectively");
var subBox = new MessageArea(gameInstance, 48, 48, 750, 300, message="- and % do subtraction and modulous (remainder) respectively");
var finalBox = new MessageArea(gameInstance, 48, 48, 455, 400, message="Set final equal to fac % 2 <br> if you don't know what fac is, take the other path");
Screen3_2.spawnoncommand("ten=10",finalBox,Screen3_1);

Screen3_1.addDrawable([Wall3_1_1,Wall3_1_2,plusBox,plusBox2,multiBox,subBox]);

/**
* create the walls for level3 screen 2
* @event Obstacle
*/
var Wall3_2_1 = new Obstacle(gameInstance, 960, 250, 0, 0);
var Wall3_2_2 = new Obstacle(gameInstance, 960, 10, 0, 390);
var plusBox3 = new MessageArea(gameInstance, 48, 48, 200, 300, message="You can also append strings <br> Try 'foobar=\"foo\"+\"bar\"'");
var plusBox4 = new MessageArea(gameInstance, 48, 48, 700, 300, message="You can even add variables too <br> Try 'twenty=ten+10'");

Screen3_2.addDrawable([Wall3_2_1,Wall3_2_2,plusBox3,plusBox4]);

/**
* create the walls for level3 screen 3
* @event Obstacle
*/

var Wall3_3_1 = new Obstacle(gameInstance, 10, 640, 470, 0);
var Wall3_3_2 = new Obstacle(gameInstance, 960, 250, 0,400); //Bottom wall
var Wall3_3_3 = new Obstacle(gameInstance, 960, 250, 0, 0); //Top wall
var qBoxl = new MessageArea(gameInstance, 48, 48, 200, 300, message="Set variable fib equal to the 7th fibonacci number divided by the 4th<br>The 1st and 2nd being 0 and 1");
var qBoxr = new MessageArea(gameInstance, 48, 48, 700, 300, message="Set variable fac equal to the factorial of 5");

Screen3_3.addDrawable([Wall3_3_1,Wall3_3_2,Wall3_3_3,qBoxl,qBoxr]);

/**
* create the walls for level4 screen 3
* @event Obstacle
*/

var trophy= new MessageArea(gameInstance, 48, 48, 470, 300, message="Press the quit game button to finish",image='../static/img/trophy.png');

Screen3_4.addDrawable(trophy);
/**
* start level3 at screen 1
* @event Level
*/

Level3.changeScreen(Screen3_1);
