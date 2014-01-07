/*global createjs, Game*/

Game.Cat = function(myX, myY) {'use strict';
	var startX = myX, startY = myY;

	var catStageTimer;
	var catStageInitTimer;

	var imgSrc = Game.imgResSrcs['empty'], 
		my = new createjs.Bitmap(imgSrc);

	//The differnt cat stages
	my.catStages = ['empty', 'catSleep', 'catAwake', 'catStands'];
	my.catStage = 0;

	//
	my.setCatPosition = function(newX, newY) {
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

	my.changeTo = function(what) {
		imgSrc = Game.imgResSrcs[what];
		my.image.src = imgSrc;
	};

	my.incrementCatStage = function(){
		//Increment cat stage with one
		my.catStage += 1;
		createjs.Sound.play("meow");
		//Check if catStage is === to the lenght of catStages. because catStages starts at 0 to catStages.length-1. 
		if(my.catStage >= my.catStages.length){
			//Stop all timers 
			Game.cleanUpGameTimers();
			//LOST
			Game.showCatLose();
			//Play lost sound
			createjs.Sound.play("loseLevel");
		}
		else{
			my.changeTo(my.catStages[my.catStage]);
			createjs.Tween.get(my).to({scaleX:1.2,scaleY:1.2,rotation:10},800,createjs.Ease.backInOut)
			.call(function(){
				createjs.Tween.get(my).to({scaleX:1.0,scaleY:1.0,rotation:0},1000,createjs.Ease.backInOut)
				.call(function(){
					createjs.Tween.get(my).to({scaleX:1.2,scaleY:1.2,rotation:10},800,createjs.Ease.backInOut)
					.call(function(){
						createjs.Tween.get(my).to({scaleX:1.0,scaleY:1.0,rotation:0},1000,createjs.Ease.backInOut);
					});
				});
			});
			
		}
	};

	my.catShowsUp = function(){
		catStageTimer = setInterval(function(){
			my.incrementCatStage();
		},Game.timeBetweenCatStages);
	};

	my.stopCatTimer = function(){
		window.clearTimeout(catStageTimer);
		window.clearTimeout(catStageInitTimer);
	};

		//Reset cat when you pet it
	my.addEventListener("mousedown", function() {
		//Only do if cat is activ
		if(my.catStage > 0){
			//Reset cat timer 
			my.stopCatTimer();

			//Set stage to -1 when incremented it will be 0
			my.catStage = -1;
			//Increment to reset pictur
			my.incrementCatStage();

			//Make cat appere again after cooldown
			catStageInitTimer = window.setTimeout(function(){
				my.catShowsUp();
			},Game.timeBeforeCatsShows);
		}
	});

	//Set the cat position, for createJS
	my.setCatPosition(myX, myY);

	//Make Cat Show up after a given time
	catStageInitTimer = window.setTimeout(function(){
		my.catShowsUp();
	},Game.timeBeforeCatsShows);

	return my;
};

