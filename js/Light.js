/*global createjs, Game*/

Game.Light = function(myX, myY, myType) {'use strict';
	var startX = myX, startY = myY;

	var imgSrc = Game.imgResSrcs[myType], 
		my = new createjs.Bitmap(imgSrc);
	
	my.type = myType;
	//

	//
	my.setLightPosition = function(newX, newY) {
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
	};

	my.returnIsTurnedOn = function() {
		return my.isTurnedOn;
	};

	my.changeTo = function(what) {
		imgSrc = Game.imgResSrcs[what];
		my.image.src = imgSrc;
	};

	my.turnOn = function() {
		var newLKey = my.type+"on";
		my.changeTo(newLKey);
		createjs.Tween.get(my).to({scaleX:1.2,scaleY:1.2},100,createjs.Ease.elasticInOut)
		.call(function(){
			createjs.Tween.get(my).to({scaleX:1.0,scaleY:1.0},300,createjs.Ease.elasticInOut);
		});
		my.isTurnedOn = true;
	};

	my.turnOff = function() {
		my.changeTo(my.type);
		my.isTurnedOn = false;
	};

	my.rotate = function(degrees) {
		my.rotation = degrees;
	};

	//listen for click and alert the wire
	my.addEventListener("mousedown", function() {
		Game.wires.get(my.posX, my.posY).rotateOnTap();
	});

	my.setLightPosition(myX, myY);
	return my;
};

Game.addLights = function() {
	var lightIndex;
	for (lightIndex in Game.lights) {
		Game.stage.addChild(Game.lights[lightIndex]);
	}
};

