// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "Szonja";
    }

    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;
    
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    createFloatingElements();
    setupMusicPlayer();
});

// Floating emojis
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears].forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'heart slow-float';
        div.innerHTML = emoji;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 15 + Math.random() * 25 + 's';
}

function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const section = document.getElementById(`question${questionNumber}`);
    section.classList.remove('hidden');
    section.classList.add('fade');
}

function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

loveMeter.addEventListener('input', () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;
    
    if (value > 100) {
        extraLove.classList.remove('hidden');
        const overflowPercentage = (value - 100) / 9900;
        const extraWidth = overflowPercentage * window.innerWidth * 0.8;
        loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
        
        if (value >= 5000) {
            extraLove.classList.add('super-love');
            extraLove.textContent = config.loveMessages.extreme;
        } else if (value > 1000) {
            extraLove.textContent = config.loveMessages.high;
        } else {
            extraLove.textContent = config.loveMessages.normal;
        }
    } else {
        extraLove.classList.add('hidden');
        loveMeter.style.width = '100%';
    }
});

window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

// Celebration sequence 🎉
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    celebration.classList.add('fade');

    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    let nextBtn = document.getElementById('nextCelebrationBtn');
    if (!nextBtn) {
        nextBtn = document.createElement('button');
        nextBtn.id = 'nextCelebrationBtn';
        nextBtn.className = 'btn';
        nextBtn.textContent = config.celebration.nextBtn || "One more thing 💌";
        celebration.appendChild(nextBtn);
    }

    nextBtn.onclick = showSecondCelebration;

    createHeartExplosion(40);
}

// Final emotional screen 💖
function showSecondCelebration() {
    const celebration = document.getElementById('celebration');
    celebration.classList.add('fade');

    document.getElementById('celebrationTitle').textContent = config.secondCelebration.title;
    document.getElementById('celebrationMessage').textContent = config.secondCelebration.message;
    document.getElementById('celebrationEmojis').textContent = config.secondCelebration.emojis;

    const btn = document.getElementById('nextCelebrationBtn');
    if (btn) btn.remove();

    createHeartExplosion(80); // stronger emotional punch 🎆
}

// Heart explosion 💥
function createHeartExplosion(count = 40) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart explode';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);

        setTimeout(() => heart.remove(), 4000);
    }
}

// Music
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    if (config.music.autoplay) {
        bgMusic.play().catch(() => {
            musicToggle.textContent = config.music.startText;
        });
    }

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}
