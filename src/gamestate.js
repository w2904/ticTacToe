'use strict';

// sets and gets current active player and if the game finished or not.
import { player1, player2 } from "./players.js";

const displayOfGameState = document.querySelector("#game-status > p");

let activePlayer = player1;
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
};

let gameFinished = false;
const getGameEnd = () => gameFinished;
const setGameEnd = () => gameFinished = !gameFinished;

export { getActivePlayer, setActivePlayer, resetActivePlayer, getGameEnd, setGameEnd };