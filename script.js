const nav = document.querySelector('.header__wrapper');
const navBtn = document.querySelector('.header__nav-btn');
const headerNotice = document.querySelector('.header__notice');

// Nav btn click event: Toggle nav menu
navBtn.addEventListener('click', toggleNav);

// Close the nav using escape key
window.addEventListener('keydown', e => {
  e.key === 'Escape' && nav.classList.contains('header__wrapper--active') && toggleNav();
});

// Close the nav when click on the nav background
nav.addEventListener('click', e => {
  // click on the buttons or button box
  if (e.target.closest('.header__auth') === document.querySelector('.header__auth')) {
    headerNotice.textContent = '* This feature will be available soon.';
    headerNotice.style.cssText += 'color: red; font-size: 20px;';
    return;
  }
  headerNotice.textContent = '';
  nav.classList.contains('header__wrapper--active') && toggleNav();
});

function toggleNav() {
  nav.classList.toggle('header__wrapper--active');
  navBtn.classList.toggle('header__nav-btn--active');
}

// CLIENT SECTION
const arrLeft = document.querySelector('.clients__arr-left');
const arrRight = document.querySelector('.clients__arr-right');
const cardContainer = document.querySelector('.clients__content');
const cards = document.querySelectorAll('.clients__content .card');
// the number of moves cand be make each side
// eg: if there are 5 cards -> moveMax each side is 2. if 7 cards --> 3
const moveMax = Math.floor(cards.length / 2);

let gap = 0;
let cardWidth = 0;
let stepDistance = 0;
let step = 0;

updateParameter(); // calculate stepDistance

function move() {
  cardContainer.style.transform = `translateX(${step * stepDistance}px)`;
}

function updateParameter() {
  gap = window.getComputedStyle(cardContainer).columnGap;
  cardWidth = window.getComputedStyle(cards[0]).width;
  stepDistance = parseInt(cardWidth) + parseInt(gap);
}

function validMove(arrow, otherArrow) {
  if (Math.abs(step) === moveMax) {
    // arrow.style.display = 'none';
    arrow.style.visibility = 'hidden';
  }
  otherArrow.style.visibility = 'visible';
  //   otherArrow.style.display = 'inline';
}

// Event Listener
arrLeft.addEventListener('click', () => {
  step++;
  validMove(arrLeft, arrRight);
  move();
});

arrRight.addEventListener('click', () => {
  step--;
  validMove(arrRight, arrLeft);
  move();
});

window.addEventListener('resize', () => {
  updateParameter();
});
