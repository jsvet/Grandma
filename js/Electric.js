/*global createjs, Game*/

Game.Electric = function (myX, myY) {
    'use strict';
    var startX = myX,
    	startY = myY;
    	
    	var my = new createjs.Bitmap(Game.imgResSrcs["electric"]);
    //

    //
    my.setElectricPosition = function (newX, newY) {
        var newXpx, newYpx;
        my.posX = newX;
        my.posY = newY;
        //
        // just jump to the correct position
        
        my.regX = Game.gridSize / 2;
		my.regY = Game.gridSize / 2;
       
        my.x = my.posX * Game.gridSize + Game.offsetX + my.regX;
        my.y = my.posY * Game.gridSize + Game.offsetY + my.regY;     
        
        Game.stage.update();
    };
    
    //listen for click and alert the wire
    my.addEventListener("mousedown", function() {
		Game.wires.get(my.posX, my.posY).rotateOnTap();
	});
    
    my.setElectricPosition(myX, myY);
    return my;
};


