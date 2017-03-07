#Drawable classes
## Drawables 
Every Drawable class has a draw method and inherits from the base class Drawable.
## Collidables 
* Every collidable is a Drawable, every collidable has an onContactLost and an onCollision method which calls the base onContactLost and the base onCollision method.
* They all have solid flag which decides whether they can be passed through or not 
* They have a contact list, which is every other collidable that they are currently in contact with
* The onCollision method adds its argument to the contactList
* Its contactLost method removes its argument from the contactList 
## Obstacle 
* An obstacle is a collidable that is solid 
* It's draw method draws a rectangle 
## Message Area
* A message area is a non-solid collidable
* It's draw method also draws a rectangle
* When it is contact with the playerCharacter it changes color and displays a message 
## Character 
* extends off of Collidable
* super in this case means call Collidable class constructer with the parameters given 
* Its draw method draws a cut from the sprite sheet 
## PlayerCharacter 
* extends off of Character
* moves according to keyboard input UNLIKE character 
* Its onCollision method prevents it from moving if it collides with a solid obstacle. This also causes it to speak if it comes in contact with a message area
* Its onContactLost method allows it to move if it lost contact with a solid, i.e. it turned away from the obstacle. NOTE that this causes the character to stop speaking if it is speaking once in moves away from message area.
* The move method has been split up so it only moves the character it doesn't listen to keyboard input. That is now a separate method that calls move. 
* bounce fixes a bug, don't worry about it 

#InputHandler 
## Constructor
* Creates a list of objects that poll for keyboard input and eventListeners for keyup and keydown events
* Where are the keys? They are in the captainCool.js file. GLOBAL VAR 
## addPoller
* moves an object on the the pollers list 
## pollForKeyboardInput 
* calls every poll for keyboard method on all the pollables 

#CollisionResolver
## Constructor
* has a collidables list that is much like the pollers list and drawers list
## notifyCollision method
* notifies each object argument that it collided with the other collidable object argument 
## detectCollisions
* For every object in the collidable list it checks every other item in the collidable list and decides if it is inside of it or next to it. If it is it notifies the objects in the collision by calling the notifyCollision method. Could be simplified by only checking the player character against everyone else but it isn't...
* If the two objects aren't in contact with eachother but they were in contact with eachother. Then it calls the onContactLost method which removes the object from the contact list of the other object. 

# debug
* general description: global variables that correspond with DOM elements are drawn on the screen for debugging uses. 
* updatePositionLogs and updateContactLogs are called by updateLogs which is called on every draw. 
* updateKeysPressedLogs is called by the keyboard eventListeners 

# captainCool 
## Game
* keeps track of a list of drawables and its start method calls the global draw function 
## Globals
* Delcares a game instance, collisionResolver, inputHandler and the global draw method. 
## Draw Method
* On every draw it clears the canvas and it draws every drawable in the game instance by calling its draw method 
* It calls the inputHandler pollForKeyboardInput and the collisionHandler's detectCollisions method ==> requestAnimationFrame requires this to occur 60 times per second 
* we then declare four objects and add them to the poller list, collidable list, drawable list as necessary. 
* we call gameInstance.start which starts the game by calling draw method 

