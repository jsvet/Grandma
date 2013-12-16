/*global Game, createjs*/
Game.getWire = function(myX, myY, myType) {'use strict';
	var imgSrc = Game.imgResSrcs[myType], my = new createjs.Bitmap(imgSrc);
	my.type = myType;
	my.posX = myX;
	my.posY = myY;
	my.x = my.posX * Game.gridSize + Game.offsetX;
	my.y = my.posY * Game.gridSize + Game.offsetY;

	return my;
};

Game.Wire = function(myX, myY, myType, tRotation, tCanRotate, light) {
	var my = Game.getWire(myX, myY, myType), wallArray = {
	"corner" : [1,1,0,0],
	"straight" : [1,0,1,0],
	"aPlug" : [1,0,1,0],
	"zPlug" : [1,0,1,0],
	"cross" : [1,1,1,1],
	"tcord" : [1,1,1,0],
	"kitty" : [0,0,0,0]
	}[myType], i, on = false, wallCode;

	my.light = light;

	my.regX = Game.gridSize / 2;
	my.regY = Game.gridSize / 2;
	//
	my.x = my.posX * Game.gridSize + Game.offsetX + my.regX;
	my.y = my.posY * Game.gridSize + Game.offsetY + my.regY;
	//

	// set up touch event listeners

	var rotate = function() {
		my.rotation = (my.rotation + 90) % 360;

		//Rotate walls
		wallCode = wallArray.pop();
		wallArray.unshift(wallCode);

		//Rotate light
		if (my.light) {
			my.light.rotate(my.rotation);
		}
	};

	//Rotate the wire tRotation times, mainly used during the initModel map creation.
	for ( i = 0; i < tRotation; i += 1) {
		rotate();
	}

	my.rotateOnTap = function() {
			if (tCanRotate === "R") {
				rotate();
				createjs.Sound.play("tile");
				Game.update();
			}
	};

	my.addEventListener("mousedown", function() {
		my.rotateOnTap();
	});

	var getOutgoingWires = function() {
		var outWireDirections = [];
		if (wallArray[0] === 1) {
			outWireDirections.push({
				'X' : 0,
				'Y' : -1
			});
		}
		if (wallArray[1] === 1) {
			outWireDirections.push({
				'X' : 1,
				'Y' : 0
			});
		}
		if (wallArray[2] === 1) {
			outWireDirections.push({
				'X' : 0,
				'Y' : 1
			});
		}
		if (wallArray[3] === 1) {
			outWireDirections.push({
				'X' : -1,
				'Y' : 0
			});
		}
		return outWireDirections;
	};

	my.lightUp = function() {
		noToReturn = 0;
		if(my.type === 'zPlug'){
			//Game.checkAllLights();
			noToReturn +=1;
		}
		
		on = true;
		if (light) {
			light.turnOn();
			noToReturn += 1;
		}
		var outWireDirections = getOutgoingWires();
		for (outIndex in outWireDirections) {
			dirX = outWireDirections[outIndex]['X'];
			dirY = outWireDirections[outIndex]['Y'];
			testX = my.posX + dirX;
			testY = my.posY + dirY;
			isInside = Game.wires.inside(testX, testY);
			if (isInside) {
				noToReturn += Game.wires.get(testX, testY).tryToLightUp(dirX, dirY);
			}
		}
		return noToReturn;
	};

	my.lightsOff = function() {
		on = false;
		if (light) {
			light.turnOff();
		}
	};

	my.doesWireContinue = function(dirX, dirY) {
		if (dirX === 1) {
			return wallArray[3] === 1;
		} else if (dirX === -1) {
			return wallArray[1] === 1;
		}
		if (dirY === 1) {
			return wallArray[0] === 1;
		} else if (dirY === -1) {
			return wallArray[2] === 1;
		}
		return true;
	};

	my.tryToLightUp = function(dirX, dirY) {
		noToReturn = 0;
		var doesWireContinue = my.doesWireContinue(dirX, dirY);
		if (doesWireContinue && !on) {
			console.log("tryToLightUp");
			noToReturn = my.lightUp();
		}
		return noToReturn;
	};

	return my;
};

