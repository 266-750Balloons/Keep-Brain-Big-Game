class gameItem {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    collision(object1) {
        if((this.x >= object1.x && this.x <= object1.x+object1.width) || (object1.x >= this.x && object1.x <= this.x+this.width)) {
            if((this.y >= object1.y && this.y <= object1.y+object1.height) || (object1.y >= this.y && object1.y <= this.y+this.height)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    drawItem(r, g, b) {
        mainContext.fillStyle = "rgb("+r.toString()+", "+g.toString()+", "+b.toString()+")";
        mainContext.fillRect(this.x, this.y, this.width, this.height);
    }
}

var mainCanvas = document.getElementById("main");
updateCanvasSize();

var windowResize = window.addEventListener('resize', updateCanvasSize);

var mainContext = mainCanvas.getContext("2d");

var player = new gameItem(100, 100, 0, 0);
player.drawItem(255, 0, 0);

function updateCanvasSize() {
    mainCanvas.style.width = document.body.clientWidth.toString()+"px";
    mainCanvas.style.height = document.body.clientHeight.toString()+"px";
    mainCanvas.width = document.body.clientWidth;
    mainCanvas.height = document.body.clientHeight;
}

function test(timestamp) {
    console.log(timestamp);
    window.requestAnimationFrame(test);
}

window.requestAnimationFrame(test);