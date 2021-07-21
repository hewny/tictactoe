const gameController = (() => {
    var gameOn = false

    const checkGameOn = () => {
        return gameOn
    }
    const startGame = () => {
        gameOn = true;
        displayController.hideStart();
        displayController.updateMessage();
        gameBoard.getGamePiece();
    }
    const endGame = () => {
        gameOn = false;
        displayController.showPlayAgain();
    }
    const resetGame = () => {
        gameBoard.resetBoard();
        players.resetSettings();
        displayController.removeSelectedAll();
        displayController.hidePlayAgain;
    }

    return {checkGameOn, startGame, endGame, resetGame}
})();

const gameBoard = (() => {
    const boardContainer = document.querySelector('.board-container');
    const boardCells = document.querySelectorAll('.board-cell');
    
    boardCells.forEach(cell => {
        cell.addEventListener('click', () => {
            gameBoard.drawPiece(cell)
        }, false);
    });

    var currentPlayer = "Player One"
    var currentPiece = "X"
    var tieStatus = false

    const _alternatePiece = () => {
        if (currentPiece === "X") {
            currentPiece = "O"
        } else {
            currentPiece = "X"
        }
    }

    const _alternatePlayer = () => {
        if (currentPlayer === "Player One") {
            currentPlayer = "Player Two"
        }
        else {
            currentPlayer = "Player One"
        }
    }

    const _addCellHighlight = (myArray) => {
        myArray.forEach(item => {
            boardCells[item].classList.add('selected')
        })
    }

    const resetBoard = () => {
        boardCells.forEach(cell => {
            cell.textContent = "";
        })
        removeCellHighlight();
        tieStatus = false;
    };

    const drawPiece = (cell) => {
        if (gameController.checkGameOn()) {
            if (boardCells[cell.id].textContent === "") {
                boardCells[cell.id].textContent = currentPiece;
                checkWinner()
                _alternatePlayer()
                _alternatePiece()
                displayController.updateMessage()
            }
        }
    };

    const checkWinner = () => {
        var boardArray = [];
        boardCells.forEach(cell => {
            boardArray.push(cell.textContent)
        })
        if (boardArray[0] === boardArray[1] && boardArray[0] === boardArray[2] && boardArray[2] !== "") {
            gameController.endGame()
            _addCellHighlight([0,1,2])
        }
        else if (boardArray[3] === boardArray[4] && boardArray[3] === boardArray[5] && boardArray[5] !== "") {
            gameController.endGame()
            _addCellHighlight([3,4,5])
        }
        else if (boardArray[6] === boardArray[7] && boardArray[6] === boardArray[8] && boardArray[8] !== "") {
            gameController.endGame()
            _addCellHighlight([6,7,8])
        }
        else if (boardArray[0] === boardArray[3] && boardArray[0] === boardArray[6] && boardArray[6] !== "") {
            gameController.endGame()
            _addCellHighlight([0,3,6])
        }
        else if (boardArray[1] === boardArray[4] && boardArray[1] === boardArray[7] && boardArray[7] !== "") {
            gameController.endGame()
            _addCellHighlight([1,4,7])
        }
        else if (boardArray[2] === boardArray[5] && boardArray[2] === boardArray[8] && boardArray[8] !== "") {
            gameController.endGame()
            _addCellHighlight([2,5,8])
        }
        else if (boardArray[0] === boardArray[4] && boardArray[0] === boardArray[8] && boardArray[8] !== "") {
            gameController.endGame()
            _addCellHighlight([0,4,8])
        }
        else if (boardArray[2] === boardArray[4] && boardArray[2] === boardArray[6] && boardArray[6] !== "") {
            gameController.endGame()
            _addCellHighlight([2,4,6])
        }
        else if (boardArray.indexOf("") === -1) {
            gameController.endGame()
            tieStatus = true
        }
    };

    const checkTie = () => {
        return tieStatus
    }

    const removeCellHighlight = () => {
        boardCells.forEach(cell => {
            boardCells[cell.id].classList.remove('selected')
        })
    }

    const getCurrentPlayer = () => {
        return currentPlayer
    }

    const getNextPlayer = () => {
        if (currentPlayer === "Player One") {
            return "Player Two"
        } else return "Player One"
    }

    const getGamePiece = () => {
        currentPiece = players.getGamePiece()
    }
    
    return {resetBoard, drawPiece, checkWinner, checkTie, removeCellHighlight, getCurrentPlayer, getNextPlayer, getGamePiece}
})();

const players = (() => {
    var playerOnePiece = "";
    var playerTwoPiece = "";
    var playerTwoType = "";

    const _checkSettings = () => {
        if (playerOnePiece !== "" && playerTwoType !== "") {
            displayController.displayStart()
        }
    }
    const resetSettings = () => {
        playerOnePiece = "";
        playerTwoPiece = "";
        playerTwoType = "";
    }
    const setGamePiece = (piece) => {
        playerOnePiece = piece
        if (playerOnePiece === "X") {
            playerTwoPiece = "O";
            _checkSettings();
        } else {
            playerTwoPiece = "X";
            _checkSettings();
        }
    };

    const setPlayerType = (player) => {
        playerTwoType = player
        _checkSettings();
    }

    const getGamePiece = () => {
        return playerOnePiece
    }

    return {resetSettings, setGamePiece, setPlayerType, getGamePiece}
})();

const displayController = (() => {

    const startButton = document.querySelector('.start')
    const aiButton = document.querySelector('.ai-button')
    const playerButton = document.querySelector('.player-button')
    const pieceX = document.querySelector('.piece-x')
    const pieceO = document.querySelector('.piece-o')
    const message = document.querySelector('.message')
    const playAgain = document.querySelector('.play-again')

    startButton.addEventListener('click', () => gameController.startGame(), false)
    playAgain.addEventListener('click', () => gameController.resetGame(), false);
    playerButton.addEventListener('click', () => {_checkButton(playerButton)}, false);
    aiButton.addEventListener('click', () => {_checkButton(aiButton)}, false);
    pieceX.addEventListener('click', () => {_checkButton(pieceX)}, false);
    pieceO.addEventListener('click', () => {_checkButton(pieceO)}, false);

    const _disableSelect = () => {

    };
    const _showButton = (button) => {
        button.classList.add('show-button')
    };
    const _hideButton = (button) => {
        if (button.classList.contains('show-button')) {
            button.classList.remove('selected')
        }
    };

    const _checkButton = (button) => {
        if (!gameController.checkGameOn()) {
            addSelected(button);
            if (button.classList.contains('ai-button')) {
                removeSelected(playerButton)
                players.setPlayerType("ai")
            }
            else if (button.classList.contains('player-button')) {
                removeSelected(aiButton)
                players.setPlayerType('human')
            }
            else if (button.classList.contains('piece-x')) {
                removeSelected(pieceO)
                players.setGamePiece('X')
            }
            else if (button.classList.contains('piece-o')) {
                removeSelected(pieceX)
                players.setGamePiece('O')
            }
        }
    }
    const addSelected = (button) => {
        button.classList.add('selected')
    };
    const removeSelected = (button) => {
        if (button.classList.contains('selected')) {
            button.classList.remove('selected')
        }
    };
    const removeSelectedAll = () => {
        removeSelected(playerButton);
        removeSelected(aiButton);
        removeSelected(pieceX);
        removeSelected(pieceO);
    }
    const displayStart = () => {
        startButton.classList.add('show-button')
    };

    const hideStart = () => {
        startButton.classList.remove('show-button')
    };

    const showPlayAgain = () => {
        playAgain.classList.add('show-button')
    }

    const hidePlayAgain = () => {
        playAgain.classList.remove('show-button')
    }

    const updateMessage = () => {
        var currentPlayer = gameBoard.getCurrentPlayer();
        var nextPlayer = gameBoard.getNextPlayer();

        if (!gameController.checkGameOn()) {
            if (gameBoard.checkTie()) {
                message.textContent = "Game Over! It was a tie!"
            } else {
                message.textContent = `Game Over! ${nextPlayer} has won!`
            }
        } else {
            message.textContent = `It is ${currentPlayer}'s turn`
        }
    };

    return {addSelected, removeSelected, removeSelectedAll, displayStart, hideStart, showPlayAgain, hidePlayAgain, updateMessage}
})();