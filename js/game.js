'use strict';
const WALL = '<div class="wall"></div>';
const FOOD = '.';
const EMPTY = ' ';
const SUPERFOOD = '◻️ ';
const CHERRY = '🍒';
// 🟦
var gBoard;
var gDotCounter = -1;
var gIntervalCherry;
var gBoxBeforeCherry;

var gGame = {
    score: 0,
    isOn: false
};

function init() {
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    randomCherry();
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 15;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1) {
                board[i][j] = WALL;
            } else { gDotCounter++; }
        }
    }

    // INSIDE WALLS
    {
    board[1][7] = WALL;
    board[2][2] = WALL;
    board[2][4] = WALL;
    board[2][5] = WALL;
    board[2][7] = WALL;
    board[2][9] = WALL;
    board[2][10] = WALL;
    board[2][12] = WALL;
    board[3][2] = WALL;
    board[3][7] = WALL;
    board[3][12] = WALL;
    board[4][2] = WALL;
    board[4][4] = WALL;
    board[4][5] = WALL;
    board[4][7] = WALL;
    board[4][9] = WALL;
    board[4][10] = WALL;
    board[4][12] = WALL;
    board[5][7] = WALL;
    board[6][3] = WALL;
    board[6][4] = WALL;
    board[6][5] = WALL;
    board[6][9] = WALL;
    board[6][10] = WALL;
    board[6][11] = WALL;
    board[7][1] = WALL;
    board[7][5] = WALL;
    board[7][6] = WALL;
    board[7][8] = WALL;
    board[7][9] = WALL;
    board[7][13] = WALL;
    board[8][0] = FOOD;
    board[8][14] = FOOD;
    board[8][3] = WALL;
    board[8][11] = WALL;
    board[9][1] = WALL;
    board[9][3] = WALL;
    board[9][4] = WALL;
    board[9][6] = WALL;
    board[9][7] = WALL;
    board[9][8] = WALL;
    board[9][10] = WALL;
    board[9][11] = WALL;
    board[9][13] = WALL;
    board[11][2] = WALL;
    board[11][3] = WALL;
    board[11][5] = WALL;
    board[11][6] = WALL;
    board[11][8] = WALL;
    board[11][9] = WALL;
    board[11][11] = WALL;
    board[11][12] = WALL;
    board[12][2] = WALL;
    board[12][6] = WALL;
    board[12][8] = WALL;
    board[12][12] = WALL;
    board[13][4] = WALL;
    board[13][10] = WALL;
    }

    gDotCounter -= 54;
    // SUPERFOOD
    board[1][1] = SUPERFOOD;
    board[SIZE - 2][1] = SUPERFOOD;
    board[1][SIZE - 2] = SUPERFOOD;
    board[SIZE - 2][SIZE - 2] = SUPERFOOD;

    return board;
}

// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

// TODO
function gameOver() {
    clearInterval(gIntervalCherry);
    var elRestartButton = document.querySelector('button');
    elRestartButton.style.display = 'block';
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    gPacmanPhoto='<img src="img/dead.gif">'
    alert('Game Over');
}

function restartClick() {
    gGame.score = 0;
    gDotCounter = -1;
    updateScore(0);
    init();
    var elRestartButton = document.querySelector('button');
    elRestartButton.style.display = 'none';
    gDotCollected = 0;
}

function isVictory() {
    var elRestartButton = document.querySelector('button');
    clearInterval(gIntervalCherry);
    elRestartButton.style.display = 'block';
    alert('congratulations');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
}

function eatenSUPERFOOD() {

    for (var i = 0; i < 4; i++) {
        gGhosts[i].color = '<img src="img/d.gif">';
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
    }
    gInvincible = true;
    setTimeout(() => {
        for (var i = 0; i < 4; i++) {
            gGhosts[i].color = GHOSTCOLORS[i];
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
            gInvincible = false;
        }
    }, 5000);

}

function randomCherry() {

    gIntervalCherry = setInterval(function () {
        var ranRow = getRandomInt(1, gBoard.length - 2);
        var ranCol = getRandomInt(1, gBoard.length - 2);
        gBoxBeforeCherry = gBoard[ranRow][ranCol];
        if ((gBoard[ranRow][ranCol] === FOOD) || (gBoard[ranRow][ranCol] === EMPTY)) {
            gBoard[ranRow][ranCol] = CHERRY;
            renderCell({ i: ranRow, j: ranCol }, CHERRY);
            setTimeout(() => {
                if (gBoard[ranRow][ranCol] === CHERRY) {
                    if (gBoxBeforeCherry === FOOD) {
                        gBoard[ranRow][ranCol] = FOOD;
                        renderCell({ i: ranRow, j: ranCol }, FOOD);
                    } else if (gBoxBeforeCherry === EMPTY) {
                        gBoard[ranRow][ranCol] = EMPTY;
                        renderCell({ i: ranRow, j: ranCol }, EMPTY);
                    }
                }
            }, 4000);
        }
    }, 6000);
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
