// Wedding date (change to actual date)
const weddingDate = new Date('December 31, 2026 16:00:00').getTime();

const taglineText = 'Are getting married! 💍✨';
let typeIndex = 0;
const typewriterEl = document.getElementById('typewriter');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        <div><span>${days}</span> Days</div>
        <div><span>${hours}</span> Hours</div>
        <div><span>${minutes}</span> Minutes</div>
        <div><span>${seconds}</span> Seconds</div>
    `;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<div>We are married! 💍✨</div>';
    }
}

function rsvp() {
    confettiExplosion();
    alert('Thank you for coming! 🎉 Your RSVP is confirmed. We can\'t wait to celebrate with you!');
}

function rsvpNo() {
    alert('We understand. Thank you for letting us know. 💕');
}

// Typewriter effect
function typeWriter() {
    if (typeIndex < taglineText.length) {
        typewriterEl.textContent += taglineText.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Magical particles canvas
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = '#ff69b4';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// Floating hearts rain
function createFloatingElement(containerId, emoji) {
    const container = document.getElementById(containerId);
    const element = document.createElement('div');
    element.innerHTML = emoji;
    element.classList.add(emoji === '🌹' ? 'rose-petal' : 'float-heart');
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDuration = (Math.random() * 3 + 4) + 's';
    container.appendChild(element);

    setTimeout(() => element.remove(), 10000);
}

function heartRain() {
    createFloatingElement('hearts-float', '💖');
    if (Math.random() > 0.7) createFloatingElement('rose-petals', '🌹');
}

// Confetti explosion
function confettiExplosion() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '💖', '✨', '💍'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'fixed';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.fontSize = '1rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `floatUp 3s linear forwards, spin 3s linear`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// Add spin keyframe (injected via JS for simplicity)
const style = document.createElement('style');
style.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(720deg); } }`;
document.head.appendChild(style);

// Init on load
typeWriter();
initParticles();
heartRain();
setInterval(heartRain, 1000);

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call
