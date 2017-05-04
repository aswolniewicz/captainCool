/**
* new instances of the Screen Class for Level 3
* First we initialized all the screens with images, and messsages 
* @event Screen
*/
var Screen3_1 = new Screen(Level3,'../static/img/background.png','image',"You beat Level 2! Don't stop now!");

/**
* start level3 at screen 1
* @event Level
*/
Level3.changeScreen(Screen3_1);
