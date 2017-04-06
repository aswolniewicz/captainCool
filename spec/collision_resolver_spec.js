// This tests the collision_resolver class.
 describe("CollisionResolver", function() {
  var test_resolver = new CollisionResolver;

  // Test that the program starts with 0 collidables.
  it("Should start with an empty list of collidables.", function() {
    expect(test_resolver.collidables).toEqual([]);
  })

  // Test that the program adds a collidable to the list.
  it("Adds a collidable to the collidable list.", function(){
    test_resolver.addCollidable(character);
    expect(test_resolver.collidables.length).toEqual(1);
  })
})
