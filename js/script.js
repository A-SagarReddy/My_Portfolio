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

  setTimeout(loop, isDeleting ? 75 : 150);
}
loop();

// Scroll animations
const sections = document.querySelectorAll('.section, .project-card, .skill-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target); // Stop watching once revealed
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
      maxDistance: 20.0,
      fpsLimit: 20 // Limit frames per second to reduce GPU load
    });
  }
}

window.addEventListener('DOMContentLoaded', enableVanta);
let resizeTimeout;
window.addEventListener('resize', () => {
  if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
  resizeTimeout = requestAnimationFrame(() => {
    enableVanta();
  });
});

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

// Fast click implementation for all buttons to eliminate mobile delay
document.querySelectorAll('.btn').forEach(btn => {
  // Touch event handler
  btn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    this.classList.add('active');
    this.click();
  }, { passive: false });
  
  // Mouse event handler for consistency
  btn.addEventListener('mousedown', function() {
    this.classList.add('active');
  });
  
  // Remove active class on release
  btn.addEventListener('touchend', function() {
    this.classList.remove('active');
  });
  
  btn.addEventListener('mouseup', function() {
    this.classList.remove('active');
  });
  
  btn.addEventListener('mouseleave', function() {
    this.classList.remove('active');
  });
});