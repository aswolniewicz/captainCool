// This tests the captain_cool class.
describe("Game", function() {
  var game_resolver = new Game;

  // Test that the constructor works

  // Test that a drawable has been added.
  it("Adds a drawable to the list.", function() {
    game_resolver.addDrawable(ma);
    expect(game_resolver.drawables.length).toEqual(1);
  })

  // Test that a rectangle cann be drawn.

  // Test that the game can start.
})
