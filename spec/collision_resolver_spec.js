describe("CollisionResolver", function() {
  var test_resolver;
  it("Should start with an empty list of collidables.", function() {
    test_resolver = new CollisionResolver();
    expect(test_resolver.collidables.length).toEqual(0);
  })
})
