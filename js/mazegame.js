/*global createjs, $*/
// The main settings for the game here:
var Game = {
    stage : new createjs.Stage($("#stage")),
    gridSize : 50,
    imgResSrcs : {
        "straight": "img/straight.png",
        "cross" : "img/cross.png",
        "corner" : "img/corner.png",
        "plug" : "img/plug.png",
        "tcord" : "img/tcord.png",
        "kitty" : "img/catSleep.png",
        "empty": "img/straight.png"
    },
    // to avoid redundancy, we refer to property identifiers in imgResSrcs here
    tileSrcs : ["straight", "cross", "tcord", "corner", "plug", "kitty", "empty"],
    tileKeys : {
    	"S" : "straight",
    	"X" : "cross",
    	"T" : "tcord",
    	"C" : "corner",
    	"P" : "plug",
    	"K" : "kitty",
    	"E" : "empty"
    },

    levelIsWon : false,
    offsetX : 10,
    offsetY : 10,
    currentLevel : 0,
    minimumCows : 1,
    cowsCollected : 0,
    
    // music
    //weWishYou : createjs.Sound.registerSound("sound/wewishyou.mp3", "weWishYou", 1),
    //door : createjs.Sound.registerSound("sound/door.mp3", "door", 1),
    //jazzbg : createjs.Sound.registerSound("sound/jazzbg.mp3", "jazzbg", 1),
    tile : createjs.Sound.registerSound("sound/tile.mp3", "tile", 1), 
    buzz : createjs.Sound.registerSound("sound/buzz.mp3", "buzz", 1),
    //timer : createjs.Sound.registerSound("sound/timer.mp3", "timer", 1), 
    //meow : createjs.Sound.registerSound("sound/meow.mp3", "meow", 1),
    //purr : createjs.Sound.registerSound("sound/purr.mp3", "purr", 1),
    //winLevel : createjs.Sound.registerSound("sound/winLevel.mp3", "winLevel", 1),
    loseLevel : createjs.Sound.registerSound("sound/loseLevel.mp3", "loseLevel", 1)
};


//
// this is called ONCE at start of game
Game.init = function () {
    'use strict';
    createjs.Ticker.addEventListener("tick", Game.stage);
    //Game.initModel();
    Game.setupInput();
	Game.showStartScreen();
};


//
// this is called at start of each level
Game.initModel = function () {
    'use strict';
    var theMap = Game.Grid(Game.levels.getMap()), // make a wrapped grid of tile codes
        
        tiles = [], // will be used to create a grid object containing all the tiles
        
        type, tile, tname, tBitmap, tkey, rkey, tRotation, tCanRotate;
    
    //
    // get the minimum cows for this level
    //Game.minimumCows = Game.levels.getMinimumCows();
	//Game.cowsCollected = 0;
    
    // convert 2d array of tile codes into a 2d array of tile objects...
    
    theMap.process(function (tileCode, col, row) {
        //
        if (col >= tiles.length) {
            tiles.push([]); // make a new column
        }

        
        if (typeof tileCode === "string") {    	
        	tkey = tileCode.charAt(0); // xmas lights
        	/*
        	rkey = tileCode.charAt(2);
        	if (rkey === "R"){ // rotatable
        		Game.darkCrops.push(new Game.darkCrop(col,row));
        	}*/
        	
        	tname = Game.tileKeys[tkey];
        	type = tname; //Game.imgResSrcs[tname];
        	
        	if (tileCode.length > 1) {
        		tRotation = parseInt(tileCode.charAt(1),10);
        		tCanRotate = tileCode.charAt(2);
        	}
        	
        } 
        
        // now make the tile
        tile = new Game.MazeTile(col, row, type, tRotation, tCanRotate);
        
        // store the tile in our 2d array of tiles and add it to the stage
        tiles[row][col] = tile;
        Game.stage.addChild(tile);
        
    });
    
    Game.tiles = Game.Grid(tiles); // wrap the tiles array up as a 'grid' object
    // finally, now that all tiles are drawn, add the objects on top
    
};


//
// update all tiles, check if game is won(REDO WIN STATE), then update the stage

Game.update = function () {
    'use strict';
    Game.tiles.process(function (tile) {
        tile.update();
    });
    
    if (Game.levelIsWon) {
        window.setTimeout(function(){
        	Game.showLevelOver();
        	Game.levelIsWon = false;
        },100);
        Game.levelIsWon = false;
    }
};

//
// handle player's attempt to move


// 
// preloading can't be avoided. Get it out of the way, with the option to run immediately
Game.preloadAssets = function (runImmediatelyAfterwards) {
    'use strict';
    var assetKey, asset, assetList = [];
    //create a LoadQueue object
    Game.preloader = new createjs.LoadQueue(false);
    if (runImmediatelyAfterwards) {
        //add an event to be dispatched when loading is completed
        Game.preloader.addEventListener("complete", Game.init);
    }
    //indicate an array of image files to preload
    for (assetKey in Game.imgResSrcs) {
        if (Game.imgResSrcs.hasOwnProperty(assetKey)) {
            asset = Game.imgResSrcs[assetKey];
            assetList.push(asset);
        }
    }
    Game.preloader.loadManifest(assetList);
};
//
//
Game.preloadAssets(true); // we start here



