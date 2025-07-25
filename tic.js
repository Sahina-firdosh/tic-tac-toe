const startBtn = document.querySelector(".start");
const gameArea = document.querySelector(".game");
const cells = document.querySelectorAll(".cell");
const statusMsg = document.querySelector(".status-msg");
const resetBtn = document.querySelector(".reset");
const endBtn = document.querySelector(".end");
const scoreTable = document.querySelector(".score-table-body");
const strikeLine = document.querySelector(".strike-line");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let playerX = "";
let playerO = "";
let round = 1;

startBtn.addEventListener("click", () => {
  playerX = prompt("Enter Player 1 Name (X):") || "Player X";
  playerO = prompt("Enter Player 2 Name (O):") || "Player O";
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  strikeLine.style.display = "none";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
  });
  gameArea.style.display = "block";
  startBtn.style.display = "none";
  updateStatus();
});

resetBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  strikeLine.style.display = "none";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
  });
  currentPlayer = "X";
  updateStatus();
});

endBtn.addEventListener("click", () => {
  gameArea.style.display = "none";
  startBtn.style.display = "inline-block";
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "") {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      if (checkWinner()) {
        let winnerName = currentPlayer === "X" ? playerX : playerO;
        statusMsg.textContent = `${winnerName} Wins!`;
        statusMsg.style.color = "#3DFF92";
        cells.forEach(c => c.disabled = true);
        addToScoreboard(winnerName);
        return;
      }
      if (!board.includes("")) {
        statusMsg.textContent = "It's a Draw!";
        statusMsg.style.color = "#FFA8A8";
        addToScoreboard("Draw");
        return;
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateStatus();
    }
  });
});

function updateStatus() {
  const playerName = currentPlayer === "X" ? playerX : playerO;
  statusMsg.textContent = `${playerName}'s Turn (${currentPlayer})`;
  statusMsg.style.color = "#FFE66D";
}

function addToScoreboard(winner) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${round}</td><td>${winner}</td>`;
  scoreTable.appendChild(row);
  round++;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal TL-BR
    [2, 4, 6]  // Diagonal TR-BL
  ];

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showStrikeLine(i);
      return true;
    }
  }
  return false;
}

function showStrikeLine(index) {
  const strikeStyles = [
    "strike-row-1", "strike-row-2", "strike-row-3",
    "strike-col-1", "strike-col-2", "strike-col-3",
    "strike-diag-1", "strike-diag-2"
  ];

  strikeLine.className = `strike-line ${strikeStyles[index]}`;
  strikeLine.style.display = "block";
}
