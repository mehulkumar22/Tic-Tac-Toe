document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const isWinningMove = (board, player) => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return board[index] === player;
            });
        });
    };

    const isBoardFull = board => {
        return board.every(cell => cell !== '');
    };

    const handleCellClick = (index) => {
        if (board[index] !== '' || !gameActive) {
            return;
        }
        board[index] = currentPlayer;
        renderBoard();
        if (isWinningMove(board, currentPlayer)) {
            statusElement.textContent = `${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }
        if (isBoardFull(board)) {
            statusElement.textContent = `It's a Draw!`;
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = currentPlayer === 'X' ? 'Your Turn!' : 'Computer\'s Turn!';
        if (currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    };

    const computerMove = () => {
        let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        let move = availableCells[Math.floor(Math.random() * availableCells.length)];
        handleCellClick(move);
    };

    const renderBoard = () => {
        boardElement.querySelectorAll('.cell').forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    boardElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('cell')) {
            const index = event.target.getAttribute('data-index');
            handleCellClick(index);
        }
    });

    resetButton.addEventListener('click', () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        statusElement.textContent = 'Your Turn!';
        renderBoard();
    });
    renderBoard();
});
