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
    window.addEventListener('keydown', function (e) { // Listen for and catch keyboard input
		myGameArea.move = true; //Sprite movement boolean
		myGameArea.keys=(myGameArea.keys || []); //Boolean array of which keys are down
		myGameArea.keys[e.keyCode] = true;
	})
	window.addEventListener('keyup', function (e) {
		myGameArea.move = false;
		myGameArea.keys[e.keyCode] = false; 
	})
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

	ctx.drawImage(sprite.image, (50 + 200 * a), 420,
								sprite.width, sprite.height,
								x, y, (sprite.width), sprite.height);
	if (myGameArea.move){ // If one or more keys are pressed
		if (myGameArea.keys[37]) {x -= 4;} // If left key pressed go left
		if (myGameArea.keys[39]) {x += 4;} // Right key
		if (myGameArea.keys[38]) {y -= 4;} // Down key
		if (myGameArea.keys[40]) {y += 4;} // Up key
		setSprite(); // Update sprite
	}
	window.requestAnimationFrame(draw);
}

//factory that creates a sprite and takes a JSON called options
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
	
var x = 0; // Sprite's horizontal position
var y = 0; // Sprite's veritcal position
var a = 2; // Current sprite
var count = 0; // Number of movement frames
function setSprite() {
	if(count % 15 == 0) { // Every 15 movement frames (frame group) cycle through sprites
		if (count == 0){ // Begin cycle at sprite 2
			a = 2;
		}
		else if (count <= 45){ // Go to next sprite for 3 frame groups
			a++;
		}
		else if (count <= 75){ // Go to previous sprite for 2 frame groups
			a--;
		}
		else { // Reset cycle
			count = -1; // Increments up to 0 before next call
		}
		console.log(a);
	}
	count++;
}
