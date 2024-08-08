

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
        console.log(`${getCurrentPlayer().name}\'s turn.`);
    }


    const playRound = (row, column) => {
        let checkWin = false;
        if (board.getCellMark(row, column) != '') {
            console.log('This square is already marked. Please try again.');
        }
        else {
            board.markSpot(row, column, getCurrentPlayer().mark);
        }

            // //Check win
            // const checkPlayerWin = () => {
            //     //Horizontal Win
            //     for (let i = 0; i < 3; i++) {
            //         firstCell = board.getCellMark(i, 0)
            //         secondCell = board.getCellMark(i, 1)
            //         thirdCell = board.getCellMark(i, 2)
            //         if (firstCell != '' && firstCell === secondCell && 
            //             secondCell === thirdCell) {
            //                 console.log(`${currentPlayer.name} wins`);
            //                 return true;
            //         }
            //     }

            //     // //Vertical Win
            //     for (let i = 0; i < 3; i++) {
            //         firstCell = board.getCellMark(0, i)
            //         secondCell = board.getCellMark(1, i)
            //         thirdCell = board.getCellMark(2, i)
            //         if (firstCell != '' && firstCell === secondCell && 
            //             secondCell === thirdCell) {
            //                 console.log(`${currentPlayer.name} wins`);
            //                 return true;
            //         }
            //     }
            //     // //Diagnol Win
            //     if (board.getCellMark(0,0) != "") {
            //         if (board.getCellMark(0,0) === board.getCellMark(1,1) && 
            //            board.getCellMark(0,0) === board.getCellMark(2,2)) {
            //                 console.log(`${currentPlayer.name} wins`);
            //                 return true;
            //         }
            //     }
                                
            //     if (board.getCellMark(0,2) != "") {
            //         if (board.getCellMark(0,2) === board.getCellMark(1,1) && 
            //            board.getCellMark(1,1) === board.getCellMark(2,0)) {
            //                 console.log(`${currentPlayer.name} wins`);
            //                 return true;
            //         }
            //     }
            // }



            switchPlayer();
            printNewTurn();
        }

    const checkPlayerWin = () => {
            //Horizontal Win
            for (let i = 0; i < 3; i++) {
                firstCell = board.getCellMark(i, 0)
                secondCell = board.getCellMark(i, 1)
                thirdCell = board.getCellMark(i, 2)
                if (firstCell != '' && firstCell === secondCell && 
                    secondCell === thirdCell) {
                        console.log(`${currentPlayer.name} wins`);
                        return true;
                    }
                }

            // //Vertical Win
            for (let i = 0; i < 3; i++) {
                firstCell = board.getCellMark(0, i)
                secondCell = board.getCellMark(1, i)
                thirdCell = board.getCellMark(2, i)
                if (firstCell != '' && firstCell === secondCell && 
                    secondCell === thirdCell) {
                        console.log(`${currentPlayer.name} wins`);
                        return true;
                }
            }
            // //Diagnol Win
            if (board.getCellMark(0,0) != "") {
                if (board.getCellMark(0,0) === board.getCellMark(1,1) && 
                   board.getCellMark(0,0) === board.getCellMark(2,2)) {
                        console.log(`${currentPlayer.name} wins`);
                        return true;
                }
            }
                            
            if (board.getCellMark(0,2) != "") {
                if (board.getCellMark(0,2) === board.getCellMark(1,1) && 
                   board.getCellMark(1,1) === board.getCellMark(2,0)) {
                        console.log(`${currentPlayer.name} wins`);
                        return true;
                }
            }
    }

    printNewTurn();

    return {
        playRound,
        getCurrentPlayer,
        getBoard: board.getBoard,
        checkPlayerWin
    };
}


function ScreenController() {
    const game = GameController();
    const currentPlayerDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    let previousPlayer = "";
    const updateScreen = () => {
        boardDiv.textContent = '';
        const board = game.getBoard();
        const activePlayer = game.getCurrentPlayer();
        const win = game.checkPlayerWin();
        console.log(win)
        if (win === true) {
            currentPlayerDiv.textContent = `${previousPlayer.name} Wins!`;
        }
        else {
            currentPlayerDiv.textContent = `${activePlayer.name}\'s turn...`;
        }


        board.forEach((row, rindex) => {
            row.forEach((cell, cindex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add('cell');

                cellButton.dataset.column = cindex;
                cellButton.dataset.row = rindex;
                cellButton.textContent = cell.getMark();
                boardDiv.appendChild(cellButton);
            })
        })
        previousPlayer = activePlayer;
    }

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if (!selectedColumn) return;
        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();
}

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", function() {
    ScreenController()});
