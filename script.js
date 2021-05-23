let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // Render the canvas elements and set a "2D plan"

let box = 32;

let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box
};

/** Setting a random position to food elements on canvas. Math.floor removes decimal part of random number. */
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = "right"; //Initial direction for snake.

/** Grass image from here: http://finalbossblues.com/tiling-tiles/ */
function createBackground() {
    grass = new Image();
    grass.src = './assets/grass.png';
    grass.onload = function () {
        let grassImage = context.createPattern(grass, 'repeat');
        context.fillStyle = grassImage;
    }
    //context.fillStyle = "lightgreen"; // Define a background color of board (use instead grass code above, if you prefer)
    context.fillRect(0, 0, 16 * box, 16 * box); // Set the dimensions of the board. (x,y,w,h)
}

/** Filll the shape of element who represents the snake */
function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "yellow";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

/** Set the "eat" of snake. The tho lines comented (context.fillStyle and context.fillRect) 
 * draw a square in case you prefer to set instead mouse. 
 * Unicode emoji for mouse from here: https://unicode.org/emoji/charts/full-emoji-list.html*/
function drawFood() {
    context.fillText(`\u{1F401}`, food.x, food.y, 100, 100);
    context.font = "30px Times New Roman";
    /* context.fillStyle = `red`;
    context.fillRect(food.x, food.y, box, box); */
}

// Set an event when any key was pressed on.
document.addEventListener('keydown', update);

/** Associates the key event code with posible directions to snake */
function update(event) {
    if (event.keyCode == 37 && direction != "right") {
        direction = 'left';
    }
    if (event.keyCode == 38 && direction != "down") {
        direction = 'up';
    }
    if (event.keyCode == 39 && direction != "left") {
        direction = 'right';
    }
    if (event.keyCode == 40 && direction != "up") {
        direction = 'down';
    }
}

/** Redraw snake when it pass beyond any edge */
function redrawSnakeAfterEdge() {
    if (snake[0].x > 15 * box && direction == "right") {
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == "left") {
        snake[0].x = 16 * box;
    }
    if (snake[0].y > 15 * box && direction == "down") {
        snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == "up") {
        snake[0].y = 16 * box;
    }
}

/** Interrupt game if snake chock itself */
function gameOver() {
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert(`\u{1F40D} Game Over! \u{1F62D}`);
        }
    }
}

function startGame() {

    createBackground();
    createSnake();
    drawFood();
    
    redrawSnakeAfterEdge();

    gameOver();

    let snakeX = snake[0].x; //Initial X position of snake
    let snakeY = snake[0].y; //Initial Y position of snake

    if (direction == "right") {
        snakeX += box;
    }
    if (direction == "left") {
        snakeX -= box;
    }
    if (direction == "up") {
        snakeY -= box;
    }
    if (direction == "down") {
        snakeY += box;
    }

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //Remove last element of array 
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Increase a snake's new head at first element of array
    snake.unshift(newHead);
}

// Monitor's game  to render it about 100 miliseconds interval
let game = setInterval(startGame, 120);

