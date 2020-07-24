console.log('its connected!');

let currentPlayer = 'X';

const turnIndicator = document.querySelector('.turn-indicator');

const playerClicks = {
  O: [],
  X: [],
};

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinConditions(clicks) {
  if (clicks.length < 3) return;
  let isWin = null;
  winConditions.forEach(win => {
    const status = win.every(box => clicks.includes(box));
    if (status) {
      isWin = status;
    }
  });
  if (!isWin && clicks.length === 5) {
    alert('There was no winner!');
    return;
  }
  return isWin;
}

// click event on the div
const gameTiles = document.querySelectorAll('.game-tile');
gameTiles.forEach((gameTile, i) => {
  gameTile.addEventListener('click', (evt) => {
    if (evt.target.innerText) {
      return;
    }
    evt.target.innerText = currentPlayer;
    playerClicks[currentPlayer].push(i);
    const currentPlayerWon = checkWinConditions(playerClicks[currentPlayer]);
    if (currentPlayerWon) {
      const playAgain = confirm(`${currentPlayer} is the winner!! Do you want to play again?`);
      // reset the game state
      if (playAgain) {
        resetGame();
      }
    }
    switchPlayer(currentPlayer);
  });
});

function switchPlayer(player) {
  if (player === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  turnIndicator.innerText = currentPlayer;
}


function resetGame() {
  playerClicks.O = [];
  playerClicks.X = [];
  currentPlayer = 'X';
  gameTiles.forEach(tile => {
    tile.innerText = '';
  });
  turnIndicator.innerText = '';
}
