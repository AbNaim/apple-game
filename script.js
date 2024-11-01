const applesPerRow = 4;
const rows = 3;
const appleContainer = document.getElementById('apple-container');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-btn');

let eatenApples = [];
let score = 0;
let gameEnded = false;

// Initialize the game
initializeGame();

// Set up reset button
resetButton.addEventListener('click', initializeGame);

function initializeGame() {
    // Reset state
    appleContainer.innerHTML = '';
    score = 0;
    gameEnded = false;
    eatenApples = Array.from({ length: rows }, () => Math.floor(Math.random() * applesPerRow));
    scoreDisplay.textContent = 'Score: 0';

    // Create apple elements
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < applesPerRow; col++) {
            const apple = document.createElement('div');
            apple.classList.add('apple', 'safe');
            apple.dataset.row = row;
            apple.dataset.col = col;
            apple.addEventListener('click', handleAppleClick);
            appleContainer.appendChild(apple);
        }
    }
}

function handleAppleClick(event) {
    if (gameEnded) return;

    const clickedApple = event.target;
    const row = parseInt(clickedApple.dataset.row, 10);
    const col = parseInt(clickedApple.dataset.col, 10);

    if (col === eatenApples[row]) {
        clickedApple.classList.remove('safe');
        clickedApple.classList.add('eaten');
        endGame(false);
    } else {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        clickedApple.classList.add('safe');
        clickedApple.removeEventListener('click', handleAppleClick);

        if (score === applesPerRow * rows - rows) {
            endGame(true);
        }
    }
}

function endGame(won) {
    gameEnded = true;
    const message = won ? "You won! All safe apples clicked!" : "Game over! You clicked an eaten apple.";
    setTimeout(() => alert(message), 100);

    // Reveal all apples
    for (let row = 0; row < rows; row++) {
        document.querySelectorAll(`.apple[data-row="${row}"]`).forEach((apple, index) => {
            apple.classList.remove('safe');
            apple.classList.add(index === eatenApples[row] ? 'eaten' : 'safe');
            apple.removeEventListener('click', handleAppleClick);
        });
    }
}
