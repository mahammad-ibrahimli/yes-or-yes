/* ── Config ── */
const WARN_AFTER = 3;   // attempts before warning appears
const warningMessages = [
  "The cat is NOT impressed. Try again! 😤",
  "Still trying to say NO?! How dare you! 😾",
  "The cat demands you reconsider. NOW. 🐱‍👤",
  "NO is not an option. The cat has spoken. 😼",
  "Seriously?! The cat is calling reinforcements! 🐱",
];

/* ── State ── */
let attempts = 0;
let noIsFixed = false;
let soundPlayed = false;

/* ── Element refs ── */
const btnNo       = document.getElementById('btnNo');
const btnYes      = document.getElementById('btnYes');
const warningBox  = document.getElementById('warningBox');
const warningText = document.getElementById('warningText');
const attemptsLbl = document.getElementById('attemptsLabel');
const successScr  = document.getElementById('success-screen');
const heartsBg    = document.getElementById('heartsBg');
const meowSound   = document.getElementById('meowSound');
const catMeow     = document.getElementById('catMeow');
const flashOverlay = document.getElementById('flashOverlay');

/* ────────────────────────────────────────────
   Floating background hearts
─────────────────────────────────────────── */
const HEART_CHARS = ['💕', '💖', '💗', '💝', '💓', '💘', '🌸', '✨'];

function spawnBgHeart() {
  const el = document.createElement('span');
  el.className = 'heart-particle';
  el.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 8;
  const delay = Math.random() * 4;
  el.style.cssText = `left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s`;
  heartsBg.appendChild(el);
  setTimeout(() => el.remove(), (duration + delay) * 1000);
}

// Seed a few hearts immediately, then keep spawning
for (let i = 0; i < 12; i++) spawnBgHeart();
setInterval(spawnBgHeart, 900);

/* ────────────────────────────────────────────
   NO button – escape on hover
─────────────────────────────────────────── */
function moveNoButton() {
  // Use conservative percentage range to keep button well away from edges
  const minPercent = 25;
  const maxPercent = 75;

  const newLeft = minPercent + Math.random() * (maxPercent - minPercent);
  const newTop = minPercent + Math.random() * (maxPercent - minPercent);

  btnNo.style.left = newLeft + '%';
  btnNo.style.top = newTop + '%';
}

function activateNoEscape() {
  if (noIsFixed) return;
  noIsFixed = true;

  // Set initial safe center position before removing in-flow class
  btnNo.style.left = '50%';
  btnNo.style.top = '50%';

  // Remove in-flow class to switch to fixed positioning
  btnNo.classList.remove('in-flow');

  // Move to random position
  moveNoButton();
}

btnNo.addEventListener('mouseenter', () => {
  activateNoEscape();
  attempts++;
  moveNoButton();
  updateAttempts();
});

// Touch support: move on touchstart so it dodges before the tap registers
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  activateNoEscape();
  attempts++;
  moveNoButton();
  updateAttempts();
}, { passive: false });

function updateAttempts() {
  // Remove attempts label text
  attemptsLbl.textContent = '';

  if (attempts >= WARN_AFTER) {
    // Play flash sound only once when cat first appears
    if (!soundPlayed) {
      console.log('Attempting to play flash sound...');
      // Trigger flash effect and sound simultaneously
      flashOverlay.classList.add('active');
      setTimeout(() => {
        flashOverlay.classList.remove('active');
      }, 1500);

      meowSound.currentTime = 0;
      meowSound.play().then(() => {
        console.log('Flash sound played successfully');
      }).catch(e => {
        console.log('Audio play failed:', e);
      });

      // Play meow sound when cat appears
      catMeow.currentTime = 0;
      catMeow.play().then(() => {
        console.log('Meow sound played successfully');
      }).catch(e => {
        console.log('Meow play failed:', e);
      });

      soundPlayed = true;
    }

    // Show cat after flash effect starts
    warningBox.classList.add('visible');
    const msgIdx = Math.min(attempts - WARN_AFTER, warningMessages.length - 1);
    warningText.textContent = warningMessages[msgIdx];
    // Re-trigger shake animation
    warningBox.style.animation = 'none';
    warningBox.offsetHeight; // reflow
    warningBox.style.animation = '';
  }
}

/* ────────────────────────────────────────────
   YES button – success screen
─────────────────────────────────────────── */
btnYes.addEventListener('click', (e) => {
  burstHearts(e.clientX, e.clientY);
  setTimeout(() => {
    successScr.classList.add('visible');
    launchSuccessHearts();
  }, 400);
});

function burstHearts(cx, cy) {
  const count = 16;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'heart-burst';
    el.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
    const angle = (i / count) * 2 * Math.PI;
    const dist  = 80 + Math.random() * 120;
    el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    el.style.left = cx + 'px';
    el.style.top  = cy + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}

function launchSuccessHearts() {
  for (let i = 0; i < 20; i++) spawnBgHeart();
  setInterval(spawnBgHeart, 400);
}

/* ────────────────────────────────────────────
   Resize guard – reposition NO if it's fixed
─────────────────────────────────────────── */
window.addEventListener('resize', () => {
  if (noIsFixed) moveNoButton();
});
