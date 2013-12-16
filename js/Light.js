/*global createjs, Game*/

Game.Light = function (myX, myY, imgSrc) {
    'use strict';
    var startX = myX,
    	startY = myY;
    	
    	var my = new createjs.Bitmap(imgSrc);
    //

    //
    my.setLightPosition = function (newX, newY) {
        var newXpx, newYpx;
        my.posX = newX;
        my.posY = newY;
        my.isVisable = true;
        //
         // just jump to the correct position
          	my.x = my.posX * Game.gridSize + Game.offsetX + my.regX;
            my.y = my.posY * Game.gridSize + Game.offsetY + my.regY;     
        Game.stage.update();
    };
    
    //
    my.isAt = function(somewhereX, somewhereY){
        return my.posX === somewhereX && my.posY === somewhereY && my.isVisable;
    };

    
    my.setLightPosition(myX, myY);
    return my;
};


Game.addLights = function(){
	var lightIndex;
	for (lightIndex in Game.lights){
    	Game.stage.addChild(Game.lights[lightIndex]);
    	console.log("hej");
    }
};


