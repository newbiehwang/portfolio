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

// Project detail page — full-screen transition (View Transitions + Back button)
(function () {
  const page = document.getElementById('projectModal');
  if (!page) return;
  const backBtn = document.getElementById('modalClose');
  const mMedia = document.getElementById('modalMedia');
  const mImg = document.getElementById('modalImg');
  const mPeriod = document.getElementById('modalPeriod');
  const mTitle = document.getElementById('modalTitle');
  const mTags = document.getElementById('modalTags');
  const mDetail = document.getElementById('modalDetail');

  const supportsVT = typeof document.startViewTransition === 'function';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!supportsVT) document.documentElement.classList.add('no-vt');

  let lastCard = null;
  let isOpen = false;

  function fill(card) {
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
  }

  function transition(mutate) {
    if (supportsVT && !reduce) return document.startViewTransition(mutate);
    mutate();
    return { finished: Promise.resolve() };
  }

  function open(card) {
    if (isOpen) return;
    isOpen = true;
    lastCard = card;
    document.documentElement.dataset.vt = 'open';
    const t = transition(() => {
      fill(card);
      page.hidden = false;
      page.scrollTop = 0;
      document.body.classList.add('modal-open');
    });
    history.pushState({ projectPage: true }, '');
    t.finished.finally(() => {
      delete document.documentElement.dataset.vt;
      backBtn.focus();
    });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    document.documentElement.dataset.vt = 'close';
    const t = transition(() => {
      page.hidden = true;
      document.body.classList.remove('modal-open');
    });
    t.finished.finally(() => {
      delete document.documentElement.dataset.vt;
      if (lastCard) lastCard.focus();
    });
  }

  // Close by going back in history so the browser Back button works too
  function requestClose() {
    if (history.state && history.state.projectPage) history.back();
    else close();
  }

  document.querySelectorAll('.project-card').forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'link');
    card.addEventListener('click', () => open(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(card);
      }
    });
  });

  backBtn.addEventListener('click', requestClose);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) requestClose();
  });
  window.addEventListener('popstate', () => {
    if (isOpen) close();
  });
})();
