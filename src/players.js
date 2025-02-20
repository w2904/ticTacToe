'use strict';

// Constructor for player creation

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
};

const player1 = createPlayer("player1", "X", ".score.player1");
const player2 = createPlayer("player2", "O", ".score.player2");

export { player1, player2 };