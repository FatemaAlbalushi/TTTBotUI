// Define constants and variables
const cells = document.querySelectorAll('.square');
const status = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
  [0, 4, 8], [2, 4, 6] // diagonal
];
let board = ["", "", "","", "", "","", "", ""];
let currentPlayer = 'X';
let gameIsLive = true;

// Define helper functions
const getCellIndex = cell => Array.from(cells).indexOf(cell);

const checkForWin = () => {
  for (const [a, b, c] of winningConditions) {
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      return [a, b, c];
    }
  }
  return null;
};

const checkForDraw = () => Array.from(cells).every(cell => cell.textContent !== "");

const highlightWinningCombo = winningCombo => {
  for (const index of winningCombo) {
    cells[index].classList.add('winning');
  }
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `${currentPlayer}'s turn`;
};

const markCell = (cell, symbol) => {
  cell.textContent = symbol;
  cell.classList.add(symbol);
};

const makeBotMove = async () => {
  const url = 'http://localhost:8080/bot-move';
  const reqConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ board })
  };
  const response = await fetch(url, reqConfig);
  const data = await response.json();
  const botIndex = data.botMove;
  return cells[botIndex];
};

// Define event handlers
const handleCellClick = async e => {
  const cell = e.target;
  if (cell.textContent || !gameIsLive) return;
  const index = getCellIndex(cell);
  markCell(cell, currentPlayer);
  board[index] = currentPlayer;
  const winningCombo = checkForWin();
  if (winningCombo) {
    gameIsLive = false;
    highlightWinningCombo(winningCombo);
    status.textContent = `${currentPlayer} wins!`;
    return;
  }
  if (checkForDraw()) {
    gameIsLive = false;
    status.textContent = "It's a draw!";
    return;
  }
  switchPlayer();
  if (currentPlayer === 'O') {
    const botCell = await makeBotMove();
    markCell(botCell, 'O');
    const winningCombo = checkForWin();
    if (winningCombo) {
      gameIsLive = false;
      highlightWinningCombo(winningCombo);
      status.textContent = `${currentPlayer} wins!`;
      return;
    }
    if (checkForDraw()) {
      gameIsLive = false;
      status.textContent = "It's a draw!";
      return;
    }
    switchPlayer();
  }
};

// const handleRestartClick = () => {
//   board = ["", "", "","", "", "","", "", ""];
//   currentPlayer = 'X';
//   gameIsLive = true;
//   status.textContent = `${currentPlayer}'s turn`;
//   for (const
const handleRestartClick = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameIsLive = true;
  status.textContent = `${currentPlayer}'s turn`;
  for (const cell of cells) {
    cell.textContent = "";
    cell.classList.remove('X', 'O', 'winning');
    cell.addEventListener('click', handleCellClick);
    }
    };
    

  
    // Get the reset button element and add a click event listener to it
  
  restartBtn.addEventListener('click', handleRestartClick);
  // Add event listeners to all cells
  cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
  });
  
  