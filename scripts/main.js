let canvas = document.getElementById("panel");
let ctx = canvas.getContext("2d");
let unit = 20, drawTime = 100;
let row = 400 / unit, col = 400 / unit;
let snake = [];
let dir = 1; //0:up, 1:right, 2:down, 3:left
let run = true;
let score = 0, peak_score = localStorage.getItem("snake_game_peak_score") || 0;
let scoreText = document.querySelector(".current"), peakScoreText = document.querySelector(".peak");

function initSnake() {
    snake[0] = {
        x: unit * 3,
        y: 0,
    };

    snake[1] = {
        x: unit * 2,
        y: 0,
    };

    snake[2] = {
        x: unit,
        y: 0,
    };

    snake[3] = {
        x: 0,
        y: 0,
    };
}

class Fruit {
    constructor() {
        do {
            this.x = Math.floor(Math.random() * col) * unit;
            this.y = Math.floor(Math.random() * row) * unit;
        } while(snake.some(bodyPart => bodyPart.x == this.x && bodyPart.y == this.y));
    }

    drawFruit() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, unit, unit);
    }

    checkEaten() {
        if (snake[0].x == fruit.x && snake[0].y == fruit.y) {
            score++;
            scoreText.innerHTML = `<i class="fa-solid fa-star"></i> Current Score: ${score}`;
            snake.push({
                x: snake[snake.length - 1].x,
                y: snake[snake.length - 1].y,
            });
            fruit = new Fruit();
        }
    }
}

peakScoreText.innerHTML = `<i class="fa-solid fa-trophy"></i> Peak Score: ${peak_score}`;
let fruit = new Fruit();
initSnake();
function draw() {
    checkHitSelf();
    drawBackground();
    fruit.drawFruit();

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) ctx.fillStyle = "lightgreen";
        else ctx.fillStyle = "lightblue";
        ctx.strokeStyle = "white";

        checkThroughWall(i);

        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit)
    }
    
    fruit.checkEaten();
    move();
}

window.addEventListener("keydown", e => {
    changeDir(e.key);
});

function changeDir(key) {
    switch (key) {
        case 'w':
        case "ArrowUp":
            if (dir != 2) dir = 0;
            break;
        case 'a':
        case "ArrowLeft":
            if (dir != 1) dir = 3;
            break;
        case 's':
        case "ArrowDown":
            if (dir != 0) dir = 2;
            break;
        case 'd':
        case "ArrowRight":
            if (dir != 3) dir = 1;
            break;
    }
}

function checkThroughWall(i) {
    if (snake[i].x > 380) snake[i].x = 0;
    else if (snake[i].x < 0) snake[i].x = 380;

    if (snake[i].y > 380) snake[i].y = 0;
    else if (snake[i].y < 0) snake[i].y = 380;
}

function drawBackground() {
    ctx.fillStyle = "rgb(2, 27, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function move() {
    let nextMove = { x: snake[0].x, y: snake[0].y };

    switch (dir) {
        case 0:
            nextMove.y -= unit;
            break;
        case 1:
            nextMove.x += unit;
            break;
        case 2:
            nextMove.y += unit;
            break;
        case 3:
            nextMove.x -= unit;
            break;
    }

    snake.unshift(nextMove)
    snake.pop();
}

function checkHitSelf() {
    snake.forEach((e, i) => {
        if (e.x == snake[0].x && e.y == snake[0].y && i != 0) {
            if(score > peak_score) {
                localStorage.setItem("snake_game_peak_score", score);
                peak_score = score;
                peakScoreText.innerHTML = `<i class="fa-solid fa-trophy"></i> Peak Score: ${peak_score}`
                window.alert("You break your record!!!!!!");
            }

            clearInterval(game);
            window.alert("Game Over!");
            return;
        }
    })
}

let game = setInterval(draw, drawTime);