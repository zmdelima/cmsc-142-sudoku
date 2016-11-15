"use strict";
let w = new Worker("/src/js/worker.js");
let startWorker = function() {
    w.postMessage([9,false,false,20]);
}

var checkBox = function (board,row,col,val)  {
    let N = board.length;
    let boxMax = Math.sqrt(N);
    let boxRow = Math.floor(row/Math.sqrt(N)) * boxMax;
    let boxCol = Math.floor(col/Math.sqrt(N)) * boxMax;
    for (let i=boxRow;i<(boxRow+boxMax);i++) for (let j=boxCol;j<(boxCol+boxMax);j++) if (val == board[i][j]) return false;        
    return true;
}

var checkRow = function(board,row,val) {
    let N = board.length;
    for (let i=0; i<N; i++) if (board[row][i] == val) return false;
    return true;
}

var checkCol = function(board,col,val) {
    let N = board.length;
    for (let i=0;i<N;i++) if (board[i][col] == val) return false;
    return true;
}

var checkY = function(board,row,col,val) {
    let N = board.length;
    let mid = Math.floor( (N-1) /2);
    for (let i=mid;i<N;i++) if (board[i][mid] == val) return false;
    if (col <= mid) {
        for (let i=0;i<(mid+1);i++) if (board[i][i] == val) return false; 
    }
    if (col >= mid){
        for (let i=0;i<(mid+1);i++) if (board[i][N-1-i] == val) return false;
    }
    return true;
}

var checkX = function (board,row,col,val) {
    let N = board.length;
    let mid = Math.floor(N/2);
    if (row <= mid && row == col) {
        for (let i=0;i<N;i++) if (board[i][i] == val) return false; 
    }
    if (row >= mid && row == N-1-col){
        for (let i=0;i<N;i++) if (board[i][N-1-i] == val) return false;
    }
    return true;
}

var checker = function(board,row,col,val,chkX,chkY){
    let xChk = checkX(board,row,col,val);
    let yChk = checkY(board,row,col,val);
    let chk = checkRow(board,row,val) && checkCol(board,col,val) && checkBox(board,row,col,val);
    if (chkX) chk = chk && xChk;
    if (chkY) chk = chk && yChk;
    return chk;
}

