// Navbar scroll state
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => navbar.classList.toggle('open'));
navbar.querySelectorAll('.nav-links a').forEach((a) =>
  a.addEventListener('click', () => navbar.classList.remove('open'))
);

// Scroll reveal
const targets = document.querySelectorAll('.section, .hero-inner');
targets.forEach((el) => el.setAttribute('data-reveal', ''));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
targets.forEach((el) => io.observe(el));
