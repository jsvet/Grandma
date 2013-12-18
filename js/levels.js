/*global Game*/
//declare an array of levels as a Game property
/*
LEGEND


*/


Game.levels = [
    {
        minimumCows : 0,
        grid : [
        	["A0NN","S0NN","S0NN","S0NN","S0NN","S0NN","E0NN"],
			["C0RN","S1RN","C2RR","S2RN","S2RN","S0NN","X2RN"],
			["T3NN","S2RN","T2RN","C2RN","S2RN","S2RN","S2RN"],
			["X3NN","X2RV","S3RN","X2RN","T2RN","X2RN","X2RN"],
			["S3RN","T2RN","S3RN","S2RG","C2RN","T2RN","C2RN"],
			["S0RN","S1RB","S1RN","S1RN","S1RN","S1RN","S2RN"],
			["S0RN","S1RB","S1RN","S1RN","S1RN","S1RN","S2RN"],
			["K0NN","S1NN","S1NN","S1NN","S1NN","S1NN","Z2NN"]

		]
    },
    {
    	minimumCows : 8,
    	grid : [
    	    ["A0NN","S0NN","S0NN","S0NN","S0NN","S0NN","E0NN"],
			["C0RN","S1RN","C2RR","S2RN","S2RN","S0NN","X2RN"],
			["T3NN","S2RN","T2RN","C2RN","S2RN","S2RN","S2RN"],
			["X3NN","X2RV","S3RN","X2RN","T2RN","X2RN","X2RN"],
			["S3RN","T2RN","S3RN","S2RG","C2RN","T2RN","C2RN"],
			["S0RN","S1RB","S1RN","S1RN","S1RN","S1RN","S2RN"],
			["S0RN","S1RB","S1RN","S1RN","S1RN","S1RN","S2RN"],
			["K0NN","S1NN","S1NN","S1NN","S1NN","S1NN","Z2NN"]
    	]
   },
   {
    	minimumCows : 9,
    	grid : [
        	["A0NN","S0NN","S0NN","S0NN","S0NN","S0NN","E0NN"],
			["C0RN","S1RN","C2RR","S2RN","S2RN","S0NN","X2RN"],
			["T3NN","S2RN","T2RN","C2RN","S2RN","S2RN","S2RN"],
			["X3NN","X2RV","S3RN","X2RN","T2RN","X2RN","X2RN"],
			["S3RN","T2RN","S3RN","S2RG","C2RN","T2RN","C2RN"],
			["S0RN","S1RB","S1RN","S1RN","S1RN","S1RN","S2RN"],
			["S0RN","S1RB","S1RN","S1RN","S1RN","S1RN","S2RN"],
			["K0NN","S1NN","S1NN","S1NN","S1NN","S1NN","Z2NN"]
    	]
   }
];
// return the current map of tile codes, unless another level index is specified
Game.levels.getMap = function (lev) {
    "use strict";
    lev = lev || Game.currentLevel;
    return this[lev].grid;
};


Game.levels.getMinimumCows = function (lev) {
    "use strict";
    lev = lev || Game.currentLevel;
    return this[lev].minimumCows;
};

