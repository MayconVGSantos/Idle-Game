// Game constants
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
const canvasSize = 500;
const initialSnakeLength = 1;
const gameSpeed = 150; // in milliseconds

// Game variables
let snake = [];
let direction = "right";
let food = {};
let score = 0;
let speed = 0;

// DOM elements
const scoreValueElement = document.getElementById("scoreValue");

// Initial setup
function setup() {
  snake = [];
  createSnake();
  createFood();
  speed = 0; // Reset speed to 0

  // Start game loop
  gameLoop();
}

// Create the initial snake
function createSnake() {
  for (let i = 0; i < initialSnakeLength; i++) {
    snake.push({ x: i, y: 0 });
  }
  direction = "right"; // Set the initial direction to right
}

// Create food at a random position
function createFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / box)),
    y: Math.floor(Math.random() * (canvasSize / box)),
  };
}

// Game loop
function gameLoop() {
  clearCanvas();
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
  updateScore();
  setTimeout(gameLoop, gameSpeed);
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
}

// Draw the snake
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x * box, segment.y * box, box, box);
  });
}

// Draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * box, food.y * box, box, box);
}

// Move the snake
function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  // Update head position based on direction
  if (direction === "right") head.x++;
  if (direction === "left") head.x--;
  if (direction === "up") head.y--;
  if (direction === "down") head.y++;

  // Add new head to snake
  snake.unshift(head);

  // Remove tail segment
  snake.pop();
}

// Check collision with walls or self
function checkCollision() {
  let head = snake[0];

  // Check collision with walls
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvasSize / box ||
    head.y >= canvasSize / box
  ) {
    // Game over
    resetGame();
    return;
  }

  // Check collision with self
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      // Game over
      resetGame();
      return;
    }
  }

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    // Increase snake length
    snake.push({});
    createFood();
    score++;
  }
}

// Restart the game
function resetGame() {
  snake = [];
  direction = "right";
  score = 0;
  speed = 0;
  createSnake();
  createFood();
}

// Update the score and speed on the screen
function updateScore() {
  scoreValueElement.textContent = score;
}

// Change snake direction based on keyboard input
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.keyCode;

  if (key === 37 && direction !== "right") {
    direction = "left";
  } else if (key === 38 && direction !== "down") {
    direction = "up";
  } else if (key === 39 && direction !== "left") {
    direction = "right";
  } else if (key === 40 && direction !== "up") {
    direction = "down";
  }
}


// Start the game
setup();
