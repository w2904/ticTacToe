'use strict';

const gameBoard = (function() {
    const originalBoard = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
    const writableBoard = structuredClone(originalBoard);
    const updateBoard = (player, oIndex, iIndex) => {
        writableBoard[oIndex][iIndex] = player.getPlayerMarker();
        if (checkForGameEnd()) {
            displayOfGameState.textContent = "Awaiting for the new game";
            restartButton.style.display = "inline-block";
            restartButton.addEventListener("click", resetBoard);
        }
        gameState.setActivePlayer();
    }
    const getBoard = () => writableBoard;
    const resetBoard = () => {
        const visualBoard = document.querySelectorAll(".cell");
        visualBoard.forEach((cell) => cell.textContent = "");
        restartButton.style.display = "none";
        for (let i = 0; i < originalBoard.length; i++){
            for (let j = 0; j < originalBoard[i].length; j++) {
                writableBoard[i][j] = originalBoard[i][j];
            }
        }
        gameState.setGameEnd();
        gameState.resetActivePlayer();
    }
    return {updateBoard, getBoard};
})();

function createPlayer(playerName, mark, className) {
    const name = playerName;
    const marker = mark;
    const playerScore = document.querySelector("" + className);
    let points = 0;
    const getPlayerName = () => name;
    const getPlayerMarker = () => marker;
    const addPoint = () => points++;
    const getPoints = () => points;
    const displayPlayerScore = () => playerScore.textContent = getPoints();
    return {getPlayerName, getPlayerMarker, addPoint, getPoints, displayPlayerScore};
}

const player1 = createPlayer("player1", "X", ".score.player1");
const player2 = createPlayer("player2", "O", ".score.player2");

const gameState = (function() {
    let gameFinished = false;
    let activePlayer = player1;
    const getGameEnd = () => gameFinished;
    const setGameEnd = () => gameFinished = !gameFinished;
    const getActivePlayer = () => activePlayer;
    const setActivePlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
        if (gameFinished === false) {
            displayOfGameState.textContent = "Current marker to be placed: " + activePlayer.getPlayerMarker();
        }
        else {
            displayOfGameState.textContent = "The game has ended!";
        }
    };
    const resetActivePlayer = () => {
        activePlayer = player1;
        displayOfGameState.textContent = "Current marker to be placed: " + activePlayer.getPlayerMarker();
    }
    return {getGameEnd, setGameEnd, getActivePlayer, setActivePlayer, resetActivePlayer};
})();

function getPlayerMove(event) {
    if (gameState.getGameEnd() === true) {
        return;
    }
    const indexes = event.target.classList;
    const player = gameState.getActivePlayer();
    event.target.textContent = player.getPlayerMarker();
    gameBoard.updateBoard(player, indexes[1], indexes[2] || indexes[1]);
}

function checkForGameEnd() {
    const player = gameState.getActivePlayer();
    const gameboard = gameBoard.getBoard();
    const conditions = [
        // Horizontal
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],

        // Vertical
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],

        // Diagonal
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];
    for (const pattern of conditions) {
        if (pattern.every(([row, col]) => gameboard[row][col] === player.getPlayerMarker())) {
            alert(player.getPlayerName() + " has won!");
            player.addPoint();
            player.displayPlayerScore();
            gameState.setGameEnd();
            return true;
        }
    }
    const isDraw = gameboard.every(row => 
        row.every(col => col === player1.getPlayerMarker() || col === player2.getPlayerMarker())
    );
    if (isDraw) {
        alert("Draw!");
        gameState.setGameEnd();
        return true;
    }
}

const field = document.querySelector("#playing-field");
const displayOfGameState = document.querySelector("#game-status > p");
const restartButton = document.querySelector("#game-status > button");

field.addEventListener("click", getPlayerMove);