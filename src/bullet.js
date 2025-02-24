export class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 4;
    this.height = 10;
    this.speed = 7;
    this.markedForDeletion = false;
  }
  update() {
    this.y -= this.speed;
    if (this.y < 0) this.markedForDeletion = true;
  }
  draw(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
