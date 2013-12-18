/*global createjs, $, Game*/
// utility module for processing 2d arrays in various basic ways
Game.Grid = function (array2d) {
    "use strict";
    var my = {},
        grid = array2d; // must be regular 2d array (no error checking yet!)
    //
    // returns whether a pair of row, col coordinates are inside the grid or not
    
    my.inside = function (col, row) {
        return ((row >= 0) && (row < grid.length) && (col >= 0) && (col < grid[row].length));
    };
    //

    //
    // apply any function to all the items in the grid
    
    my.get = function(col, row){
    	if (my.inside(col,row)){
    		return grid[row][col];
    	}
    	return null;
    };
    
    my.process = function (fn) {
        var row, col, item;
        for (row = 0; row < grid.length; row += 1) {
            for (col = 0; col < grid[row].length; col += 1) {
                item = grid[row][col];
                fn(item, col, row);
            }
        }
    };
    //
    return my;
};

