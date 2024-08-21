const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
const aiButton = document.getElementById('ai-button');

let currentPlayer = 'X';
let gameActive = true;
let againstAI = false;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkResult();

    if (againstAI && gameActive) {
        setTimeout(() => {
            const bestMove = minimax(gameState, 'O').index;
            gameState[bestMove] = 'O';
            cells[bestMove].textContent = 'O';
            checkResult();
        }, 500);
    }
};

const checkResult = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        restartButton.classList.remove('hidden');
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.textContent = 'Game is a draw!';
        gameActive = false;
        restartButton.classList.remove('hidden');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn.`;
};

const restartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn.`;
    restartButton.classList.add('hidden');

    cells.forEach(cell => {
        cell.textContent = '';
    });
};

const minimax = (newGameState, player) => {
    const availableSpots = newGameState.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);

    if (checkWin(newGameState, 'X')) {
        return { score: -10 };
    } else if (checkWin(newGameState, 'O')) {
        return { score: 10 };
    } else if (availableSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availableSpots.length; i++) {
        const move = {};
        move.index = availableSpots[i];
        newGameState[availableSpots[i]] = player;

        if (player === 'O') {
            const result = minimax(newGameState, 'X');
            move.score = result.score;
        } else {
            const result = minimax(newGameState, 'O');
            move.score = result.score;
        }

        newGameState[availableSpots[i]] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } 
    else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
};

const checkWin = (board, player) => {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
};

aiButton.addEventListener('click', () => {
    againstAI = !againstAI;
    aiButton.textContent = againstAI ? 'Play against a freind' : 'Play against AI';
    restartGame();
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusDisplay.textContent = `It's ${currentPlayer}'s turn.`;

const themeToggleButton = document.getElementById('theme-toggle');
let isCoolTheme = true;

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('warm-theme');
    if (isCoolTheme) {
        themeToggleButton.querySelector; // Switch to warm 
    } else {
        themeToggleButton.querySelector; // Switch back to cool
    }
    isCoolTheme = !isCoolTheme;
});
