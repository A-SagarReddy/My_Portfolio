// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Prevent background scroll when menu is open on mobile
    if (window.innerWidth <= 768) {
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
  });
  // Close menu when a nav link is clicked (mobile UX)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// Prevent double-tap zoom on buttons/links (mobile)
document.addEventListener('touchstart', function(e) {
  if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
    e.preventDefault();
    e.target.click();
  }
}, { passive: false });

// Typewriter Effect
const typedText = document.querySelector('.typed-text');
const phrases = [
  "Aspiring Full Stack Developer",
  "Clean Code Enthusiast",
  "Lifelong Learner",
  "Creative Problem Solver"
];
let i = 0, j = 0, currentPhrase = [], isDeleting = false;

function loop() {
  typedText.textContent = currentPhrase.join('');
  if (!isDeleting && j <= phrases[i].length) {
    currentPhrase.push(phrases[i][j++]);
  } else if (isDeleting && j > 0) {
    currentPhrase.pop();
    j--;
  }

  if (j === phrases[i].length && !isDeleting) {
    isDeleting = true;
    setTimeout(loop, 1000);
    return;
  } else if (isDeleting && j === 0) {
    currentPhrase = [];
    isDeleting = false;
    i = (i + 1) % phrases.length;
  }

  setTimeout(loop, isDeleting ? 50 : 100);
}
loop();

// Scroll animations
const sections = document.querySelectorAll('.section, .project-card, .skill-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Vanta background: Always enable, even on mobile
function enableVanta() {
  if (window.VANTA && window.VANTA.NET) {
    if (window.vantaEffect && typeof window.vantaEffect.destroy === 'function') {
      window.vantaEffect.destroy();
    }
    window.vantaEffect = window.VANTA.NET({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x004c3f,
      backgroundColor: 0x0a0a0a,
      points: 10.0,
      spacing: 20.0,
      maxDistance: 20.0
    });
  }
}

window.addEventListener('DOMContentLoaded', enableVanta);
window.addEventListener('resize', enableVanta);

// Smooth scroll for anchor links (improves button response)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav if open
      if (window.innerWidth <= 1024) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    }
  });
});
