window.score = 0;
window.gameOver = false;

let score = 0;
let gameOver = false;
let board = [];
let selectedIndex = -1;
let nextTile = 1;
let mergeCount = 0;
let bestValue = 2;
let pressureTimer = 0;

const SIZE = 4;
const PRESSURE_MS = 2400;

let boardElement;
let scoreValue;
let nextValue;
let bestValueElement;
let selectedValue;
let emptyValue;
let mergeCountValue;
let statusText;
let restartBtn;

function startGame() {
  stopPressure();
  score = 0;
  gameOver = false;
  selectedIndex = -1;
  nextTile = 1;
  mergeCount = 0;
  bestValue = 2;

  board = [
    1, 1, 2, 2,
    1, 1, 2, 2,
    0, 0, 0, 0,
    0, 0, 0, 0
  ];

  bindDom();
  bindEvents();
  flashStatus("Select one tile, then an equal adjacent tile to merge.");
  updateGame();
  startPressure();
}

function bindDom() {
  boardElement = document.getElementById("board");
  scoreValue = document.getElementById("scoreValue");
  nextValue = document.getElementById("nextValue");
  bestValueElement = document.getElementById("bestValue");
  selectedValue = document.getElementById("selectedValue");
  emptyValue = document.getElementById("emptyValue");
  mergeCountValue = document.getElementById("mergeCountValue");
  statusText = document.getElementById("statusText");
  restartBtn = document.getElementById("restartBtn");
}

function bindEvents() {
  if (!restartBtn.dataset.bound) {
    restartBtn.addEventListener("click", restartGame);
    restartBtn.dataset.bound = "true";
  }
}

function handleCellClick(index) {
  if (gameOver) return;
  if (board[index] === 0) {
    selectedIndex = -1;
    flashStatus("Empty cell. Pick a numbered tile to combine.");
    return updateGame();
  }

  if (selectedIndex === -1) {
    selectedIndex = index;
    flashStatus("Tile selected. Now tap an equal adjacent tile to merge.");
    return updateGame();
  }

  if (selectedIndex === index) {
    selectedIndex = -1;
    flashStatus("Selection cleared.");
    return updateGame();
  }

  if (canMerge(selectedIndex, index)) {
    mergeCells(selectedIndex, index);
    selectedIndex = -1;
    spawnTile();
    if (isBoardLocked()) {
      endGame();
    } else {
      updateGame();
    }
    return;
  }

  selectedIndex = index;
  flashStatus("Those tiles cannot merge. Pick another adjacent match.");
  updateGame();
}

function canMerge(left, right) {
  return board[left] > 0 && board[left] === board[right] && areAdjacent(left, right);
}

function areAdjacent(left, right) {
  const leftRow = Math.floor(left / SIZE);
  const leftCol = left % SIZE;
  const rightRow = Math.floor(right / SIZE);
  const rightCol = right % SIZE;
  const distance = Math.abs(leftRow - rightRow) + Math.abs(leftCol - rightCol);
  return distance === 1;
}

function mergeCells(left, right) {
  const mergedValue = board[left] + board[right];
  board[left] = mergedValue;
  board[right] = 0;
  score += mergedValue;
  mergeCount += 1;
  bestValue = Math.max(bestValue, mergedValue);
  nextTile = mergedValue >= 8 ? 2 : 1;
  flashStatus("Clean merge for +" + mergedValue + ". Keep the board alive.");
}

function spawnTile() {
  const openCells = board
    .map((value, index) => ({ value, index }))
    .filter((entry) => entry.value === 0)
    .map((entry) => entry.index);

  if (!openCells.length) return;
  const spawnIndex = openCells[Math.floor(Math.random() * openCells.length)];
  board[spawnIndex] = nextTile;
  nextTile = Math.random() > 0.65 ? 2 : 1;
}

function updateGame() {
  renderBoard();
  scoreValue.textContent = String(score);
  nextValue.textContent = String(nextTile);
  bestValueElement.textContent = String(bestValue);
  selectedValue.textContent = selectedIndex === -1 ? "None" : "Cell " + String(selectedIndex + 1);
  emptyValue.textContent = String(board.filter((value) => value === 0).length);
  mergeCountValue.textContent = String(mergeCount);
  syncGlobals();
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((value, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cell" + (value > 0 ? " filled value-" + value : "");
    if (selectedIndex === index) button.className += " selected";
    button.textContent = value > 0 ? String(value) : "";
    button.addEventListener("click", () => handleCellClick(index));
    boardElement.appendChild(button);
  });
}

function startPressure() {
  pressureTimer = window.setInterval(() => {
    if (gameOver) return;
    spawnTile();
    if (isBoardLocked()) {
      endGame();
    } else {
      flashStatus("Board pressure increased. Make another combine.");
      updateGame();
    }
  }, PRESSURE_MS);
}

function stopPressure() {
  if (pressureTimer) {
    window.clearInterval(pressureTimer);
    pressureTimer = 0;
  }
}

function isBoardLocked() {
  if (board.includes(0)) return false;

  for (let index = 0; index < board.length; index += 1) {
    const right = index % SIZE === SIZE - 1 ? -1 : index + 1;
    const down = index + SIZE >= board.length ? -1 : index + SIZE;
    if (right >= 0 && board[index] === board[right]) return false;
    if (down >= 0 && board[index] === board[down]) return false;
  }

  return true;
}

function flashStatus(message) {
  statusText.textContent = message;
}

function endGame() {
  gameOver = true;
  stopPressure();
  flashStatus("No merges remain. Restart the board and chase a cleaner combine path.");
  updateGame();
}

function restartGame() {
  startGame();
}

function syncGlobals() {
  window.score = score;
  window.gameOver = gameOver;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startGame);
} else {
  startGame();
}

window.startGame = startGame;
window.updateGame = updateGame;
window.endGame = endGame;
window.restartGame = restartGame;
