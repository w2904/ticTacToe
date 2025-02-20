'use strict';

// gameboard function: creates board, updates it and reset.
import checkForGameEnd from "./winningConditions.js";
import { setActivePlayer, setGameEnd, resetActivePlayer } from "./gamestate.js";

const restartButton = document.querySelector("#game-status > button");
const displayOfGameState = document.querySelector("#game-status > p");

const originalBoard = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
const writableBoard = structuredClone(originalBoard);
const getBoard = () => writableBoard;

const updateBoard = (player, oIndex, iIndex) => {
    writableBoard[oIndex][iIndex] = player.getPlayerMarker();
    if (checkForGameEnd(getBoard())) {
        displayOfGameState.textContent = "Awaiting for the new game";
        restartButton.style.display = "inline-block";
        restartButton.addEventListener("click", resetBoard);
    }
    setActivePlayer();
}

const resetBoard = () => {
    const visualBoard = document.querySelectorAll(".cell");
    visualBoard.forEach((cell) => cell.textContent = "");
    restartButton.style.display = "none";
    for (let i = 0; i < originalBoard.length; i++){
        for (let j = 0; j < originalBoard[i].length; j++) {
            writableBoard[i][j] = originalBoard[i][j];
        }
    }
    setGameEnd();
    resetActivePlayer();
};

export { getBoard, updateBoard };