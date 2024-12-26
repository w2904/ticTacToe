const gameBoard = (function() {
    const originalBoard = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
    const writableBoard = structuredClone(originalBoard);
    const updateBoard = (player, oIndex, iIndex) => {
        writableBoard[oIndex][iIndex] = player.marker;
        if (checkForGameEnd()) {
            resetBoard();
        }
        gameState.setActivePlayer();
        getPlayerMove();
    }
    const getBoard = () => writableBoard;
    const resetBoard = () => {
        for (let i = 0; i < originalBoard.length; i++){
            for (let j = 0; j < originalBoard[i].length; j++) {
                writableBoard[i][j] = originalBoard[i][j];
            }
        }
        gameState.resetRound();
        gameState.resetActivePlayer();
    }
    return {updateBoard, getBoard};
})();

function createPlayer(playerName, mark) {
    const name = playerName;
    const marker = mark;
    let points = 0;
    const addPoint = () => points++;
    const getPoints = () => points;
    return {name, marker, addPoint, getPoints};
}

const player1 = createPlayer("Jane", "X");
const player2 = createPlayer("John", "O");

const gameState = (function() {
    let round = 0;
    const resetRound = () => round = 0;
    let activePlayer = player1;
    const getActivePlayer = () => activePlayer;
    const setActivePlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
        if (activePlayer === player1) {
            round++;
        }
    };
    const resetActivePlayer = () => activePlayer = player1;
    return {resetRound, getActivePlayer, setActivePlayer, resetActivePlayer};
})();

function getPlayerMove() {
    const player = gameState.getActivePlayer();
    const gameboard = gameBoard.getBoard();
    while (true) {
        const playerInput = prompt("Input a move: ");
        if (playerInput === null) {
            return null;
        }
        let indexes = [];
        // oIndex - outer index, iIndex - inner index;
        const moveValidity = gameboard.some((innerArray, oIndex) => innerArray.some((cellValue, iIndex) => {
            if (cellValue === playerInput) {
                indexes = [oIndex, iIndex];
                return true;
            }
        }));
        if (moveValidity) {
            gameBoard.updateBoard(player, indexes[0], indexes[1]);
            break;
        }
        else {
            alert("This move is not legal, try again.");
        }
    }
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
        if (pattern.every(([row, col]) => gameboard[row][col] === player.marker)) {
            alert(player.name + " has won!")
            player.addPoint();
            return true;
        }
    }
    const isDraw = gameboard.every(row => 
        row.every(col => col === player1.marker || col === player2.marker)
    );
    if (isDraw) {
        alert("Draw!");
        return true;
    }
}

getPlayerMove();