/*global Game, createjs, console*/
// here is the code for buttons, on-screen messages etc.
Game.showNextLevelBtn = function() {'use strict';
	var txt = new createjs.Text("HOME", "18px Gorditas", "white"), 
	hitarea = new createjs.Shape(), 
	border = 10, 
	hitW = txt.getMeasuredWidth() + (border * 2), 
	hitH = txt.getMeasuredHeight() + (border * 2), 
	hitX, 
	button = new createjs.Container(), hitY;
	//
	txt.x = 250;
	txt.y = 500 - hitH - 10;
	hitX = txt.x - border;
	hitY = txt.y - border;
	//
	hitarea.graphics.beginFill("#058").drawRect(hitX, hitY, hitW, hitH);
	button.addChild(hitarea);
	button.addChild(txt);
	Game.stage.addChild(button);
	//AddSoundButton
	Game.setSoundButton();
	Game.stage.update();
	//
	return button;
};

Game.showStartBtn = function(imageFile) {'use strict';
	var txt = new createjs.Text("PLAY", "18px Gorditas", "white"), 
	hitarea = new createjs.Shape(), 
	border = 10, 
	hitW = txt.getMeasuredWidth() + (border * 2), 
	hitH = txt.getMeasuredHeight() + (border * 2), hitX, hitY, 
	button = new createjs.Container(), my = new createjs.Bitmap(imageFile);

	//
	my.x = 0;
	my.y = 0;

	hitX = my.x - border;
	hitY = my.y - border;
	//
	hitarea.graphics.beginFill("#058").drawRect(hitX, hitY, hitW, hitH);

	button.addChild(my);
	Game.stage.addChild(button);
	//Add SoundButton
	Game.setSoundButton();
	Game.stage.update();
	//
	return button;
};

Game.showWinScreen = function() {
	var fortune = new createjs.Text("YOU WON!! ", "25px Gorditas", "white");
	Game.stage.addChild(fortune);
	//Add SoundButton
	Game.setSoundButton();
};

Game.showGameBackground = function() {
	Game.showStartBtn("img/GameBackground.png");
};

Game.showLvgRmWin = function(){
	'use strict';
	Game.stage.removeAllChildren();
	//forget about the tiles used for current level
	Game.tiles = [];

	var background = Game.showStartBtn("img/LvgRmWin.png");
	var nextBtn = Game.showNextLevelBtn();
	nextBtn.addEventListener("mousedown", function() {
		Game.showLvgRmHappy();
	});
	background.addEventListener("mousedown", function() {
		Game.showLvgRmHappy();
	});
};

//
Game.showLevelOver = function() {'use strict';
	Game.stage.removeAllChildren();
	//forget about the tiles used for current level
	Game.tiles = [];

	var nextBtn = Game.showStartBtn("img/WinTree.png");
	//Set timer
	window.setTimeout(function() {
		Game.showLvgRmWin();
	}, 2000);

};

Game.showStartLevel = function() {'use strict';
	Game.stage.removeAllChildren();

	//forget about the tiles used for current level
	Game.tiles = [];

	var startBtn = Game.showStartBtn("img/StartLevel.png");
	startBtn.addEventListener("mousedown", function() {
		Game.stage.removeAllChildren();
		Game.initModel();
	});
};

Game.showCalender = function() {'use strict';
	Game.stage.removeAllChildren();

	//forget about the tiles used for current level
	Game.tiles = [];

	var startBtn = Game.showStartBtn("img/Calendar.png");
	startBtn.addEventListener("mousedown", function() {
		Game.showStartLevel();
	});
};

Game.showLvgRmHappy = function() {'use strict';
	Game.stage.removeAllChildren();

	//forget about the tiles used for current level
	Game.tiles = [];

	if(!Game.isJazzPlaying){
		//createjs.Sound.stop();
		createjs.Sound.play("jazzbg", {loop:-1});
		createjs.Sound.play("record", {loop:-1});
		Game.isJazzPlaying = true;
	}

	var startBtn = Game.showStartBtn("img/LvgRmHappy.png");
	startBtn.addEventListener("mousedown", function() {
		Game.showCalender();
	});
};

Game.showLvgRmSad = function() {'use strict';
	Game.stage.removeAllChildren();

	//forget about the tiles used for current level
	Game.tiles = [];

	createjs.Sound.stop();
	createjs.Sound.play("scratch");

	var startBtn = Game.showStartBtn("img/LvgRmSad.png");
	startBtn.addEventListener("mousedown", function() {
		Game.showLvgRmHappy();
	});
	//Set timer
	window.setTimeout(function() {
		Game.showLvgRmHappy();
	}, 2000);
};

Game.showStartScreen = function() {'use strict';
	Game.stage.removeAllChildren();
	//forget about the tiles used for current level
	Game.tiles = [];

	createjs.Sound.play("weWishYou");

	var startBtn = Game.showStartBtn("img/GameSign.png");
	startBtn.addEventListener("mousedown", function() {
		Game.showLvgRmSad();
	});
};

//
Game.showCatLose = function() {'use strict';

	var nextBtn = Game.showStartBtn("img/LoseCat.png");
	createjs.Sound.play("meow");
	nextBtn.addEventListener("mousedown", function() {
		Game.showLvgRmHappy();
	});
};

Game.showTimeLost = function() {'use strict';
	Game.stage.removeAllChildren();
	//forget about the tiles used for current level
	Game.tiles = [];

	var nextBtn = Game.showStartBtn("img/LoseTimer.png");
	nextBtn.addEventListener("mousedown", function() {
		Game.showLvgRmHappy();
	});
};

Game.restartLevel = function() {'use strict';
	Game.stage.removeAllChildren();
	//forget about the tiles used for current level
	Game.tiles = [];
	Game.stage.removeAllChildren();
	Game.initModel();

}; 