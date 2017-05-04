/**
* @module Collision_resolver
*/
/**
* handles collisions between collidables in game
* @class
* @memberof module:Collision_resolver
*/
class CollisionResolver {
  /**
  * @constructor
  * @param {Object} the instance belonging to the game
  */
  constructor(gameInstance) {
    this.collidables = [];
    this.stop=false; //Variable to force collision detection to stop
  }

  /**
  * @method
  * @param {Object} object1 in the collision
  * @param {Object} object2 in the collision
  * purpose is to pass each object the other object it collided with 
  */
  notifyCollilsion(obj1, obj2) {
    obj1.onCollision(obj2); //takes the object it collided with to figure out what to do
    obj2.onCollision(obj1); //samesies
  }

  /**
  * @method
  * @param {Object} the collidable to add to the collidable list
  * purpose is to push a new collidable onto the collidable list 
  */
  addCollidable(c) {
    this.collidables.push(c);
  }
  /**
  * @method
  * @param {Object} object to be removed from the collidable list
  * pupose is to remove the collidable from the collidables list
  */
  removeCollidable(c){
    console.log("removed collidable")
  	var index = this.collidables.indexOf(c) //Find collidable in list
  	if(index > -1){ // If its found
        this.collidables.splice(index,1) //Remove it from the list
      }
  }
 
  /**
  * @method
  * purpose is to figure out who is colliding with who 
  */
  detectCollisions() {
    var self = this;
    self.stop=false; //Assume detection is good to go
    self.collidables.forEach(function(d1) {
      self.collidables.forEach(function(d2) {
		if(self.stop){return 0} //If any function changes stop variable to true then detection ceases
        if(((d1.x + d1.width >= d2.x) && (d1.x <= d2.x + d2.width))
            && ((d1.y + d1.height >= d2.y) && (d1.y <= d2.y + d2.height)) && !(d1 === d2)) {
            self.notifyCollilsion(d1, d2); //eventaully need to raise a method that notifies its args of the collision (observer)
        }
        //no contact and in contact remove d2 from d1's contact list
        else {
          //if they are in contact remove from contact
          var indexOfContactedItem = d1.contactList.indexOf(d2);
          if(indexOfContactedItem > -1)
            d1.onContactLost(d2, indexOfContactedItem); //pass it the index so we don't have to find it again
        }
      });
    })
  }
}
