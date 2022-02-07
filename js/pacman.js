'use strict';
var gPacmanPhoto = '<img src="img/right.gif">';
var gPacman;
var gDotCollected = 0;
var gInvincible = false;

// bugs
// congrats after last move
// dead GHOST
// pacman x2 when eating GHOST

function createPacman(board) {
    gPacman = {
        location: {
            i: 10,
            j: 7
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = gPacmanPhoto;
}

function movePacman(ev) {
    if (gDotCollected >= gDotCounter) isVictory();
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCellContent === GHOSTR ||
        nextCellContent === GHOSTO ||
        nextCellContent === GHOSTP ||
        nextCellContent === GHOSTT) {
            if (!gInvincible) {
                gameOver();
                return;
            }
            else {
                updateScore(20);
            }
        };
        if (nextCellContent === FOOD) {
            gDotCollected++;
            updateScore(1);
        }
        if (nextCellContent === SUPERFOOD) {
            gDotCollected++;
            updateScore(20);
            eatenSUPERFOOD();
        }
        if (nextCellContent === CHERRY) {
            if (gBoxBeforeCherry === FOOD) {
                gDotCollected++;
                updateScore(11);
            } else if (gBoxBeforeCherry === EMPTY) { updateScore(10); }
        }
        console.log('gDotCollected', gDotCollected);
        console.log('gDotCounter', gDotCounter);
        // update the model
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
        // update the DOM
        renderCell(gPacman.location, EMPTY);
        // Move the pacman
        gPacman.location = nextLocation;
        // update the model
        gBoard[gPacman.location.i][gPacman.location.j] = gPacmanPhoto;
        // update the DOM
        renderCell(gPacman.location, gPacmanPhoto);
    }
    
    function getNextLocation(ev) {
        var nextLocation = {
            i: gPacman.location.i,
            j: gPacman.location.j
        };
        // figure out nextLocation
        switch (ev.key) {
            case 'ArrowDown':
                nextLocation.i++;
                gPacmanPhoto = '<img src="img/down.gif">';
                break;
                case 'ArrowUp':
                    nextLocation.i--;
                    gPacmanPhoto = '<img src="img/up.gif">';
                    break;
                    case 'ArrowLeft':
            (nextLocation.j === 0) ? nextLocation.j = gBoard.length - 1 : nextLocation.j--;
            gPacmanPhoto = '<img src="img/left.gif">';
            break;
        case 'ArrowRight':
            (nextLocation.j === gBoard.length - 1) ? nextLocation.j = 0 : nextLocation.j++;
            gPacmanPhoto = '<img src="img/right.gif">';
            break;
    }

    return nextLocation;
}