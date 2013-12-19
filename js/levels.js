/*global Game*/
//declare an array of levels as a Game property
/*
LEGEND


*/


Game.levels = [
    {
        minimumCows : 0,
        grid : [
        	["A0NN","E0NN","E0NN","E0NN","E0NN","E0NN","C2NN"],
			["C2RN","S0RN","C2RN","S1RN","C1RN","S1RG","E0NN"],
			["C3RN","S0RO","T2RN","S1RN","X0NN","S1RR","C2RN"],
			["S1RN","E0NN","E0NN","S0RY","C3RN","C2RN","C3RN"],
			["S1RN","E0NN","E0NN","T3RN","C1RN","C2RN","E0NN"],
			["T1RN","S1RB","S1RN","X0NN","C3RN","S0Rb","C2RN"],
			["T0RN","S1RN","S1RN","S1RG","E0NN","X0NN","C3RN"],
            ["C0RR","S0RN","C3RN","S1RN","E0NN","C0RN","C1RN"],
			["K0NN","E0NN","E0NN","C3RN","T2RN","C3RV","Z2NN"]

		]
    },
    {
    	minimumCows : 8,
    	grid : [
         	["A0NN","E0NN","E0NN","E0NN","E0NN","E0NN","C2NN"],
			["C0RN","S1RN","C2RN","S1RN","C1RN","S1RG","E0NN"],
			["C1RN","S1RO","T2RN","S1RN","X0NN","S1RR","C2RN"],
			["S0RN","E0NN","E0NN","S0NY","C0RN","C0RN","C3RN"],
			["S0RN","E0NN","E0NN","T3RN","C1RN","C2RN","E0NN"],
			["T3RN","S1RB","S1RN","X0NN","C3RN","S0Rb","C2RN"],
			["T3RN","S1RN","S1RN","S0RG","E0NN","X0NN","C3RN"],
            ["C0RR","S0RN","C3RN","S1RN","E0NN","C1RN","C1RN"],
			["K0NN","E0NN","E0NN","C0RN","T2RN","C3RV","Z2NN"]
    	]
   },
   {
    	minimumCows : 9,
    	grid : [
         	["A0NN","E0NN","E0NN","E0NN","E0NN","E0NN","C2NN"],
			["C0RN","S1RN","C2RN","S1RN","C1RN","S1RG","E0NN"],
			["C1RN","S1RO","T2RN","S1RN","X0NN","S1RR","C2RN"],
			["S0RN","E0NN","E0NN","S0NY","C0RN","C0RN","C3RN"],
			["S0RN","E0NN","E0NN","T3RN","C1RN","C2RN","E0NN"],
			["T3RN","S1RB","S1RN","X0NN","C3RN","S0Rb","C2RN"],
			["T3RN","S1RN","S1RN","S0RG","E0NN","X0NN","C3RN"],
            ["C0RR","S0RN","C3RN","S1RN","E0NN","C1RN","C1RN"],
			["K0NN","E0NN","E0NN","C0RN","T2RN","C3RV","Z2NN"]
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

