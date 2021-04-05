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
    headerNotice.classList.add('header__notice--active');

    // Set timeout to clear the notification
    setTimeout(() => {
      headerNotice.classList.remove('header__notice--active');
      headerNotice.textContent = '';
    }, 2000);
    return;
  }
  nav.classList.contains('header__wrapper--active') && toggleNav();
});

function toggleNav() {
  nav.classList.toggle('header__wrapper--active');
  navBtn.classList.toggle('header__nav-btn--active');
}

// CLIENT SECTION---------------------------------------------
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

function bntDisableCheck(arrow, otherArrow) {
  Math.abs(step) === moveMax && (arrow.style.visibility = 'hidden');
  otherArrow.style.visibility = 'visible';
}
function isValidMove(step) {
  return Math.abs(step) <= moveMax;
}
function moveLeft() {
  if (!isValidMove(step + 1)) return;
  step++;
  move();
  bntDisableCheck(arrLeft, arrRight);
}
function moveRight() {
  if (!isValidMove(step - 1)) return;
  step--;
  move();
  bntDisableCheck(arrRight, arrLeft);
}
// Event Listener
arrLeft.addEventListener('click', moveLeft);
arrRight.addEventListener('click', moveRight);

// Update stepDistance in case user change screen size
window.addEventListener('resize', () => {
  updateParameter();
});
function updateParameter() {
  gap = window.getComputedStyle(cardContainer).columnGap;
  cardWidth = window.getComputedStyle(cards[0]).width;
  stepDistance = parseInt(cardWidth) + parseInt(gap);
}

// Slide the client cards using keyboard - left / right arrows
const observer = new IntersectionObserver(
  (entries, observer) => {
    //If intersecting  - Add event listenr
    if (entries[0].isIntersecting) {
      window.addEventListener('keydown', moveByKey);
    } else {
      //If not intersecting  - Remove event listenr
      window.removeEventListener('keydown', moveByKey);
    }
  },
  {
    threshold: 0.5,
  }
);

// cant not use cardContainer for this the oberver becase the container will be moved left / right
// difficult to set threshold of the observer.
observer.observe(document.querySelector('.clients__slider'));

function moveByKey(event) {
  event.key === 'ArrowLeft' && moveLeft();
  event.key === 'ArrowRight' && moveRight();
}
