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
		this.canvas.style.backgroundColor = 'white'
    // Game will be 2d
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // Start at frame zero
    this.frameNo = 0;
		draw();
  }
}

function draw() {
	var ctx = myGameArea.context;
	sprite = createSprite({
		context: ctx,
		width: 190,
		height: 325,
		image: spriteImage
	});
	
	ctx.clearRect(0, 0, 960, 640);
	setA();

	ctx.drawImage(sprite.image, (50 + 200 * a), 420,
								sprite.width, sprite.height,
								x, 0, (sprite.width), sprite.height);
	if (x < myGameArea.canvas.width - 190)
		x += 1;
	window.requestAnimationFrame(draw);
}

//factory that creats a sprite and takes a JSON called options
function createSprite (options) {
	var newSprite = {};
	newSprite.context = options.context;
	newSprite.width = options.width;
	newSprite.height = options.height;
	newSprite.image = options.image;
	return newSprite;
}

var spriteImage = new Image();
spriteImage.src = "static/images/spritesheet.jpg";
	
var x = 0;
var a = 0;
function setA() {
	if (a == 6)
		a = 0;
	else {
		if(x % 20 == 0) {
			a += 1;
			console.log(a)
		}
	}
}
