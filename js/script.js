// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
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
