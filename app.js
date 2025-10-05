// 🎯 Select main elements from HTML
const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const gameOverText = document.getElementById("gameOver");

let score = 0;
let lives = 3;
let gameRunning = true;

// 🧺 Basket movement (left and right)
document.addEventListener("keydown", (event) => {
  if (!gameRunning) return;

  let left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));

  if (event.key === "ArrowLeft" && left > 0) {
    player.style.left = left - 30 + "px";
  }
  if (event.key === "ArrowRight" && left < gameArea.offsetWidth - 50) {
    player.style.left = left + 30 + "px";
  }
});

// 🍎 Function to create falling emojis
function createEmoji() {
  if (!gameRunning) return;

  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = "🍎"; // you can change emoji here
  emoji.style.left = Math.random() * (gameArea.offsetWidth - 30) + "px";
  emoji.style.top = "0px"; // must set starting top position
  gameArea.appendChild(emoji);

  let fallSpeed = 3; // how fast the emoji falls

  let fallInterval = setInterval(() => {
    // get current position of emoji
    let emojiTop = parseInt(emoji.style.top);
    emoji.style.top = emojiTop + fallSpeed + "px"; // move down step by step

    // get player position
    let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    let playerRight = playerLeft + 50;
    let emojiLeft = parseInt(emoji.style.left);
    let emojiRight = emojiLeft + 30;

    // ✅ If emoji caught by basket
    if (emojiTop > 350 && emojiLeft < playerRight && emojiRight > playerLeft) {
      clearInterval(fallInterval);
      gameArea.removeChild(emoji);
      score++;
      scoreDisplay.innerText = score;
    }

    // ❌ If emoji missed
    if (emojiTop > 400) {
      clearInterval(fallInterval);
      gameArea.removeChild(emoji);
      loseLife();
    }
  }, 20);
}

// ❤️ Lose one life when missed
function loseLife() {
  lives--;
  livesDisplay.innerText = lives;

  if (lives <= 0) {
    endGame();
  }
}

// 💀 Game over
function endGame() {
  gameRunning = false;
  gameOverText.style.display = "block";
  gameOverText.innerText = "Game Over 😢";

  // remove all emojis left
  document.querySelectorAll(".emoji").forEach(e => e.remove());

  // restart after 3 seconds
  setTimeout(resetGame, 3000);
}

// 🔄 Reset everything
function resetGame() {
  score = 0;
  lives = 3;
  gameRunning = true;
  scoreDisplay.innerText = score;
  livesDisplay.innerText = lives;
  gameOverText.style.display = "none";
}

// 🕐 Keep creating emojis every 1 second
setInterval(createEmoji, 1000);
