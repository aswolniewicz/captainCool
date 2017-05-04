/**
* @module InputHandler
*/


/**
* listens for input from the user, using EventListener
* @class 
* @memberof module:InputHandler
*/
class InputHandler {
  /**
  * @constructor
  */
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

  /**
  * adds an object to the poller list so it can listen for input
  * @method
  */
  addPoller(c) {
    this.Pollers.push(c);
  }

  /**
  * polls for keyboard input
  * @method
  */
  pollForKeyboardInput() {
      this.Pollers.forEach(function(p) {
          p.pollForKeyboardInput();
      });

  }
}
