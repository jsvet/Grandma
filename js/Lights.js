/*global createjs, Game*/
    christmasLights : {
    	"R" : "red",
    	"O" : "orange",
    	"Y" : "yellow",
    	"G" : "green",
    	"B" : "blue",
    	"V" : "violet",
    	"N" : "noLight"
    },
            "red" : "img/cross.png",
        "orange" : "img/corner.png",
        "yellow" : "img/plug.png",
        "green" : "img/tcord.png",
        "blue": "img/straight.png",
        "violet" : "img/cross.png",
        "noLight" : "img/corner.png",
        "electric" : "img/plug.png"

Game.Cow = function (myX, myY) {
    'use strict';
    var startX = myX,
    	startY = myY,
    	my = new createjs.Bitmap(Game.imgResSrcs["cow"]);
    //
    
    my.shrink = function(){
    	createjs.Tween.get(my).to({scaleX:0,scaleY:0},300,createjs.Ease.backIn);
    };
    
    //
    my.setCowPosition = function (newX, newY) {
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
    my.iGotPickedUp = function () {
      my.shrink();
      my.isVisable = false;
    };
    
    //
    my.isAt = function(somewhereX, somewhereY){
        return my.posX === somewhereX && my.posY === somewhereY && my.isVisable;
    };
    
    //
    my.backToStart = function(){
    	my.moveTo(startX, startY);
    };
    
    my.setCowPosition(myX, myY);
    return my;
};


Game.addCows = function(){
	var cowIndex;
	for (cowIndex in Game.cows){
    	Game.stage.addChild(Game.cows[cowIndex]);
    }
};

Game.cowCounter = function(){
	Game.cowsCollected += 1;
	if (Game.cowsCollected === Game.minimumCows){
		Game.addUFO();
	}
};

Game.steppedOnSpaceship = function(){
	Game.levelIsWon = true;
};


Game.removeCow = function (cow) {
	cow.iGotPickedUp();
	Game.cowCounter();
	window.setTimeout(function(){
        Game.stage.removeChild(cow);
        },300);
	
};

Game.pickCowUpIfItsThere = function (testX, testY){
	var cowIndex, 
		theCow; 
	for (cowIndex in Game.cows){
		theCow = Game.cows[cowIndex];
		if (theCow.isAt(testX, testY)){
			Game.removeCow(theCow);
			createjs.Sound.play("cow");
		}
	}
};
