const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const endBtn = document.querySelector('.end');
const gameSection = document.querySelector('.game');
const statusMsg = document.querySelector('.status-msg');
const cells = document.querySelectorAll('.cell');
const scoreTableBody = document.querySelector('.score-table-body');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = false;
let playerX = 'Player X';
let playerO = 'Player O';
let round = 1;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

startBtn.addEventListener('click', () => {
  playerX = prompt("Enter name for Player X") || "Player X";
  playerO = prompt("Enter name for Player O") || "Player O";

  gameSection.style.display = 'flex';
  startBtn.style.display = 'none';
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusMsg.textContent = `${getCurrentPlayerName()}'s Turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
  });
});

function handleClick(e, index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    let winnerName = getCurrentPlayerName();
    statusMsg.textContent = `${winnerName} Wins!`;
    gameActive = false;
    disableCells();
    updateScoreboard(winnerName);
    statusMsg.style.color = '#3DFF92';
  } else if (!board.includes('')) {
    statusMsg.textContent = `It's a Draw!`;
    gameActive = false;
    updateScoreboard('Draw');
    statusMsg.style.color = '#FFA8A8 ';
  } else {
    statusMsg.style.color = '#FFE66D';
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMsg.textContent = `${getCurrentPlayerName()}'s Turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function disableCells() {
  cells.forEach(cell => cell.disabled = true);
}

resetBtn.addEventListener('click', () => {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusMsg.style.color = '#FFE66D';
  statusMsg.textContent = `${getCurrentPlayerName()}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
  });
});

endBtn.addEventListener('click', () => {
  gameActive = false;
  board = Array(9).fill('');
  gameSection.style.display = 'none';
  startBtn.style.display = 'inline-block';
  statusMsg.textContent = '';
});

cells.forEach((cell, index) => {
  cell.addEventListener('click', (e) => handleClick(e, index));
});

function getCurrentPlayerName() {
  return currentPlayer === 'X' ? playerX : playerO;
}

function updateScoreboard(winner) {
  const row = document.createElement('tr');
  const roundCell = document.createElement('td');
  const winnerCell = document.createElement('td');

  roundCell.textContent = round;
  winnerCell.textContent = winner;
  row.appendChild(roundCell);
  row.appendChild(winnerCell);
  scoreTableBody.appendChild(row);
  round++;
}
