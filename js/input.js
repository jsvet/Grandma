/*global Game, document*/
Game.setupInput = function () {
    "use strict";
    
    Game.rotateOnClick = function (x,y){
    	var newXpx = x - 2*Game.offsetX;
        var newYpx = y - 2*Game.offsetY;
        newXpx = Math.floor(newXpx/Game.gridSize);
        newYpx = Math.floor(newYpx/Game.gridSize);
        
    	//var currentTile =  Game.tiles.get(newXpx,newYpx);
    	//if (currentTile != null){
    	//	currentTile.rotateOnTap();	
    	//}
    };
    
    
    // first, the four directions, abstracted away from any particular input device, buttons on keyboard, swipe on phone
    Game.moveLeft = function () {
        Game.move(-1, 0);
    };
    Game.moveUp = function () {
        Game.move(0, -1);
    };
    Game.moveRight = function () {
        Game.move(1, 0);
    };
    Game.moveDown = function () {
        Game.move(0, 1);
    };
    
    
    //
    // set up key event listener
    if (!Game.kdown) {
        Game.kdown = function (e) {
            var kc = e.keyCode;
            if (kc === 37) {
                Game.moveLeft();
            } else if (kc === 38) {
                Game.moveUp();
            } else if (kc === 39) {
                Game.moveRight();
            } else if (kc === 40) {
                Game.moveDown();
            }
        };

    }
    
    // set up touch event listeners
    if (!Game.cstart) {
        Game.cstart = function (e) {
            var touch = e; // finger #1
            Game.tstartX = touch.pageX;
            Game.tstartY = touch.pageY;
            Game.rotateOnClick(touch.pageX, touch.pageY);
        };
        
    };
    document.addEventListener("click", Game.cstart, true);
    
    if (!Game.tstart) {
        Game.tstart = function (e) {
            var touch = e.touches[0]; // finger #1
            Game.tstartX = touch.pageX;
            Game.tstartY = touch.pageY;
            Game.rotateOnClick(touch.pageX, touch.pageY);
        };
        
    };
    document.addEventListener("touchstart", Game.tstart, true);
        
        
};