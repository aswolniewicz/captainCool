//
class CollisionResolver {
  constructor(gameInstance) {
    this.collidables = [];
  }

  //call the notify methods of the two objects that collided
  notifyCollilsion(obj1, obj2) {
    obj1.onCollision(obj2); //takes the object it collided with to figure out what to do
    obj2.onCollision(obj1); //samesies
  }

  //
  addCollidable(c) {
    this.collidables.push(c);
  }
  removeCollidable(c){
	var index = this.collidables.indexOf(c)
	if(index > -1){
      this.collidables.splice(index,1)
    }
  }
  //really great O(n^2) method that needs to be re written
  //maybe only check every object against objects that moved?
  detectCollisions() {
    var self = this;
    self.collidables.forEach(function(d1) {
      self.collidables.forEach(function(d2) {
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
    this.collidables=[]
  }
}
