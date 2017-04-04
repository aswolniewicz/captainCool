// This tests the background file.
 describe("Level", function() {
  var test_level = null;
  // Create a new game for testing.
  var test_canvas = document.getElementById('canvas');
  var test_collisionResolver = new CollisionResolver();
  var test_inputHandler = new InputHandler();
  var test_game = new Game(test_canvas,test_inputHandler,test_collisionResolver);


  // Test that the constructor works.
  it("Should properly construct a level.", function() {
    test_level = new Level(test_game, 1);
    expect(test_level.id).toEqual(1);
    expect(test_level.currentScreen).toBeNull();
    expect(test_level.screens).toEqual([]);
    expect(test_level.canvas).toEqual(test_game.canvas);
    expect(test_level.context).toEqual(test_game.context);
    expect(test_level.drawables).toEqual([]);
  })

  // Test that a screen has been added.

  // Test that the program can add a drawable.

  // Test that the screen has been changed.

  // Test that correct screen is being displayed.

  // Test that screens are being logged.
})

describe("Screen", function() {
  var screen_resolver = new Screen();

  // Test the constructor works.

  // Test that the door has been drawn.

  // Test the door works with collisions.

})
