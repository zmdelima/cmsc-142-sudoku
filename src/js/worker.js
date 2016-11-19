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
    [0,9,0,0,8,0,0,7,0],
    [8,0,7,0,9,0,0,0,6]
];

var four = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

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
    let mid = Math.floor((N-1)/2);
    if(board.length % 2 == 0) return true;
    if(row < mid && (row != col && row != N-1-col)) return true;
    if(row >= mid && col != mid) return true;
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
    let mid = Math.floor((N-1)/2);
    if (row != col && col+row != N-1) return true;
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
    if (chkY && (board.length%2 == 1) ) chk = chk && yChk;
    return chk;
}

var viewBoard = function(board) {
    for(var i=0; i<board.length; i++) {
        console.log(board[i]);
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
        return;
    }

    var board = magic_board;
    
    if(dim == 4){
        var solutiN = solver(four,chkX,false);
        board = oneSolution( solutiN );
    }else {
        var solutiN = solver(magic_board,chkX,chkY);
        board = oneSolution( solutiN );
    }
   
    return board;
}

var solver = function(original_board,checkX,checkY){
    let N = original_board.length;
    var board = original_board.map(function(arr) {
        return arr.slice();
    });
    var count = 0;
    var mode = false;
    var x = 0;
    var y = 0;
    var startVal = 0;
    var solutions = [];
    
    while(true){
        while (x < N) {
            while (y < N) {
                startVal = 1;
                var i;
                //mode == true then backtracking
                if (mode) {
                    if (mode && x< 0) {
                        console.log("COUNT"+count);
                        // console.log(solutions[0]);
                        return solutions;
                    }
                    if (original_board[x][y] != 0 || original_board[x][y] == N) {
                        y--;
                        if (y<0) {
                            x--;
                            y = N-1;
                        }
                        continue;
                    }
                    startVal = board[x][y] + 1;
                }
                //move until empty grid cell from orignal board
                if (original_board[x][y] !=0) {
                    y++;
                    continue;
                }
                
                //iterate possible values
                for(i=startVal; i<N+1; i++){
                    if (checker(board,x,y,i,checkX,checkY)) {
                        mode = false;
                        board[x][y] = i;
                        break;
                    }
                }
                
                if(i == N+1){
                    mode = true;
                    board[x][y] = 0;
                    y--;
                    if (y<0) {
                        x--;
                        y = N-1;
                    }
                    continue;
                }
                y++;
            }
            y=0;
            x++;
        }
        //save board here
        var solved = board.map(function(arr) {
            return arr.slice();
        });
        solutions.push(solved);
        //backtrack from solution point
        mode = true;
        count++;
        x--;
        y=N-1;
        continue;
    }   
}


var oneSolution = function(solutions){
    return solutions[Math.floor(Math.random() * solutions.length)];
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
    
    // postMessage( generatePuzzle(temp, e.data[3]) );
    postMessage(temp);
}