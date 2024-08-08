

//Create the gameboard to hold state of game
function gameBoard () {
    const rows = 3;
    const columns = 3;
    const board = [];


    //Create 2d array to represent the state of the game
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const markSpot = (row, column, player) => {
        board[row][column].addMark(player);
    }

    const getCellMark = function (row, column) {
        return board[row][column].getMark();
    }

    const printBoard = () => {
        const currentBoard = board.map((row) => row.map((cell) => cell.getMark()));
        console.log(currentBoard);
    }

    return {getBoard, markSpot, printBoard, getCellMark};
}



function cell() {
    let currentMark = '';

    const addMark = (player) => {
        currentMark = player;
    }

    const getMark = () => currentMark;

    return {addMark, getMark};
}

function GameController (    
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = gameBoard();

    const players = [
        {
            name: playerOneName,
            mark: "X"
        },
        {
            name: playerTwoName,
            mark: "O"
        }
    ];

    let currentPlayer = players[0];

    const switchPlayer = () => {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        }
        else {
            currentPlayer = players[0];
        }
    }

    const getCurrentPlayer = () => currentPlayer;

    const printNewTurn = () => {
        board.printBoard();
        console.log('${getCurrentPlayer().name}\'s turn.');
    }


    const playRound = (row, column) => {
        if (board.getCellMark(row, column) != '') {
            console.log('This square is already marked. Please try again.');
        }
        else {
            board.markSpot (row, column, getCurrentPlayer().mark);
        
            switchPlayer();
            printNewTurn();
        }
    }

    printNewTurn();

    return {
        playRound,
        getCurrentPlayer
    };
}

const game = GameController();