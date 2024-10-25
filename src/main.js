import { Game } from './game.js';
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
let game;
let canvasScale;
function resizeCanvas() {
  const containerWidth = canvas.parentElement.clientWidth;
  canvas.width = containerWidth;
  canvas.height = containerWidth * 0.75;
  canvasScale = containerWidth / 800;
  if (game) {
    game.resize(canvas.width, canvas.height);
  }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function updateScore(score) {
  scoreElement.textContent = `Score: ${score}`;
}
function updateLives(lives) {
  livesElement.textContent = `Lives: ${lives}`;
}
function startGame() {
  game = new Game(canvas.width, canvas.height, updateScore, updateLives);
  gameLoop();
}
function gameLoop() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(canvasScale, canvasScale);
  game.update();
  game.draw(ctx);
  ctx.restore();
  requestAnimationFrame(gameLoop);
}
document.getElementById('startButton').addEventListener('click', startGame);
document.addEventListener('keydown', (event) => game && game.handleKeyDown(event));
document.addEventListener('keyup', (event) => game && game.handleKeyUp(event));
document.getElementById('leftButton').addEventListener('mousedown', () => game && game.handleKeyDown({ key: 'ArrowLeft' }));
document.getElementById('leftButton').addEventListener('mouseup', () => game && game.handleKeyUp({ key: 'ArrowLeft' }));
document.getElementById('leftButton').addEventListener('touchstart', (e) => { e.preventDefault(); game && game.handleKeyDown({ key: 'ArrowLeft' }); });
document.getElementById('leftButton').addEventListener('touchend', (e) => { e.preventDefault(); game && game.handleKeyUp({ key: 'ArrowLeft' }); });
document.getElementById('rightButton').addEventListener('mousedown', () => game && game.handleKeyDown({ key: 'ArrowRight' }));
document.getElementById('rightButton').addEventListener('mouseup', () => game && game.handleKeyUp({ key: 'ArrowRight' }));
document.getElementById('rightButton').addEventListener('touchstart', (e) => { e.preventDefault(); game && game.handleKeyDown({ key: 'ArrowRight' }); });
document.getElementById('rightButton').addEventListener('touchend', (e) => { e.preventDefault(); game && game.handleKeyUp({ key: 'ArrowRight' }); });
document.getElementById('fireButton').addEventListener('click', () => game && game.handleKeyDown({ key: ' ' }));
document.getElementById('fireButton').addEventListener('touchstart', (e) => { e.preventDefault(); game && game.handleKeyDown({ key: ' ' }); });
