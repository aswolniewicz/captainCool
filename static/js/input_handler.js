//adds the key even listeners when it's constructed
class InputHandler {
  constructor() {
    //
    this.Pollers = [];
    //
    window.addEventListener('keydown', function (e) {
 		  KEYS =(KEYS || []); //Boolean array of which keys are down
 		  KEYS[e.keyCode] = true;
 		  if(KEYS[17]){ // If you press control, it mutes the music
			var song = document.getElementById('music');
            if (!song.muted)
              song.muted=true;
            else
              song.muted=false;  
		  }
 	  })
 	  window.addEventListener('keyup', function (e) {
 		  KEYS[e.keyCode] = false;
     // updateKeysPressedLogs(e.keyCode, 1);
 	  })
  }

  //
  addPoller(c) {
    this.Pollers.push(c);
  }

  //
  pollForKeyboardInput() {
      this.Pollers.forEach(function(p) {
          p.pollForKeyboardInput();
      });
      //up, left, right, down, direction (for animation)
    //controllables must have a move command
  }
}
