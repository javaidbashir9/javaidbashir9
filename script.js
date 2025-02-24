const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("game-over");

let score = 0;
let isJumping = false;
let isGameOver = false;

function jump() {
    if (isJumping || isGameOver) return;
    isJumping = true;
    let position = 0;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 10;
                dino.style.bottom = position + "px";
            }, 20);
        }
        position += 20;
        dino.style.bottom = position + "px";
    }, 20);
}

function checkCollision() {
    if (isGameOver) return;
    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();

    if (dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top) {
        gameOver();
    }
}

function updateScore() {
    if (isGameOver) return;
    score++;
    scoreDisplay.textContent = "Score: " + score;
}

function gameOver() {
    isGameOver = true;
    gameOverDisplay.style.display = "block";
    cactus.style.animationPlayState = "paused";
}

function restartGame() {
    isGameOver = false;
    gameOverDisplay.style.display = "none";
    score = 0;
    updateScore();
    cactus.style.animationPlayState = "running";
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (isGameOver) {
            restartGame();
        } else {
            jump();
        }
    }
});

setInterval(checkCollision, 10);
setInterval(updateScore, 500);
