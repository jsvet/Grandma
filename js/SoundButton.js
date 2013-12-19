/*global createjs, Game*/

Game.SoundButton = function(sounOn) {'use strict';
 	var myX = 11, myY = 8;
	var startX = myX, startY = myY;

	var changeInX = 55;
	var ChangeInY = 13;

	var imgSrc;
	if(sounOn){
		imgSrc = Game.imgResSrcs['soundOn'];
	}
	else{
		imgSrc = Game.imgResSrcs['soundOff'];
	}
	
	var my = new createjs.Bitmap(imgSrc);
		
	my.SoundOn = sounOn;

	my.setSoundButtonPosition = function(newX, newY) {
		my.posX = newX;
		my.posY = newY;

		my.x = my.posX -10;
		my.y = my.posY -10;
	};

	my.toggleSound = function(){
		//toggle
		my.SoundOn = !my.SoundOn;
		
		//global variable 
		Game.isSoundOn = my.SoundOn;
		
		//mute
		createjs.Sound.setMute(!my.SoundOn);
		
		//switch image
		var imgSrc;
		if(my.SoundOn){
			imgSrc = Game.imgResSrcs['soundOn'];
		}
		else{
			imgSrc = Game.imgResSrcs['soundOff'];
		}
		//Change image
		my.image.src = imgSrc;
	};

	my.addEventListener("mousedown", function() {
		my.toggleSound();
	});

	my.setSoundButtonPosition(myX, myY);
	return my;
};

