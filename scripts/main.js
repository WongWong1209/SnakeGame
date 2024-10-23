let canvas = document.getElementById("panel");
let ctx = canvas.getContext("2d");
let unit = 20;
let row = 400 / unit, col = 400 / unit;
let snake = [];
let dir = 1; //0:up, 1:right, 2:down, 3:left
let run = true;

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

initSnake();
function draw() {
    checkHitSelf();
    drawBackground();

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) ctx.fillStyle = "lightgreen";
        else ctx.fillStyle = "lightblue";
        ctx.strokeStyle = "white";

        checkThroughWall(i);
    
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit)
    }

    move();
}

window.addEventListener("keydown", e => {
    switch(e.key) {
        case 'w':
            if(dir != 2) dir = 0;
            break;
        case 'a':
            if(dir != 1) dir = 3;
            break;
        case 's':
            if(dir != 0) dir = 2;
            break;
        case 'd':
            if(dir != 3) dir = 1;
            break;
    }
})

function checkThroughWall(i) {
    if(snake[i].x > 400) snake[i].x = 0;
    else if(snake[i].x < 0) snake[i].x = 400;

    if(snake[i].y > 400) snake[i].y = 0;
    else if(snake[i].y < 0) snake[i].y = 400;
}

function drawBackground() {
    ctx.fillStyle = "rgb(2, 27, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function move() {
    let nextMove = {x: snake[0].x, y: snake[0].y};

    switch(dir) {
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
        if(e.x == snake[0].x && e.y == snake[0].y && i != 0) {
            clearInterval(game);
            window.alert("Game Over!");
            return;
        }
    })
}

function pause() {
    run = !run;
    if(run) game = setInterval(draw, 50);
    else clearInterval(game);
}

let game = setInterval(draw, 50);