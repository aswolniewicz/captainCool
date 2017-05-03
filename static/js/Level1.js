//Intialize Screens
var Screen1_1 = new Screen(Level1,'../static/img/background.png','image');
var Screen1_2 = new Screen(Level1,'../static/img/background.png','image');
var Screen1_3 = new Screen(Level1,'../static/img/background.png','image');
var Screen1_4 = new Screen(Level1,'../static/img/background.png','image');


//Intialize Doors

//Doors have new optional parameter locked, which can only be change through a command or key
var testDoor = new Door(Screen1_1, 10, 150, 0, 250,Screen1_4,['location',25,550],true);
var Door1_1to1_2 = new Door(Screen1_1, 10, 150, 950, 250,Screen1_2,['location',15,300],locked=true);
var Door1_2to1_1 = new Door(Screen1_2, 10, 150, 0, 250,Screen1_1, ['location',900,300]);
var Door1_2to1_3 = new Door(Screen1_2, 10, 150, 950, 250,Screen1_3, ['location',425,550],locked=true);
var Door1_3to1_2 = new Door(Screen1_3, 10, 150, 400, 500,Screen1_2, ['location',860,300]);
var Door1_3to1_4 = new Door(Screen1_3, 150, 10, 400, 0,Screen1_4, ['location',25,550]);
var Door1_4to1_3 = new Door(Screen1_4, 150, 10, 0, 630, Screen1_3, ['location',450,15]);
//Level transition door
//var Door1_2to2_1 = new Door(Screen1_1, 10, 150, 950, 250,Screen1_2, 'black',['location',15,300,'keyed','Key1_2']);

// Commands
// Function ties command " speak 'hello' " to opening testDoor on Screen 1_1
Screen1_1.waitforcommand("speak \"hello\"",testDoor);

// Objects in Screen 1
var masterCool = new NonPlayerCharacter(gameInstance, 53, 64, '../static/img/master_cool.png', 2, 400, 50, true);
Screen1_1.addDrawable(masterCool);
var key1 = new Key(gameInstance, 48, 48, 500, 500, '../static/img/newKey.png', Door1_1to1_2);
var key2 = new Key(gameInstance, 48, 48, 400, 400, '../static/img/newKey.png', Door1_2to1_3);
Screen1_1.addDrawable(key1);
Screen1_1.addDrawable(key2);

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
Level1.changeScreen(Screen1_1);
