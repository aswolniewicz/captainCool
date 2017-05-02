//Intialize Screens
var Screen1_1 = new Screen(Level1,'../static/img/background.png','image');
var Screen1_2 = new Screen(Level1,'../static/img/background.png','image');
var Screen1_3 = new Screen(Level1,'../static/img/background.png','image');
var Screen1_4 = new Screen(Level1,'../static/img/background.png','image');


//Intialize Doors
var Door1_1to1_2 = new Door(Screen1_1, 10, 150, 950, 250,Screen1_2, 'teal',['location',15,300,'keyed','Key_For_Screen2_Door']);
var Door1_2to1_1 = new Door(Screen1_2, 10, 150, 0, 250,Screen1_1, 'teal',['location',900,300]);
var Door1_2to1_3 = new Door(Screen1_2, 10, 150, 950, 250,Screen1_3, 'teal',['location',475,500]);
var Door1_3to1_2 = new Door(Screen1_3, 150, 10, 400, 630,Screen1_2, 'teal',['location',515,300]);
var Door1_3to1_4 = new Door(Screen1_3, 150, 10, 400, 0,Screen1_4, 'teal',['location',15,300]);

//Level transition door
//var Door1_2to2_1 = new Door(Screen1_1, 10, 150, 950, 250,Screen1_2, 'black',['location',15,300,'keyed','Key_For_Screen2_Door']);

// Objects in Screen 1
var masterCool = new NonPlayerCharacter(gameInstance, 53, 64, '../static/img/master_cool.png', 2, 400, 50, true);
Screen1_1.addDrawable(masterCool);
var key1Array = ['message','You have found a key.  Press enter to dismiss','key','Key_For_Screen2_Door'];
var key1 = new MessageArea(gameInstance, 48, 48, 500, 500, '../static/img/newKey.png', false, key1Array);
Screen1_1.addDrawable(key1);
inputHandler.addPoller(key1);

// Objects in Screen 2
var Wall1_2_1 = new Obstacle(gameInstance, 960, 250, 0,400);
Screen1_2.addDrawable(Wall1_2_1);
var Wall1_2_2 = new Obstacle(gameInstance, 960, 250, 0, 0);
Screen1_2.addDrawable(Wall1_2_2);

// Objects in Screen 3
var Wall1_3_1 = new Obstacle(gameInstance, 450, 640, 550,0);
Screen1_3.addDrawable(Wall1_3_1);
var Wall1_3_2 = new Obstacle(gameInstance, 400, 640, 0, 0);
Screen1_3.addDrawable(Wall1_3_2);
// Start screen
Level1.currentScreen=Screen1_1;
