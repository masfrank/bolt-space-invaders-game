export class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.speed = 1;
    this.dx = this.speed;
  }
  update(gameWidth) {
    this.x += this.dx;
    if (this.x <= 0 || this.x + this.width >= gameWidth) {
      this.dx = -this.dx;
      this.y += 20;
    }
  }
  draw(ctx) {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
