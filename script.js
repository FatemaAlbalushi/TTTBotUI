/**
 * Tic Tac Toe game logic module
 * @module tictactoe
*/

/**
 * An array containing all the square elements in the board
 * @constant
 * @type {Array<Element>}
*/

const cells = document.querySelectorAll('.square');

/**
 * The message element that displays the game status
 * @constant
 * @type {Element}
*/
const status = document.getElementById('message');

/**
 * The restart button element
 * @constant
 * @type {Element}
*/
const restartBtn = document.getElementById('restart');

/**
 * An array containing all possible winning conditions
 * @constant
 * @type {Array<Array<number>>}
*/
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
  [0, 4, 8], [2, 4, 6] // diagonal
];

/**
 * An array representing the state of the board
 * @type {Array<string>}
*/
let board = ["", "", "","", "", "","", "", ""];

/**
 * The current player
 * @type {string}
*/

let currentPlayer = 'X';

/**
 * A flag indicating if the game is still ongoing
 * @type {boolean}
*/
let gameIsLive = true;

/**
 * Get the index of a cell element in the cells array
 * @param {Element} cell - The cell element
 * @returns {number} The index of the cell element
*/
const getCellIndex = cell => Array.from(cells).indexOf(cell);


/**
 * Check if the current player has won
 * @returns {Array<number>|null} The winning combination or null if the current player has not won yet
*/
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

/**
 * Check if the game is a draw
 * @returns {boolean} true if the game is a draw, false otherwise
*/
const checkForDraw = () => Array.from(cells).every(cell => cell.textContent !== "");

/**
 * Add the winning class to the cells in the winning combination
 * @param {Array<number>} winningCombo - The winning combination
*/
const highlightWinningCombo = winningCombo => {
  for (const index of winningCombo) {
    cells[index].classList.add('winning');
  }
};

/**
 * Switch the current player
*/
const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `${currentPlayer}'s turn`;
};

/**
 * Mark a cell with the given symbol
 * @param {Element} cell - The cell element to mark
 * @param {string} symbol - The symbol to mark the cell with ('X' or 'O')
*/
const markCell = (cell, symbol) => {
  cell.textContent = symbol;
  cell.classList.add(symbol);
};

/**
 * Makes a move for the bot by sending a POST request to the server and updating the board and UI with the result.
 * @async
 * @returns {Element|null} The bot's move cell element or null if the bot's move is invalid
*/
const makeBotMove = async () => {
  const url = 'http://localhost:8080/bot-move';
  const reqConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ board })
  };
  const response = await fetch(url, reqConfig);
  const data = await response.json();
  
  // Check if bot move is available
  const botIndex = data.botMove;
  if (botIndex === null || board[botIndex] !== "") {
    console.log("Invalid bot move");
    return null;
  }
  
  // Make bot move
  const botCell = cells[botIndex];
  markCell(botCell, 'O');
  board[botIndex] = 'O';
  return botCell;
};


/**
 * Handles a click event on a game cell.
 * If the game is not live or the cell already has content, the function does nothing.
 * If the clicked cell is valid, it marks the cell with the current player's symbol,
 * updates the game board, and checks if the current player has won or if the game is a draw.
 * If the game is over, the function updates the status and ends the game.
 * If the current player is 'O', the function waits for the bot to make its move before switching players.
 * @param {Object} e - The event object for the click event.
 * @returns {void}
*/
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

/**
 * Handles a click event on the restart button. Resets the game board,
 * sets the current player to 'X', updates the game status, and adds event listeners to all game cells.
 * @returns {void}
*/
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
  
  