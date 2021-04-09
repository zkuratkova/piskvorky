'use strict';
console.log('Funguju');

let player = 'circle';
let playerElm = document.querySelector('#player');

const switchPlayer = () => {
  if (player === 'circle') {
    player = 'cross';
    playerElm.src = 'images/cross.svg';
  } else {
    player = 'circle';
    playerElm.src = 'images/circle.svg';
  }
};
