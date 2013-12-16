/*global Game, createjs*/
Game.Tile = function (myX, myY, myType) {
    'use strict';
    var imgSrc = Game.imgResSrcs[myType],
        my = new createjs.Bitmap(imgSrc);
    my.type = myType;
    my.posX = myX;
    my.posY = myY;
    my.x = my.posX * Game.gridSize + Game.offsetX;
    my.y = my.posY * Game.gridSize + Game.offsetY;
    //
   
    my.update = function () {
        my.image.src = imgSrc;
    };
    //
    
    return my;    
    //
};  

Game.MazeTile = function (myX, myY, myType, tRotation, tCanRotate) {
	var my = Game.Tile(myX, myY, myType),
		wallArray = {
			"corner" : [1,1,0,0],
			"straight" : [1,0,1,0],
			"plug" : [1,0,1,0],
			"cross" : [1,1,1,1],
			"tcord" : [1,1,1,0],
			"kitty" : [0,0,0,0]
		}[myType],
		i, 
		wallCode;
	
	my.regX = Game.gridSize / 2;
	my.regY = Game.gridSize / 2;
	//
    my.x = my.posX * Game.gridSize + Game.offsetX + my.regX;
    my.y = my.posY * Game.gridSize + Game.offsetY + my.regY;
	//
	
	    // set up touch event listeners

        my.cstart = function (e) {
			console.log('fart');
        };
        
    my.addEventListener("click", my.cstart, true);
    
	
	var rotate = function () {		
		my.rotation = (my.rotation + 90) % 360;
		//Rotate walls 
		wallCode = wallArray.pop();
		wallArray.unshift(wallCode);
	};
	
	my.rotateOnTap = function () {
		window.setTimeout(function(){
        	if(tCanRotate === "R"){
			rotate();
			createjs.Sound.play("tile");
		}
        },300) 	;
		
		
	};
	
	my.addEventListener("mousedown", function () {
		my.rotateOnTap();
    });
	
	//Rotate the tile tRotation times.
	for(i = 0; i<tRotation;i+=1)
	{
		rotate();
	}
	
	my.canIenter = function (dirX, dirY) {
		if (dirX === 1) {
			return wallArray[3] === 0;
		} else if (dirX === -1) {
			return wallArray[1] === 0;
		}
		if (dirY === 1) {
			return wallArray[0] === 0;
		} else if (dirY === -1) {
			return wallArray[2] === 0;
		}
		return true;
	};
	my.canIexit = function (dirX, dirY) {
		if (dirX === 1) {
			return wallArray[1] === 0;
		} else if (dirX === -1) {
			return wallArray[3] === 0;
		}
		if (dirY === 1) {
			return wallArray[2] === 0;
		} else if (dirY === -1) {
			return wallArray[0] === 0;
		}
		return true;
	};
	

	return my;
};


