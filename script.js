/* ────────────────────────────────────────────
   i18n Translation System
─────────────────────────────────────────── */
const translations = {
  en: {
    langName: "English",
    welcomeTitle: "15 Second IQ Test",
    welcomeIntro: "Hello _______,<br>this is just a 15 second IQ test.",
    welcomeNote: "Note: Wrong answers restart the test.",
    startTest: "Start Test",
    continue: "Continue",
    selectLanguage: "Select Language / Dil Seçin",
    questions: [
      "2 + 2 = 4?",
      "Do you like cats?",
      "Correct choices are green?"
    ],
    yes: "YES",
    no: "NO",
    feedbackTrue: "True!",
    feedbackFalse: "False!",
    timeUp: "Time's up!",
    finalTitle: "Will you be my girlfriend?",
    finalTitleWithName: "Will you be my lover,<br>{name}? 💕",
    subtitle: "Choose wisely… 😉",
    warningTitle: "😾 Really?! You're trying to say NO?!",
    warningText: "The cat is NOT impressed. Try again!",
    successTitle: "She said YES! 🎉",
    successMessage: "You made the best decision of your life! 💕<br>I promise to make every moment magical. 🌹"
  },
  az: {
    langName: "Azərbaycan",
    welcomeTitle: "15 Saniyəlik IQ Testi",
    welcomeIntro: "Salam _______,<br>bu sadəcə 15 saniyəlik IQ testidir.",
    welcomeNote: "Qeyd: Səhv cavablar testi yenidən başladır.",
    startTest: "Testə Başla",
    continue: "Davam Et",
    selectLanguage: "Dil Seçin / Select Language",
    questions: [
      "2 + 2 = 4?",
      "Pişikləri sevirsənmi?",
      "Doğru seçimlər yaşıl rəngdə olur?"
    ],
    yes: "BƏLİ",
    no: "Xeyr",
    feedbackTrue: "Doğru!",
    feedbackFalse: "Səhv!",
    timeUp: "Vaxt bitdi!",
    finalTitle: "Mənim sevgilim olacaqsan?",
    finalTitleWithName: "Mənim sevgilim olacaqsan,<br>{name}? 💕",
    subtitle: "Ağılla seç… 😉",
    warningTitle: "😾 Həqiqətən?! Xeyr deməyə çalışırsan?!",
    warningText: "Pişik heç təəssüflənmir. Bir daha cəhd et!",
    successTitle: "O BƏLİ dedi! 🎉",
    successMessage: "Həyatının ən yaxşı qərarını verdin! 💕<br>Hər anı sehrli edəcəyimə söz verirəm. 🌹"
  },
  tr: {
    langName: "Türkçe",
    welcomeTitle: "15 Saniyelik IQ Testi",
    welcomeIntro: "Merhaba _______,<br>bu sadece 15 saniyelik bir IQ testidir.",
    welcomeNote: "Not: Yanlış cevaplar testi yeniden başlatır.",
    startTest: "Teste Başla",
    continue: "Devam Et",
    selectLanguage: "Dil Seçin / Select Language",
    questions: [
      "2 + 2 = 4?",
      "Kedileri sever misin?",
      "Doğru seçimler yeşil renkte olur?"
    ],
    yes: "EVET",
    no: "HAYIR",
    feedbackTrue: "Doğru!",
    feedbackFalse: "Yanlış!",
    timeUp: "Süre doldu!",
    finalTitle: "Benim sevgilim olur musun?",
    finalTitleWithName: "Benim sevgilim olur musun,<br>{name}? 💕",
    subtitle: "Akıllıca seç… 😉",
    warningTitle: "😾 Gerçekten mi?! HAYIR demeye mi çalışıyorsun?!",
    warningText: "Kedi hiç etkilenmedi. Tekrar dene!",
    successTitle: "O EVET Dedi! 🎉",
    successMessage: "Hayatının en iyi kararını verdin! 💕<br>Her anı büyülü yapacağıma söz veriyorum. 🌹"
  },
  ru: {
    langName: "Русский",
    welcomeTitle: "15-секундный IQ-тест",
    welcomeIntro: "Привет _______,<br>это всего лишь 15-секундный IQ-тест.",
    welcomeNote: "Примечание: Неправильные ответы перезапускают тест.",
    startTest: "Начать тест",
    continue: "Продолжить",
    selectLanguage: "Выберите язык / Dil Seçin",
    questions: [
      "2 + 2 = 4?",
      "Ты любишь кошек?",
      "Правильный выбор зеленого цвета?"
    ],
    yes: "ДА",
    no: "НЕТ",
    feedbackTrue: "Верно!",
    feedbackFalse: "Неверно!",
    timeUp: "Время вышло!",
    finalTitle: "Ты будешь моей девушкой?",
    finalTitleWithName: "Ты будешь со мной,<br>{name}? 💕",
    subtitle: "Выбирай с умом… 😉",
    warningTitle: "😾 Серьезно?! Ты пытаешься сказать НЕТ?!",
    warningText: "Кот не впечатлен. Попробуй еще раз!",
    successTitle: "Она сказала ДА! 🎉",
    successMessage: "Ты принял лучшее решение в своей жизни! 💕<br>Обещаю сделать каждый момент волшебным. 🌹"
  }
};

let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('selectedLanguage', lang);
  applyTranslations();
  
  // Update questions if in test
  if (!iqQuestionScreen.classList.contains('hidden')) {
    showQuestion();
  }
}

function getText(key, replacements = {}) {
  const text = translations[currentLanguage][key] || translations['en'][key];
  let result = text;
  
  // Simple template replacement
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.replace(`{${placeholder}}`, value);
  }
  
  return result;
}

function applyTranslations() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key === 'welcomeIntro' && el.innerHTML.includes('_______')) {
      // Special handling for intro with name placeholder
      const name = userName || "_______";
      const text = getText(key).replace('_______', name);
      el.innerHTML = text;
    } else {
      el.innerHTML = getText(key);
    }
  });
}

/* ────────────────────────────────────────────
   IQ Test Logic
─────────────────────────────────────────── */
const questions = [
  { key: "questions.0", correctAnswer: true },
  { key: "questions.1", correctAnswer: true },
  { key: "questions.2", correctAnswer: true }
];

let currentQuestionIndex = 0;
let timeLeft = 15;
let timerInterval = null;

// Language Selector Elements
const langScreen = document.getElementById('langScreen');
const langButtons = document.querySelectorAll('.lang-btn');
const btnContinue = document.getElementById('btnContinue');

// IQ Test Elements
const iqWelcomeScreen = document.getElementById('iqWelcomeScreen');
const iqQuestionScreen = document.getElementById('iqQuestionScreen');
const mainCard = document.getElementById('mainCard');
const btnStartTest = document.getElementById('btnStartTest');

// Language Switchers
const langSwitcherWelcome = document.getElementById('langSwitcherWelcome');
const langSwitcherTest = document.getElementById('langSwitcherTest');
const langSwitcherFinal = document.getElementById('langSwitcherFinal');

// Load configuration from config.js
const userName = CONFIG?.userName || "_______";
const YOUR_EMAIL_ADDRESS = CONFIG?.yourEmail || "your-email@example.com";
const EMAILJS_PUBLIC_KEY = CONFIG?.emailjs?.publicKey || "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = CONFIG?.emailjs?.serviceId || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = CONFIG?.emailjs?.templateId || "YOUR_TEMPLATE_ID";
const iqQuestionText = document.getElementById('iqQuestionText');
const btnYesIQ = document.getElementById('btnYesIQ');
const btnNoIQ = document.getElementById('btnNoIQ');
const timerFill = document.getElementById('timerFill');
const timerText = document.getElementById('timerText');
const feedback = document.getElementById('feedback');
const loseSound = document.getElementById('loseSound');

// Language Selector Logic
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    langButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setLanguage(btn.dataset.lang);
  });
});

btnContinue.addEventListener('click', () => {
  langScreen.classList.add('hidden');
  
  // Return to the screen we were on before
  if (previousScreenBeforeLang === 'test') {
    iqQuestionScreen.classList.remove('hidden');
    // Refresh question text in new language without restarting
    iqQuestionText.textContent = getQuestionText(currentQuestionIndex);
    applyTranslations();
  } else if (previousScreenBeforeLang === 'final') {
    mainCard.classList.remove('hidden');
    applyTranslations();
    // Update final title with name
    const h1 = mainCard.querySelector('h1');
    h1.innerHTML = getText('finalTitleWithName', { name: userName });
  } else {
    // Default to welcome screen
    iqWelcomeScreen.classList.remove('hidden');
    applyTranslations();
  }
  
  previousScreenBeforeLang = null;
});

// Language Switcher Logic
function showLangSelector() {
  // Remember which screen was visible
  if (!iqWelcomeScreen.classList.contains('hidden')) {
    previousScreenBeforeLang = 'welcome';
    iqWelcomeScreen.classList.add('hidden');
  } else if (!iqQuestionScreen.classList.contains('hidden')) {
    previousScreenBeforeLang = 'test';
    iqQuestionScreen.classList.add('hidden');
  } else if (!mainCard.classList.contains('hidden')) {
    previousScreenBeforeLang = 'final';
    mainCard.classList.add('hidden');
  } else {
    previousScreenBeforeLang = 'welcome';
  }
  
  langScreen.classList.remove('hidden');
  // Update active state
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
  });
}

if (langSwitcherWelcome) langSwitcherWelcome.addEventListener('click', showLangSelector);
if (langSwitcherTest) langSwitcherTest.addEventListener('click', showLangSelector);
if (langSwitcherFinal) langSwitcherFinal.addEventListener('click', showLangSelector);

// Initialize EmailJS
(function() {
  // Only initialize if public key is set (not the placeholder)
  if (EMAILJS_PUBLIC_KEY && !EMAILJS_PUBLIC_KEY.includes("YOUR_")) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

// Function to send email notification when YES is clicked
function sendYesNotification() {
  // Skip if not configured yet
  if (EMAILJS_PUBLIC_KEY.includes("YOUR_") || 
      EMAILJS_SERVICE_ID.includes("YOUR_") || 
      EMAILJS_TEMPLATE_ID.includes("YOUR_")) {
    console.log("EmailJS not configured yet. Please set up your EmailJS credentials.");
    return;
  }
  
  const templateParams = {
    to_email: YOUR_EMAIL_ADDRESS,
    from_name: "Yes or Yes Website",
    user_name: userName,
    message: `${userName} "YES" button clicked! 🎉`,
    time: new Date().toLocaleString()
  };
  
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function(response) {
      console.log("Email sent successfully!", response.status, response.text);
    }, function(error) {
      console.error("Failed to send email:", error);
    });
}

// Check if language was previously selected
if (currentLanguage && localStorage.getItem('selectedLanguage')) {
  // Skip to welcome screen if language already selected
  langScreen.classList.add('hidden');
  iqQuestionScreen.classList.add('hidden');
  iqWelcomeScreen.classList.remove('hidden');
  applyTranslations();
}

// Start Test
btnStartTest.addEventListener('click', () => {
  startIQTest();
});

function startIQTest() {
  currentQuestionIndex = 0;
  timeLeft = 15;
  iqWelcomeScreen.classList.add('hidden');
  iqQuestionScreen.classList.remove('hidden');
  updateTimer();
  startTimer();
  showQuestion();
}

function getQuestionText(index) {
  return translations[currentLanguage].questions[index] || translations['en'].questions[index];
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    // All questions answered correctly - show main question
    showFinalQuestion();
    return;
  }

  // Show question (timer continues from previous)
  iqQuestionText.textContent = getQuestionText(currentQuestionIndex);
  feedback.textContent = '';
  feedback.className = 'feedback';
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      onTimeUp();
    }
  }, 1000);
}

function updateTimer() {
  const percentage = (timeLeft / 15) * 100;
  timerFill.style.width = percentage + '%';
  timerText.textContent = timeLeft + 's';
  
  // Change color when low on time
  if (timeLeft <= 5) {
    timerFill.style.background = 'linear-gradient(90deg, #ff5c5c, #e02020)';
  } else {
    timerFill.style.background = 'linear-gradient(90deg, #43d66c, #1db954)';
  }
}

function onTimeUp() {
  // Play losing sound
  loseSound.currentTime = 0;
  loseSound.play().catch(e => console.log('Audio play failed:', e));
  
  feedback.textContent = getText('timeUp');
  feedback.className = 'feedback false';
  
  setTimeout(() => {
    restartTest();
  }, 1500);
}

function checkAnswer(userSaidYes) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  
  if (userSaidYes === correctAnswer) {
    // Correct answer - timer continues!
    feedback.textContent = getText('feedbackTrue');
    feedback.className = 'feedback true';
    
    setTimeout(() => {
      currentQuestionIndex++;
      showQuestion();
    }, 500);
  } else {
    // Wrong answer - stop timer and restart
    clearInterval(timerInterval);
    
    feedback.textContent = getText('feedbackFalse');
    feedback.className = 'feedback false';
    
    // Play losing sound
    loseSound.currentTime = 0;
    loseSound.play().catch(e => console.log('Audio play failed:', e));
    
    setTimeout(() => {
      restartTest();
    }, 1500);
  }
}

function restartTest() {
  currentQuestionIndex = 0;
  timeLeft = 15;
  // Don't clear interval, let it restart naturally
  updateTimer();
  // Restart timer
  if (timerInterval) clearInterval(timerInterval);
  startTimer();
  showQuestion();
}

function showFinalQuestion() {
  clearInterval(timerInterval);
  iqQuestionScreen.classList.add('hidden');
  mainCard.classList.remove('hidden');
  
  // Change to pink background
  document.body.classList.add('final-mode');
  
  // Update the question text with user's name using translation
  const h1 = mainCard.querySelector('h1');
  h1.innerHTML = getText('finalTitleWithName', { name: userName });
  
  // Re-apply other translations to final card
  applyTranslations();
}

// IQ Test button handlers
btnYesIQ.addEventListener('click', () => checkAnswer(true));
btnNoIQ.addEventListener('click', () => checkAnswer(false));


/* ── Config ── */
const WARN_AFTER = 5;   // attempts before warning appears
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
let flashOccurred = false;
let previousScreenBeforeLang = null;

/* ── Element refs ── */
const btnNo       = document.getElementById('btnNo');
const btnYes      = document.getElementById('btnYes');
const warningBox  = document.getElementById('warningBox');
const warningText = document.getElementById('warningText');
const attemptsLbl = document.getElementById('attemptsLabel');
const successScr  = document.getElementById('success-screen');
const heartsBg    = document.getElementById('heartsBg');
const meowSound   = document.getElementById('meowSound');
const planktonAugh = document.getElementById('planktonAugh');
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
  // Don't move button after flash effect
  if (!flashOccurred) {
    moveNoButton();
  }
  updateAttempts();

  // After flash effect: hovered button shows YES, other shows NO
  if (flashOccurred) {
    // Check if NO button currently shows NO text before changing
    const currentNoText = getText('no');
    const wasShowingNo = btnNo.textContent.includes(currentNoText);

    // Make NO button show YES (green)
    btnNo.textContent = getText('yes') + ' 💖';
    btnNo.className = 'btn btn-yes in-flow';
    // Make YES button show NO (red)
    btnYes.textContent = getText('no') + ' 😈';
    btnYes.className = 'btn btn-no in-flow';

    // Only shake warning if we were hovering over button that showed NO
    if (wasShowingNo) {
      warningBox.style.animation = 'none';
      warningBox.offsetHeight; // reflow
      warningBox.style.animation = '';
    }
  }
});

// Also swap when hovering over YES button after flash effect
btnYes.addEventListener('mouseenter', () => {
  if (flashOccurred) {
    // Check if YES button currently shows NO text before changing
    const currentNoText = getText('no');
    const wasShowingNo = btnYes.textContent.includes(currentNoText);

    // Make YES button show YES (green)
    btnYes.textContent = getText('yes') + ' 💖';
    btnYes.className = 'btn btn-yes in-flow';
    // Make NO button show NO (red)
    btnNo.textContent = getText('no') + ' 😈';
    btnNo.className = 'btn btn-no in-flow';

    // Only shake warning if we were hovering over button that showed NO
    if (wasShowingNo) {
      warningBox.style.animation = 'none';
      warningBox.offsetHeight; // reflow
      warningBox.style.animation = '';
    }
  }
});

// Touch support: move on touchstart so it dodges before the tap registers
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  activateNoEscape();
  attempts++;
  // Don't move button after flash effect
  if (!flashOccurred) {
    moveNoButton();
  }
  updateAttempts();

  // After flash effect: hovered button shows YES, other shows NO
  if (flashOccurred) {
    // Make NO button show YES (green)
    btnNo.textContent = getText('yes') + ' 💖';
    btnNo.className = 'btn btn-yes in-flow';
    // Make YES button show NO (red)
    btnYes.textContent = getText('no') + ' 😈';
    btnYes.className = 'btn btn-no in-flow';
  }
}, { passive: false });

// Touch support for YES button
btnYes.addEventListener('touchstart', (e) => {
  if (flashOccurred) {
    // Make YES button show YES (green)
    btnYes.textContent = getText('yes') + ' 💖';
    btnYes.className = 'btn btn-yes in-flow';
    // Make NO button show NO (red)
    btnNo.textContent = getText('no') + ' 😈';
    btnNo.className = 'btn btn-no in-flow';
  }
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
      flashOccurred = true;
      setTimeout(() => {
        flashOverlay.classList.remove('active');
      }, 1500);

      meowSound.currentTime = 0;
      meowSound.play().then(() => {
        console.log('Flash sound played successfully');
      }).catch(e => {
        console.log('Audio play failed:', e);
      });

      // Play plankton augh sound 0.5s after flash effect starts
      setTimeout(() => {
        planktonAugh.currentTime = 0;
        planktonAugh.play().then(() => {
          console.log('Plankton augh sound played successfully');
        }).catch(e => {
          console.log('Plankton augh play failed:', e);
        });
      }, 500);

      // Add in-flow class to NO button to keep it in normal flow after flash
      btnNo.classList.add('in-flow');

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
  // After flash effect, both buttons trigger YES success screen
  if (flashOccurred) {
    sendYesNotification(); // Send email notification
    burstHearts(e.clientX, e.clientY);
    setTimeout(() => {
      successScr.classList.add('visible');
      launchSuccessHearts();
    }, 400);
  } else {
    // Before flash, only trigger if button has YES text
    if (btnYes.classList.contains('btn-yes')) {
      sendYesNotification(); // Send email notification
      burstHearts(e.clientX, e.clientY);
      setTimeout(() => {
        successScr.classList.add('visible');
        launchSuccessHearts();
      }, 400);
    }
  }
});

// Also add click handler to btnNo
btnNo.addEventListener('click', (e) => {
  // After flash effect, both buttons trigger YES success screen
  if (flashOccurred) {
    sendYesNotification(); // Send email notification
    burstHearts(e.clientX, e.clientY);
    setTimeout(() => {
      successScr.classList.add('visible');
      launchSuccessHearts();
    }, 400);
  } else {
    // Before flash, only trigger if button has YES text
    if (btnNo.classList.contains('btn-yes')) {
      sendYesNotification(); // Send email notification
      burstHearts(e.clientX, e.clientY);
      setTimeout(() => {
        successScr.classList.add('visible');
        launchSuccessHearts();
      }, 400);
    }
  }
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
