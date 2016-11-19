"use strict";
var original_board = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

var magic_board = [
    [1,0,0,0,2,0,0,0,4],
    [0,2,0,0,0,8,0,1,0],
    [0,0,3,0,4,0,2,0,0],
    [0,0,0,4,0,3,0,0,0],
    [0,1,0,0,5,0,0,4,0],
    [0,0,0,7,6,9,0,0,0],
    [0,0,6,0,7,0,8,0,0],
    [0,3,0,0,8,0,0,7,0],
    [8,0,7,0,9,0,0,0,6],
];

var four = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ];

var checkBox = function (board,row,col,val)  {
    var N = board.length;
    var boxMax = Math.sqrt(N);
    var boxRow = Math.floor(row/Math.sqrt(N)) * boxMax;
    var boxCol = Math.floor(col/Math.sqrt(N)) * boxMax;
    for (var i=boxRow;i<(boxRow+boxMax);i++){
        for (var j=boxCol;j<(boxCol+boxMax);j++){
            if (val == board[i][j]){
                return false;        
            }
        }
    }
    return true;
}

var checkRow = function(board,row,val) {
    var N = board.length;
    for (var i=0; i<N; i++){
        if (board[row][i] == val){
            return false;
        }
    }
    return true;
}

var checkCol = function(board,col,val) {
    var N = board.length;
    for (var i=0;i<N;i++){
        if (board[i][col] == val){
            return false;
        }
    }
    return true;
}

var checkY = function(board,row,col,val) {
    var N = board.length;
    var mid = Math.floor((N-1)/2);
    for (var i=mid;i<N;i++) if (board[i][mid] == val) return false;
    if (col <= mid) {
        for (var i=0;i<(mid+1);i++){
            if (board[i][i] == val){
                return false; 
            }
        }
    }
    if (col >= mid){
        for (var i=0;i<(mid+1);i++){
            if (board[i][N-1-i] == val){
                return false;
            }
        }
    }
    return true;
}

var checkX = function (board,row,col,val) {
    var N = board.length;
    var mid = Math.floor(N/2);
    if (row <= mid && row == col) {
        for (var i=0;i<N;i++){
            if (board[i][i] == val){
                return false; 
            }
        }
    }
    if (row >= mid && row == N-1-col){
        for (var i=0;i<N;i++){
            if (board[i][N-1-i] == val){
                return false;
            }
        }
    }
    return true;
}

var checker = function(board,row,col,val,chkX,chkY){
    var chk = checkRow(board,row,val) && checkCol(board,col,val) && checkBox(board,row,col,val);
    if (chkX){
        chk = chk && checkX(board,row,col,val);
    }
    if (chkY){
        chk = chk && checkY(board,row,col,val);
    }
    return chk;
}

var viewBoard = function(board) {
    for(var i=0; i<board.length; i++) {
        // console.log(board[i]);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRange(dim) {
    var x = new Array(dim);
    var current;
    for (var i=0; i<dim; i++) {
        do {
            current = getRandomInt(1, dim+1);
        } while (x.indexOf(current) != -1);
        
        x[i] = current;
    }
    
    return x;
}

var generateBoard = function(dim, chkX, chkY) {
    
    if (Math.sqrt(dim) % 1 != 0) {
        // console.log("Entered dimension is not a perfect square.");
        return;
    }

    var board = new Array(dim);
    for (var i=0; i<dim; i++) {
        board[i] = new Array(dim);
    }
    
    for (var i=0; i<dim; i++) {
        for (var j=0; j<dim; j++) {
            board[i][j] = 0;
        }
    }
    
    var X = 0;
    var Y = 0;
    var selection = generateRange(dim);
    
    //Generate random board
    while(true) {
        for(var i=0; i<dim; i++) {
            if(checker(board, X, Y, selection[i], chkX, chkY) && board.indexOf(selection[i]) == -1) {
                if (board[X][Y] == 0) board[X][Y] = selection[i];
                Y++;
                break;
            }
            //If the iteration reaches the end but no eligible number can be placed
            //Backtrack
            if (i == dim-1) {
                do {
                    if (Y != 0) {
                        Y--;
                    } else {
                        X--;
                        Y = dim-1;
                        if (X < 0) {
                            X = 0;
                            Y = 0;
                            selection = generateRange(dim);
                            break;
                        }
                    }
                    //Reset i to the index of the previous position's current value
                    // console.log("Currently at position "+X+","+Y);
                    // console.log(selection);
                    // console.log(selection.indexOf(board[X][Y]))
                    i = selection.indexOf(board[X][Y]);
                    board[X][Y]=0;
                } while(i == selection.length-1);    
            }
        }
        
        // viewBoard(board);
        // console.log("----");
        
        if (Y == dim) {
            X++;
            Y=0;
        }
        
        if (X == dim){
            break;
        }
    }
    return board;
}

var generatePuzzle = function (board, difficulty) {
    for (var i=0; i<board.length; i++) {
        for (var j=0; j<board.length; j++) {
            if(getRandomInt(0, 100) < difficulty) {
                board[i][j] = 0;
            }
        }
    }
    
    // viewBoard(board);
    return board;
}

onmessage = function(e) {
    // console.log("received "+e.data[0]);
    var temp = generateBoard(e.data[0], e.data[1], e.data[2]);
    // console.log(temp);
    
    postMessage( generatePuzzle(temp, e.data[3]) );
    // postMessage(temp);
}

// generatePuzzle(generateBoard(9, false,false), 20);

// generateBoard(9, false, false);

// generateBoard(4);


