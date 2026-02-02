// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    valentineName: "Szonja",

    // The title that appears in the browser tab
    pageTitle: "Leszel a Valentinom 26-ban is? 💝",

    // Floating emojis that appear in the background
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🧸', '🐻']
    },

    // Questions and answers
    questions: {
        first: {
            text: "Kedvelsz engem?",
            yesBtn: "Igen",
            noBtn: "Nem",
            secretAnswer: "Nem kedvellek , szeretlek ❤️"
        },
        second: {
            text: "Mennyire szeretsz?",
            startText: "Ennyire!",
            nextBtn: "Folytatás ❤️"
        },
        third: {
            text: "Február 8 csak a miénk lesz? 🌹",
            yesBtn: "Igen!",
            noBtn: "Nem"
        }
    },

    // Love meter messages
    loveMessages: {
        extreme: "Wow, ez már talán az enyém fele?? 🥰🚀💝",
        high: "A végtelenbe és tovább! 🚀💝",
        normal: "Nagyon! 🥰"
    },

    // First celebration screen
    celebration: {
        title: "Teringettét ennek a felem sem tréfa, nagyon szerencsés vagyok 🎉💝💖💝💓",
        message: "A meglepetésed egy Aroma Terápiás masszázs",
        emojis: "🎁💖🤗💝💋❤️💕",
        nextBtn: "És még valami 💌"
    },

    // Second celebration screen 💖
    secondCelebration: {
        title: "Még valami💕",
        message: "Egy vacsi egy titkos helyen hihi, nagyon Szeretlek❤️",
        emojis: "💖✨🥰💝💫"
    },

    // Color scheme
    colors: {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    },

    // Animation settings
    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },

    // Background Music (Optional)
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;
