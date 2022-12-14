document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  const width = 10;
  let speed = 800;

  let nextRandom = 0;
  let timerId;
  let score = 0;
  
  const colors = [
    "red",
    "blue",
    "yellow",
    "pink",
    "green",
    "green",
    "white",    
  ];

  // Tetrimino
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  const lReverseTetromino = [
    [0, 1, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, width * 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [width + 2, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  const tTetrimino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];
  const zTetrimino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];
  const zReverseTetrimino = [
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
  ];
  const oTetrimino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const iTetrimino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];
  const iShortTetrimino = [
    [1, width + 1, width * 2 + 1],
    [width, width + 1, width + 2],
    [1, width + 1, width * 2 + 1],
    [width, width + 1, width + 2],
  ];

  const theTetrominoes = [
    lTetromino,
    lReverseTetromino,
    tTetrimino,
    zTetrimino,
    zReverseTetrimino,
    oTetrimino,
    iTetrimino,
    // iShortTetrimino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theTetrominoes.length);
  console.log(random);
  let current = theTetrominoes[random][currentRotation];

  // draw the Tetrimino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  }
  //timer auto start game flow
  // timerId = setInterval(moveDown, 1000);

  //assign functions to the keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keyup", control);

  //move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }
  // freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      // start a new tetromino falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }
  // move left unless is at the edge or there is a blockage
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isAtLeftEdge) currentPosition -= 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }
  // move right unless is at the edge or there is a blockage
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!isAtRightEdge) currentPosition += 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }
  // rotate the tetromino
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  //show up-next tetromino in mini-grind
  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  const displayIndex = 0;

  // the Tetrominos without rotation
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
    [0, 1, displayWidth + 1, displayWidth * 2 + 1], //lReverseTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetrimino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetrimino
    [2, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1], //zReverseTetrimino
    [0, 1, displayWidth, displayWidth + 1], //oTetrimino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetrimino
    [1, displayWidth + 1, displayWidth * 2 + 1], //iShortTetrimino
  ];
  //display the shape in the mini-grid display
  function displayShape() {
    //remove any trace of a tetromino from entire grid
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });
    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[nextRandom];
    });
  }

  //add functionality to the start button
  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, speed);
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      displayShape();
    }
  });
  //add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;

        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoveed = squares.splice(i, width);
        squares = squaresRemoveed.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }
  //game over
  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      if (score >= 1000) {
        scoreDisplay.innerHTML = `<br><span>
          ${score} 
           GAME OVER - YOU WON!!! AND WEPT, FOR THERE WERE NO MORE WORLDS TO CONQUER.</span>`;
        clearInterval(timerId);
      } else {
        scoreDisplay.innerHTML = score + " GAME OVER";
        clearInterval(timerId);
      }
    }
  }

  //Speed Up
  setInterval(speedUp, 5000);
  function speedUp() {
    if ((score >= 100) & (speed === 800)) {
      speed -= 100;
      clearInterval(timerId);
      timerId = null;
      timerId = setInterval(moveDown, speed);
    }
    if ((score >= 200) & (speed === 700)) {
      speed -= 50;
      clearInterval(timerId);
      timerId = null;
      timerId = setInterval(moveDown, speed);
    }
    if ((score >= 300) & (speed === 650)) {
      speed -= 50;
      clearInterval(timerId);
      timerId = null;
      timerId = setInterval(moveDown, speed);
    }
    if ((score >= 400) & (speed === 600)) {
      speed -= 50;
      clearInterval(timerId);
      timerId = null;
      timerId = setInterval(moveDown, speed);
    }
    if ((score >= 500) & (speed === 550)) {
      speed -= 50;
      clearInterval(timerId);
      timerId = null;
      timerId = setInterval(moveDown, speed);
    }
    if ((score >= 600) & (speed === 500)) {
      speed -= 100;
      clearInterval(timerId);
      timerId = null;
      timerId = setInterval(moveDown, speed);
    }
    if ((score >= 700) & (speed === 400)) {
      speed -= 100;
      clearInterval(timerId);
      timerId = null;
      timerId = setInterval(moveDown, speed);
    }
    if ((score >= 800) & (speed === 300)) {
      speed -= 100;
      clearInterval(timerId);
      timerId = null;
      timerId = setInterval(moveDown, speed);
    }
    if ((score >= 900) & (speed === 200)) {
      speed -= 50;
      clearInterval(timerId);
      timerId = null;
      timerId = setInterval(moveDown, speed);
    }
    console.log(score);
    console.log(speed);
  }
});
