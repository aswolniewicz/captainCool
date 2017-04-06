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

  // Make sure that each screen does change.
  it("Should change current level's screen.", function() {
    test_level = new Level(test_game, 1);
    expect(test_level.changeScreen.screen).toEqual(test_game.screen);
  })

  // Test that background is drawn when not null.
  it("Should draw background and objects.", function() {
    test_level = new Level(test_game, 1);
    test_level.currentScreen = 3;
    expect(test_level.currentScreen).not.toBeNull();
  })
})
