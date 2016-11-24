"use strict";
var w = new Worker("/src/js/worker.js");
var startWorker = function() {
    w.postMessage([9,false,false,20]);
}


var checkBox = function (board,row,col,val)  {
    var N = board.length;
    var boxMax = Math.sqrt(N);
    var boxRow = Math.floor(row/Math.sqrt(N)) * boxMax;
    var boxCol = Math.floor(col/Math.sqrt(N)) * boxMax;
    for (var i=boxRow;i<(boxRow+boxMax);i++) for (var j=boxCol;j<(boxCol+boxMax);j++) if (val == board[i][j]) return false;        
    return true;
}

var checkRow = function(board,row,val) {
    var N = board.length;
    for (var i=0; i<N; i++) if (board[row][i] == val) return false;
    return true;
}

var checkCol = function(board,col,val) {
    var N = board.length;
    for (var i=0;i<N;i++) if (board[i][col] == val) return false;
    return true;
}

var checkY = function(board,row,col,val) {
    var N = board.length;
    var mid = Math.floor((N-1)/2);
    for (var i=mid;i<N;i++) if (board[i][mid] == val) return false;
    if (col <= mid) {
        for (var i=0;i<(mid+1);i++) if (board[i][i] == val) return false; 
    }
    if (col >= mid){
        for (var i=0;i<(mid+1);i++) if (board[i][N-1-i] == val) return false;
    }
    return true;
}

var checkX = function (board,row,col,val) {
    var N = board.length;
    var mid = Math.floor(N/2);
    if (row <= mid && row == col) {
        for (var i=0;i<N;i++) if (board[i][i] == val) return false; 
    }
    if (row >= mid && row == N-1-col){
        for (var i=0;i<N;i++) if (board[i][N-1-i] == val) return false;
    }
    return true;
}

var checker = function(board,row,col,val,chkX,chkY){
    var xChk = checkX(board,row,col,val);
    var yChk = checkY(board,row,col,val);
    var chk = checkRow(board,row,val) && checkCol(board,col,val) && checkBox(board,row,col,val);
    if (chkX) chk = chk && xChk;
    if (chkY) chk = chk && yChk;
    return chk;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var generatePuzzle = function (board, difficulty) {
    for (var i=0; i<board.length; i++) {
        for (var j=0; j<board.length; j++) {
            if(getRandomInt(0, 100) < difficulty) {
                board[i][j] = 0;
            }
        }
    }
    
    return board;
}

