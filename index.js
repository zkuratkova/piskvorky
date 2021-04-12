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
    }
  });
});
