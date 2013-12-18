/*global createjs, Game*/

Game.Timer = function() {'use strict';
 	var myX = 160, myY = 17;
	var startX = myX, startY = myY;

	var changeInX = 55;
	var ChangeInY = 13;

	var imgSrc = Game.imgResSrcs['sun'], 
		my = new createjs.Bitmap(imgSrc);

	//The differnt cat stages
	//
	my.setTimerPosition = function(newX, newY) {
		my.posX = newX;
		my.posY = newY;

		my.x = my.posX -10;
		my.y = my.posY -10;
	};

	my.animateMoveToSecondHalf = function(){
		var newX = my.x + changeInX;
		var newY = my.y + ChangeInY;
		createjs.Tween.get(my)
			.to({x:newX,y:newY},Game.timeToCompleatLevel/2,createjs.Ease.linear)
			.call(function(){
				Game.cleanUpGameTimers();
				Game.showTimeLost();
			})
			;
	}

	my.animateMoveToFirsHalf = function(){
		var newX = my.x + changeInX;
		var newY = my.y - ChangeInY;
		createjs.Tween.get(my)
			.to({x:newX,y:newY},Game.timeToCompleatLevel/2,createjs.Ease.linear)
			.call(function(){my.animateMoveToSecondHalf();});
	}

	my.stopTimer = function(){
		createjs.Tween.removeTweens(my);
	}

	//Set the Timer position, for createJS
	my.setTimerPosition(myX, myY);

	//Start the timer 
	my.animateMoveToFirsHalf();
	return my;
};

