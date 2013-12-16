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
        my.isTurnedOn = false;
        //
        // just jump to the correct position
        
        my.regX = Game.gridSize / 2;
		my.regY = Game.gridSize / 2;
       
        my.x = my.posX * Game.gridSize + Game.offsetX + my.regX;
        my.y = my.posY * Game.gridSize + Game.offsetY + my.regY;     
        
        Game.stage.update();
    };
    
    //
    my.isAt = function(somewhereX, somewhereY){
        return my.posX === somewhereX && my.posY === somewhereY && my.isVisable;
    };
    
    my.returnIsTurnedOn = function(){
    	return my.isTurnedOn;
    };
    
    my.turnOn = function(){
    	console.log(my.posY);
    	console.log("i was turned on");
    	my.isTurnedOn = true;
    };

    my.turnOff = function(){
    	console.log("i was turned off");
    	my.isTurnedOn = false;
    };
    
    my.rotate = function(degrees){
    	my.rotation = degrees;
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


