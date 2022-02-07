'use strict';
const GHOSTR = '<img src="img/r.gif">';
const GHOSTO = '<img src="img/o.gif">';
const GHOSTP = '<img src="img/p.gif">';
const GHOSTT = '<img src="img/t.gif">';
var GHOSTCOLORS = [GHOSTR, GHOSTO, GHOSTP, GHOSTT];

var gGhosts = [];
var gIntervalGhosts;

function createGhost(board, color) {
    var ghost = {
        location: {
            i: 7,
            j: 7
        },
        currCellContent: FOOD,
        color: color,
    };
    gGhosts.push(ghost);
    //model
    board[ghost.location.i][ghost.location.j] = color;
}

// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = [];
    for (var i = 0; i < 4; i++) {
        createGhost(board, GHOSTCOLORS[i]);
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

// loop through ghosts
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]);
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    };

    // Ghost in tunnel
    if (nextLocation.j < 0) nextLocation.j = gBoard.length - 1;
    else if (nextLocation.j > gBoard.length - 1) nextLocation.j = 0;

    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCellContent === WALL) {
        moveGhost(ghost);
        return;
    }
    if (nextCellContent === GHOSTR ||
        nextCellContent === GHOSTO ||
        nextCellContent === GHOSTP ||
        nextCellContent === GHOSTT) return;
    // hitting a pacman?  call gameOver
    if (gInvincible) {

        // setTimeout(() => {}, 4000);
    } else if (nextCellContent === gPacmanPhoto) {
        gameOver();
        return;
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost
    ghost.location = nextLocation;
    ghost.currCellContent = nextCellContent;
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = GHOSTT;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 };
    } else if (randNum < 50) {
        return { i: -1, j: 0 };
    } else if (randNum < 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

function getGhostHTML(ghost) {
    return `<span>${ghost.color}</span>`;
}