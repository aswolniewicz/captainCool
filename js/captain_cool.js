function startGame() {
  // declare all the big variables here
  myGameArea.start();
}

var myGameArea = {
  // Create the canvas
  canvas : document.createElement("canvas"),
  start : function() {
    // Canvas width and height
    this.canvas.width = 960;
    this.canvas.height = 640;
    // Game will be 2d
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // Start at frame zero
    this.frameNo = 0;
  }
}
