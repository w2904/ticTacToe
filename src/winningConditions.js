'use strict';

// checks for the winning conditions
import { getActivePlayer, setGameEnd } from "./gamestate.js";
import { player1, player2 } from "./players.js";

export default function checkForGameEnd(gameboard) {
    const player = getActivePlayer();
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
            setGameEnd();
            return true;
        }
    }
    const isDraw = gameboard.every(row => 
        row.every(col => col === player1.getPlayerMarker() || col === player2.getPlayerMarker())
    );
    if (isDraw) {
        alert("Draw!");
        setGameEnd();
        return true;
    }
};