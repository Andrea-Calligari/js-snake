// VARIABLES
var fieldSnake;
var context;
var blockSize = 30;
var fieldCol = 25;
var fieldRow = 20;
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var cornerRadius = 24;

var foodX = blockSize * 10;
var foodY = blockSize * 10;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];
var gameOver = false;
var pointsCounter = 0;
//

const pointEl = document.getElementById('points');
const buttonRetry = document.getElementById('retry').addEventListener('click', () => {
    window.location.reload();
});

window.onload = function () {
    fieldSnake = document.getElementById('field');
    fieldSnake.height = fieldRow * blockSize;
    fieldSnake.width = fieldCol * blockSize;
    context = fieldSnake.getContext('2d');
    placeFood();
    document.addEventListener('keyup', changeDirection);
    setInterval(update, 1000 / 10);

}
// FUNCTIONS

function placeFood() {
    foodX = Math.floor(Math.random() * fieldCol) * blockSize;
    foodY = Math.floor(Math.random() * fieldRow) * blockSize;
}

function changeDirection(e) {
    if (e.code == 'ArrowUp' && velocityY == 0) {
        velocityX = 0;
        velocityY = -1;

    } else if (e.code == 'ArrowDown' && velocityY == 0) {
        velocityX = 0;
        velocityY = 1;

    } else if (e.code == 'ArrowLeft' && velocityX == 0) {
        velocityX = -1;
        velocityY = 0;

    } else if (e.code == 'ArrowRight' && velocityX == 0) {
        velocityX = 1;
        velocityY = 0;
    }
}


function update() {
   if(gameOver){
    return;
   }
    context.fillStyle = 'black';
    context.fillRect(0, 0, fieldSnake.width, fieldSnake.height);
    context.fillStyle = 'lime';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //snake create
    context.fillStyle = 'yellow';
    context.arcTo(snakeX + blockSize, snakeY, snakeX + blockSize, snakeY + cornerRadius, cornerRadius);
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //food ate control
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        pointsCounter++;
        placeFood();


    }
    //update snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    //update snake head
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;



    //game over conditions
    if (snakeX < 0 || snakeX >= fieldCol * blockSize || snakeY < 0 || snakeY >= fieldRow * blockSize) {
        gameOver = true;
        let liString = `<li class="bg-black">You lose with ${pointsCounter} points</li>`;
        pointEl.innerHTML = liString;


    } else {
        pointEl.innerHTML = `<li>Points ${pointsCounter}</li>`;

    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            let liString = `<li>You lose with ${pointsCounter} points</li>`;
            pointEl.innerHTML = liString;
        }
    }


}

