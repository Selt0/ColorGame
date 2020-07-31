// INTRO MESSAGE

playNow = document.querySelector('#playNow');

playNow.onclick = function () {
  document.querySelector('#welcome').classList.add('animate__animated', 'animate__fadeOutUp');

  playRound(6);
  setTimeout(function () {
    document.querySelector('.welcome').style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    document.querySelector('#body').style.backgroundColor = '#232323';
  }, 1000);
};

const squares = document.querySelectorAll('.square');
const rgbHeader = document.querySelector('#rgb');
const hexHeader = document.querySelector('#hex');
const message = document.querySelector('#message');
const header = document.querySelector('header');
const newColorbtn = document.querySelector('#newColor');
const hardbtn = document.querySelector('#hard');
const easybtn = document.querySelector('#easy');
const hardSquares = document.querySelectorAll('.hard');

newColorbtn.onclick = function () {
  hardbtn.classList.contains('active') ? playRound(6) : playRound(3);
  newColorbtn.textContent = 'New colors';
  message.textContent = '';

  removeAnimation();
};

easybtn.onclick = function () {
  this.classList.remove('btn-secondary');
  this.classList.add('btn-primary', 'active');

  hardbtn.classList.remove('btn-primary', 'active');
  hardbtn.classList.add('btn-secondary');
  removeAnimation();
  message.textContent = '';
  newColorbtn.textContent = 'New colors';

  hardSquares.forEach((square) => {
    square.classList.add('animate__animated', 'animate__backOutDown');
  });

  easybtn.disabled = true;
  hardbtn.disabled = false;
  playRound(3);
};

hardbtn.onclick = function () {
  this.classList.remove('btn-secondary');
  this.classList.add('btn-primary', 'active');

  easybtn.classList.remove('btn-primary', 'active');
  easybtn.classList.add('btn-secondary');
  removeAnimation();
  message.textContent = '';
  newColorbtn.textContent = 'New colors';

  hardSquares.forEach((square) => {
    square.classList.remove('animate__backOutDown');
    square.classList.add('animate__backInUp');
  });

  hardbtn.disabled = true;
  easybtn.disabled = false;
  playRound(6);
};

function playRound(n) {
  let colors = generateRandomColors(n);
  let pickedColor = colors[Math.floor(Math.random() * colors.length)];
  header.style.backgroundColor = '#6c757d';
  hexHeader.textContent = pickedColor;
  rgbHeader.textContent = convertToRGB(pickedColor.slice(1));

  // JS uses RGB
  pickedColor = rgbHeader.textContent;

  for (let i = 0; i < squares.length; i++) {
    // add a color to each square
    squares[i].style.backgroundColor = colors[i];

    // add click listeners
    squares[i].onclick = function () {
      if (pickedColor == this.style.backgroundColor) {
        message.textContent = 'Correct!';
        changeColors(pickedColor);
        newColorbtn.textContent = 'Play again?';
      } else {
        this.classList.add('animate__animated', 'animate__bounceOut');
        message.textContent = 'Try Again';
      }
    };
  }
}

function generateRandomColors(n) {
  let colors = [];
  for (let i = 0; i < n; i++) {
    // get random color and push into array
    colors.push(`#${randomHexColor()}`);
  }

  return colors;

  function randomHexColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
}

function convertToRGB(color) {
  let aRgbHex = color.match(/.{1,2}/g);
  return `rgb(${parseInt(aRgbHex[0], 16)}, ${parseInt(aRgbHex[1], 16)}, ${parseInt(
    aRgbHex[2],
    16
  )})`;
}

function changeColors(color) {
  // loop through all squares
  squares.forEach((square) => {
    // change squares to correct color
    square.style.backgroundColor = color;
  });

  header.style.backgroundColor = color;
}

function removeAnimation() {
  squares.forEach((square) => {
    if (square.classList.contains('animate__bounceOut')) {
      square.classList.remove('animate__animated', 'animate__bounceOut');
    }
  });
}
