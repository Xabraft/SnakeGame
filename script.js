const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
let snake = [{x: 150, y: 150}];
let food = null;
let direction = 'right';
let score = 0;

function startGame() {
    createFood();
    document.addEventListener('keydown', changeDirection);
    setInterval(moveSnake, 100);
}

function createFood() {
    if (food) {
        food.element.remove();
    }
    food = {
        x: Math.floor(Math.random() * 30) * 10,
        y: Math.floor(Math.random() * 30) * 10,
        element: document.createElement('div')
    };
    food.element.style.left = `${food.x}px`;
    food.element.style.top = `${food.y}px`;
    food.element.classList.add('food');
    gameBoard.appendChild(food.element);
}

function moveSnake() {
    const head = {...snake[0]};
    switch(direction) {
        case 'up': head.y -= 10; break;
        case 'down': head.y += 10; break;
        case 'left': head.x -= 10; break;
        case 'right': head.x += 10; break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        createFood();
    } else {
        snake.pop();
    }

    updateGameBoard();

    if (isGameOver()) {
        alert(`Partie terminée ! Votre score est ${score}`);
        snake = [{x: 150, y: 150}];
        direction = 'right';
        score = 0;
        scoreElement.textContent = 'Score: 0';
        createFood();
    }
}

function updateGameBoard() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
    gameBoard.appendChild(food.element);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction === 'up';
    const goingDown = direction === 'down';
    const goingLeft = direction === 'left';
    const goingRight = direction === 'right';

    if (keyPressed === 37 && !goingRight) direction = 'left';
    if (keyPressed === 38 && !goingDown) direction = 'up';
    if (keyPressed === 39 && !goingLeft) direction = 'right';
    if (keyPressed === 40 && !goingUp) direction = 'down';
}

function isGameOver() {
    const head = snake[0];
    return (
        head.x < 0 || head.x > 290 || head.y < 0 || head.y > 290 ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

startGame();
