//Input handler testing.
describe("InputHandler", function() {
  test_handler = new InputHandler;

  // Test the constructor.
  it("Should properly construct a handler.", function() {
    expect(test_handler.Pollers).toEqual([]);
  })

  // Should add a poller to the list.
  it("Should properly add a poller to Pollers.", function() {
    test_handler.addPoller(character);
    expect(test_handler.Pollers.length).toEqual(1);
  })
})
