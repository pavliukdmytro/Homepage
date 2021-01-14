const canvas = document.querySelector(".animation-of-balls");
const ctx = canvas.getContext("2d");

const numberBalls = 20;
let balls = [];

function setCanvasSize() {
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
}

function createRandomColor() {
    const red = Math.floor( Math.random() * 255 );
    const green = Math.floor( Math.random() * 255 );
    const blue = Math.floor( Math.random() * 255 );
    const alpha = Math.random().toFixed(1);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function createRandomRadius() {
    return Math.floor( Math.random() * 40 );
}

function createRect(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius,0,2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function createRandomPosition() {
    const x = Math.floor( Math.random() * document.documentElement.scrollWidth);
    const y = Math.floor( Math.random() * document.documentElement.scrollHeight);
    return {x,y}
}

function createBalls() {
    for (let i = 0; i < numberBalls; i++) {
        const radius = createRandomRadius();
        balls.push({
            ...createRandomPosition(radius),
            radius,
            color: createRandomColor(),
            moveLeft: Math.round(Math.random() * 1),
            moveTop: Math.round(Math.random() * 1),
        });
    }
}

function drawBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach( ({ x, y, radius, color }) => {
        createRect(x, y, radius, color);
    })
}

function changeBallsPosition() {
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;

    balls = balls.map( ({x, y, moveLeft, moveTop, ...ball}) => {

        if (moveLeft) {             // move left
            if (x > 0) {
                x--;
            } else if (x <= 0) {
                x++;
                moveLeft = 0;
            }
        } else if (!moveLeft) {     // move right
            if (x < pageWidth) {
                x++;
            } else if (x >= pageWidth) {
                x--;
                moveLeft = 1;
            }
        }

        if (moveTop) {              // move top
            // console.log(y);
            if (y > 0) {
                y--;
            } else if (y <= 0) {
                y++;
                moveTop = 0;
            }
        } else if (!moveTop) {      // move down
            if (y < pageHeight) {
                y++;
            } else if (y >= pageHeight) {
                y--;
                moveTop = 1;
            }
        }

        return {...ball, x, y, moveLeft, moveTop}
    });
}

function draw() {
    changeBallsPosition();
    drawBalls();
    requestAnimationFrame(draw);
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);
createBalls();
drawBalls();

requestAnimationFrame(draw);