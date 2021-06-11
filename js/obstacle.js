class Obstacle{
    constructor(x, y, width, height) { //since u'll be creating random objects needs arguments
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height;
    }
    draw(){
        context.fillStyle = "orange";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}