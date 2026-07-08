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

// Project detail modal
(function () {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  const mClose = document.getElementById('modalClose');
  const mMedia = document.getElementById('modalMedia');
  const mImg = document.getElementById('modalImg');
  const mPeriod = document.getElementById('modalPeriod');
  const mTitle = document.getElementById('modalTitle');
  const mTags = document.getElementById('modalTags');
  const mDetail = document.getElementById('modalDetail');
  let lastFocused = null;

  function openModal(card) {
    lastFocused = card;
    mTitle.textContent = card.querySelector('h3').textContent;
    const period = card.querySelector('.project-period');
    mPeriod.textContent = period ? period.textContent : '';
    const tags = card.querySelector('.tags');
    mTags.innerHTML = tags ? tags.innerHTML : '';
    const detail = card.querySelector('.project-detail');
    mDetail.innerHTML = detail ? detail.innerHTML : '';
    const thumb = card.querySelector('.project-thumb img');
    if (thumb) {
      mImg.src = thumb.src;
      mImg.alt = thumb.alt || '';
      mMedia.hidden = false;
    } else {
      mImg.removeAttribute('src');
      mMedia.hidden = true;
    }
    modal.hidden = false;
    document.body.classList.add('modal-open');
    mModalScrollReset();
    mClose.focus();
  }

  function mModalScrollReset() {
    const body = modal.querySelector('.modal-body');
    if (body) body.scrollTop = 0;
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.project-card').forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  mClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();
