// Generate floating hearts
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (5 + Math.random() * 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 9000);
    }, 500);
}

// Generate twinkling stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Show special message
function showMessage() {
    const messageDiv = document.getElementById('special-message');
    if (messageDiv) {
        messageDiv.classList.remove('hidden');
    }
}

// Close special message
function closeMessage() {
    const messageDiv = document.getElementById('special-message');
    if (messageDiv) {
        messageDiv.classList.add('hidden');
    }
}

// Create confetti animation
function createConfetti() {
    const colors = ['#e74c3c', '#f39c12', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 2 + 2;
        const distance = Math.random() * 500 + 300;
        
        confetti.animate([
            {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translateY(${distance}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// Close message when clicking outside
document.addEventListener('click', function(event) {
    const messageDiv = document.getElementById('special-message');
    if (messageDiv && event.target === messageDiv) {
        closeMessage();
    }
});

// Add keyboard support (Escape to close message)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMessage();
    }
});

// Swipe Detection for Video Scene
let touchStartY = 0;
let touchEndY = 0;
let swipeTriggered = false;

function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartY - touchEndY;
    
    if (diff > swipeThreshold && !swipeTriggered) {
        swipeTriggered = true;
        const videoScene = document.querySelector('.video-scene');
        if (videoScene && !videoScene.classList.contains('slide-up')) {
            videoScene.classList.add('slide-up');
            
            // Navigate to main content
            setTimeout(() => {
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.scrollIntoView({ behavior: 'smooth' });
                }
            }, 400);
        }
    }
}

// Touch events for swipe detection
document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
    swipeTriggered = false;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

// Mouse wheel swipe alternative for desktop
let isVideoSceneActive = true;

document.addEventListener('wheel', (e) => {
    if (isVideoSceneActive && e.deltaY > 0) {
        const videoScene = document.querySelector('.video-scene');
        if (videoScene && !videoScene.classList.contains('slide-up')) {
            e.preventDefault();
            videoScene.classList.add('slide-up');
            isVideoSceneActive = false;
            
            setTimeout(() => {
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.scrollIntoView({ behavior: 'smooth' });
                }
            }, 400);
        }
    }
}, { passive: false });

// Keyboard arrow down support
document.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowDown' || e.key === ' ') && isVideoSceneActive) {
        const videoScene = document.querySelector('.video-scene');
        if (videoScene && !videoScene.classList.contains('slide-up')) {
            videoScene.classList.add('slide-up');
            isVideoSceneActive = false;
            
            setTimeout(() => {
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.scrollIntoView({ behavior: 'smooth' });
                }
            }, 400);
        }
    }
});

// Update active nav link
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add interactive click effects to gallery items
function addGalleryInteractivity() {
    const galleryItems = document.querySelectorAll('.gallery-item, .gallery-card');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            createConfetti();
        });
    });
}

// Initialize
if (document.querySelector('.stars')) {
    createStars();
}
if (document.querySelector('.floating-hearts')) {
    createFloatingHearts();
}

updateActiveNavLink();
addGalleryInteractivity();

// Add some floating hearts to other pages
if (!document.querySelector('.floating-hearts') && document.querySelector('.heart-container')) {
    const container = document.querySelector('.heart-container');
    const floatingDiv = document.createElement('div');
    floatingDiv.className = 'floating-hearts';
    container.appendChild(floatingDiv);
    createFloatingHearts();
}
