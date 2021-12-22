class gameItem {
    constructor(width, height, x, y, r, g, b) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
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
    drawItem() {
        mainContext.fillStyle = "rgb("+this.r.toString()+", "+this.g.toString()+", "+this.b.toString()+")";
        mainContext.fillRect(this.x, this.y, this.width, this.height);
    }
}

var mainCanvas = document.getElementById("main");
updateCanvasSize();

var start, keybuffer;

var lives = 3;

var score = 0;

var windowResize = window.addEventListener('resize', updateCanvasSize);
var detectKey = window.addEventListener('keydown', getInput);
var resetKey = window.addEventListener('keyup', resetInput);

var mainContext = mainCanvas.getContext("2d");

var player = new gameItem(100, 100, 0, 0, 255, 0, 0);
player.drawItem();

var badGuy = new gameItem(100, 100, document.body.clientWidth-100, 0, 0, 255, 255);
badGuy.drawItem();

function updateCanvasSize() {
    mainCanvas.style.width = document.body.clientWidth.toString()+"px";
    mainCanvas.style.height = document.body.clientHeight.toString()+"px";
    mainCanvas.width = document.body.clientWidth;
    mainCanvas.height = document.body.clientHeight;
}

function getInput(e) {
    if(e.which === 38) {
        keybuffer = "up";
    } else if (e.which === 40) {
        keybuffer = "down";
    } else {
        keybuffer = undefined;
    }
    console.log(keybuffer);
}

function resetInput() {
    keybuffer = undefined;
}

function test(timestamp) {
    if(start === undefined) {
        start = timestamp;
    }
    mainContext.fillStyle = '#FFFFFF';
    mainContext.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    player.drawItem();
    mainContext.font = "50px sans-serif"
    if(keybuffer === "down") {
        player.y += 10;
    } else if(keybuffer === "up") {
        player.y -= 10;
    }
    if (player.y + player.height > document.body.clientHeight) {
        player.y = document.body.clientHeight - player.height;
    } else if (player.y < 0) {
        player.y = 0;
    }
    if (player.collision(badGuy) === true) {
        badGuy.x = document.body.clientWidth ;
        badGuy.y = Math.floor(Math.random()*(document.body.clientHeight-100));
        lives--;
    }
    badGuy.drawItem();
    badGuy.x -= 10 + (score * 0.005);
    if(badGuy.x < -100) {
        badGuy.x = document.body.clientWidth;
        badGuy.y = Math.floor(Math.random()*(document.body.clientHeight-100));
        score += 100;
    }
    mainContext.fillStyle = "#000000";
    mainContext.fillText("Lives: "+lives.toString(), document.body.clientWidth-200, 50);
    mainContext.fillText("Score: "+score.toString(), 10, 50);
    if(lives !== 0) {
        window.requestAnimationFrame(test);
    } else {
        mainContext.fillText("Game Over", 0.5*document.body.clientWidth, 0.5*document.body.clientHeight);
    }
}

window.requestAnimationFrame(test);