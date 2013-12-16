/*global Game, createjs, console*/
// here is the code for buttons, on-screen messages etc.
Game.showNextLevelBtn = function () {
    'use strict';
    var txt = new createjs.Text("NEXT LEVEL", "18px Gorditas", "white"),
        hitarea = new createjs.Shape(),
        border = 10,
        hitW = txt.getMeasuredWidth() + (border * 2),
        hitH = txt.getMeasuredHeight() + (border * 2),
        hitX,
        fortune = new createjs.Text("You made it back to the Spaceship!! ", "18px Gorditas", "white"),
        button = new createjs.Container(),
        hitY;
    //
    txt.x = 200;
    txt.y = 180;
    hitX = txt.x - border;
    hitY = txt.y - border;
    //
    hitarea.graphics.beginFill("#058").drawRect(hitX, hitY, hitW, hitH);
    button.addChild(hitarea);
    button.addChild(txt);
    Game.stage.addChild(button);
    Game.stage.addChild(fortune);
    Game.stage.update();
    //
    return button;
};

Game.showStartBtn = function () {
    'use strict';
    var txt = new createjs.Text("PLAY", "18px Gorditas", "white"),
        hitarea = new createjs.Shape(),
        border = 10,
        hitW = txt.getMeasuredWidth() + (border * 2),
        hitH = txt.getMeasuredHeight() + (border * 2),
        hitX,
        hitY,
        button = new createjs.Container(),
        my = new createjs.Bitmap("img/GameSign.png");
  
    //
    my.x = 10;
    my.y = 10;

    hitX = my.x - border;
    hitY = my.y - border;
    //
    hitarea.graphics.beginFill("#058").drawRect(hitX, hitY, hitW, hitH);

    button.addChild(my);
    Game.stage.addChild(button);
    Game.stage.update();
    //
    return button;
};

Game.showWinScreen = function(){
	var fortune = new createjs.Text("YOU WON!! ", "25px Gorditas", "white");
	Game.stage.addChild(fortune);
};

//
Game.showLevelOver = function () {
    'use strict';
    Game.stage.removeAllChildren();
    
    //forget about the tiles used for current level
    Game.tiles = [];
    Game.currentLevel += 1;
	
	if(Game.levels.length === Game.currentLevel){
		Game.showWinScreen();
		return;
	}
    
    var nextBtn = Game.showNextLevelBtn();
    nextBtn.addEventListener("mousedown", function () {
        Game.stage.removeAllChildren();
        Game.initModel();
    });
};

Game.showStartScreen = function () {
    'use strict';
    Game.stage.removeAllChildren();
    
    //forget about the tiles used for current level
    Game.tiles = [];
	
    
    var startBtn = Game.showStartBtn();
    startBtn.addEventListener("mousedown", function () {
        Game.stage.removeAllChildren();
        Game.initModel();
    });
};

Game.restartLevel = function () {
    'use strict';
    Game.stage.removeAllChildren();
    //forget about the tiles used for current level
    Game.tiles = [];
    Game.stage.removeAllChildren();
    Game.initModel();
    
};