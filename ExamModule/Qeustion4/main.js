function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.createCircle = function () {
        this.x = 500;
        this.y = 300;
        this.radius = 200;
    };
}

function getRandomHex() {
    return Math.floor(Math.random() * 255);
}

function getRandomColor() {
    let red = this.getRandomHex();
    let green = this.getRandomHex();
    let blue = this.getRandomHex();
    return "rgb(" + red + "," + green + "," + blue + ")";
}

function createCircle() {
    let color = getRandomColor();
    let ctx = document.getElementById("myCircle").getContext("2d");
    let circle = new Circle(500, 300, 200, color);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

createCircle();