// Año footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

if (burger && menu) {
  burger.addEventListener('click', () => menu.classList.toggle('show'));

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('show'));
  });
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Carruseles (vanilla)
function setupCarousel(root) {
  const track = root.querySelector('.track');
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  if (!track || !prev || !next) return;

  const scrollAmount = () => {
    const first = track.querySelector('.slide');
    if (!first) return 300;

    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || 0) || 14;
    return first.getBoundingClientRect().width + gap;
  };

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  // Swipe/drag simple en móvil (pointer events)
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener('pointerdown', (e) => {
    isDown = true;
    startX = e.pageX;
    scrollLeft = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const walk = (e.pageX - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });

  track.addEventListener('pointerup', () => (isDown = false));
  track.addEventListener('pointercancel', () => (isDown = false));
  track.addEventListener('mouseleave', () => (isDown = false));
}

document.querySelectorAll('[data-carousel]').forEach(setupCarousel);

// Formulario (demo)
const contactForm = document.getElementById('contactForm');
const formHint = document.getElementById('formHint');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formHint) {
      formHint.textContent = 'Listo 🙂 aquí conectas tu backend (PHP/Node) para enviar correo o guardar en BD.';
    }
    contactForm.reset();
  });
}
