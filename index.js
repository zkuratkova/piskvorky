'use strict';
console.log('Funguju');

let player = 'circle';
const playerElm = document.querySelector('#player');
const btnElm = document.querySelectorAll('.field__cell');

const switchPlayer = () => {
  if (player === 'circle') {
    player = 'cross';
    playerElm.src = 'images/cross.svg';
  } else {
    player = 'circle';
    playerElm.src = 'images/circle.svg';
  }
};

btnElm.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    if (
      !event.target.classList.contains('field__cell--circle') &&
      !event.target.classList.contains('field__cell--cross')
    ) {
      if (player === 'circle') {
        event.target.classList.add('field__cell--circle');
      } else {
        event.target.classList.add('field__cell--cross');
      }
      event.target.setAttribute('disabled', '');
      switchPlayer();
      isWinningMove(event.target);
      if (isWinningMove(event.target) === true) {
        if (getSymbol(event.target) === 'circle') {
          setTimeout(() => {
            winner('Zvítězilo kolečko. Odveta?');
          }, 150);
        } else if (getSymbol(event.target) === 'cross') {
          setTimeout(() => {
            winner('Zvítězil křížek. Odveta?');
          }, 150);
        }
      }
    }
  });
});

//confirm

const winner = (message) => {
  let ok = confirm(message);
  if (ok === true) {
    location.reload();
  }
};

//Funkce na získání pozice pole//////////////////////////

const fieldSize = 10;

const getPosition = (cell) => {
  let cellIndex = 0;
  while (cellIndex < btnElm.length) {
    if (cell === btnElm[cellIndex]) {
      break;
    }
    cellIndex++;
  }

  return {
    row: Math.floor(cellIndex / fieldSize),
    column: cellIndex % fieldSize,
  };
};

console.log(getPosition(btnElm[0]));

//Funkce na získání prvku/////////////////////////////

const getCell = (row, column) => btnElm[row * fieldSize + column];

console.log(getCell(2, 3));

//Funkce na získání symbolu//////////////////////////

const getSymbol = (cell) => {
  if (cell.classList.contains('field__cell--circle')) {
    return 'circle';
  } else if (cell.classList.contains('field__cell--cross')) {
    return 'cross';
  }
};

// Kdo vyhrál?///////////////////////////

const symbolsToWin = 5;
const isWinningMove = (cell) => {
  const origin = getPosition(cell);
  const symbol = getSymbol(cell);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getCell(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < fieldSize - 1 &&
    symbol === getSymbol(getCell(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getCell(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < fieldSize - 1 &&
    symbol === getSymbol(getCell(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  let j;
  let inDiagonalX = 1;
  /////////////////////////////////////////////////////////////////////////////////////////
  // diagonála zleva nahoru -- OK
  j = origin.row;
  i = origin.column;
  while (
    j < fieldSize - 1 &&
    i > 0 &&
    symbol === getSymbol(getCell(j + 1, i - 1))
  ) {
    inDiagonalX++;
    j++;
    i--;
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  // diagonála zprava dolů --- OK
  j = origin.row;
  i = origin.column;
  while (
    j > 0 &&
    i < fieldSize - 1 &&
    symbol === getSymbol(getCell(j - 1, i + 1))
  ) {
    inDiagonalX++;
    i++;
    j--;
  }

  if (inDiagonalX >= symbolsToWin) {
    return true;
  }

  let inDiagonalY = 1;
  /////////////////////////////////////////////////////////////////////////////////////////
  // diagonála zleva dolů  --- OK
  j = origin.row;
  i = origin.column;
  while (j > 0 && i > 0 && symbol === getSymbol(getCell(j - 1, i - 1))) {
    inDiagonalY++;
    i--;
    j--;
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  // diagonála zprava nahoru --- OK
  j = origin.row;
  i = origin.column;
  while (
    j < fieldSize - 1 &&
    i < fieldSize - 1 &&
    symbol === getSymbol(getCell(j + 1, i + 1))
  ) {
    inDiagonalY++;
    i++;
    j++;
  }

  if (inDiagonalY >= symbolsToWin) {
    return true;
  }

  return false;
};
