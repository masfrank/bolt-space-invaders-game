import { Player } from './player.js';
import { Invader } from './invader.js';
import { Bullet } from './bullet.js';
export class Game {
  constructor(width, height, updateScore, updateLives) {
    this.width = width;
    this.height = height;
    this.updateScore = updateScore;
    this.updateLives = updateLives;
    this.player = new Player(width / 2, height - 30);
    this.invaders = this.createInvaders();
    this.bullets = [];
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
  }
  createInvaders() {
    const invaders = [];
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 10; x++) {
        invaders.push(new Invader(x * 50 + 50, y * 40 + 40));
      }
    }
    return invaders;
  }
  update() {
    if (this.gameOver) return;
    this.player.update(this.width);
    this.bullets.forEach(bullet => bullet.update());
    this.invaders.forEach(invader => invader.update(this.width));
    this.bullets = this.bullets.filter(bullet => !bullet.markedForDeletion);
    this.checkCollisions();
    if (this.invaders.length === 0) {
      this.levelUp();
    }
    if (this.invaders.some(invader => invader.y + invader.height > this.player.y)) {
      this.gameOver = true;
    }
  }
  draw(ctx) {
    this.player.draw(ctx);
    this.bullets.forEach(bullet => bullet.draw(ctx));
    this.invaders.forEach(invader => invader.draw(ctx));
    if (this.gameOver) {
      ctx.fillStyle = 'white';
      ctx.font = '40px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', this.width / 2, this.height / 2);
    }
  }
  handleKeyDown(event) {
    if (this.gameOver) return;
    if (event.key === 'ArrowLeft') this.player.moveLeft();
    if (event.key === 'ArrowRight') this.player.moveRight();
    if (event.key === ' ') this.shoot();
  }
  handleKeyUp(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') this.player.stop();
  }
  shoot() {
    if (this.bullets.length < 3) {
      this.bullets.push(new Bullet(this.player.x + this.player.width / 2, this.player.y));
    }
  }
  checkCollisions() {
    this.bullets.forEach(bullet => {
      this.invaders.forEach(invader => {
        if (
          bullet.x < invader.x + invader.width &&
          bullet.x + bullet.width > invader.x &&
          bullet.y < invader.y + invader.height &&
          bullet.y + bullet.height > invader.y
        ) {
          bullet.markedForDeletion = true;
          invader.markedForDeletion = true;
          this.score += 10;
          this.updateScore(this.score);
        }
      });
    });
    this.invaders = this.invaders.filter(invader => !invader.markedForDeletion);
  }
  levelUp() {
    this.invaders = this.createInvaders();
    this.invaders.forEach(invader => invader.speed *= 1.2);
  }
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.player.y = height - 30;
  }
}
