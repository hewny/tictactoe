const boardContainer = document.querySelector('.board-container');
const boardCells = document.querySelectorAll('.board-cell');
const aiButton = document.querySelector('.ai-button')
const playerButton = document.querySelector('.player-button')
const pieceX = document.querySelector('.piece-x')
const pieceO = document.querySelector('.piece-o')

const gameBoard = (() => {
    currentPiece = "X"
    
    const resetBoard = () => {
        boardCells.forEach(cell => {
            cell.textContent = "";
        })
    };
    
    const _alternatePiece = () => {
        if (currentPiece === "X") {
            currentPiece = "O"
        } else {
            currentPiece = "X"
        }
    }

    const drawPiece = (cell) => {
        if (boardCells[cell.id].textContent === "") {
            boardCells[cell.id].textContent = currentPiece;
            _alternatePiece()
        }
    };
    
    return {resetBoard, drawPiece}
})();

const players = (() => {

})();

const displayController = (() => {

})();

boardCells.forEach(cell => {
    cell.addEventListener('click', () => {
        gameBoard.drawPiece(cell)
    }, false);
});