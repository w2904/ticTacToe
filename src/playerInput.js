'use strict';

// resolves event listener from index module
import { updateBoard } from "./gameboard.js";
import { getGameEnd, getActivePlayer } from "./gamestate.js";

export default function(event) {
    if (getGameEnd() === true) {
        return;
    }
    const indexes = event.target.classList;
    const player = getActivePlayer();
    event.target.textContent = player.getPlayerMarker();
    updateBoard(player, indexes[1], indexes[2] || indexes[1]);
};