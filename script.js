  /*mobile menu toggle*/
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Close the mobile menu whenever a link is clicked
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

  /* hero image slider*/

function setupFadeSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  let current = 0;

  function showSlide(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  // Hook up the prev/next buttons that point at this slider
  document.querySelectorAll(`[data-slider="${sliderId}"]`).forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('next')) showSlide(current + 1);
      else showSlide(current - 1);
    });
  });

  // Auto-advance every 5 seconds
  setInterval(() => showSlide(current + 1), 5000);
}

setupFadeSlider('heroSlider');

  /* artwork slider*/

function setupTrackSlider(wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;

  const track = wrapper.querySelector('.art-track');
  const slides = wrapper.querySelectorAll('.art-slide');
  let current = 0;

  function update() {
    track.style.transform = `translateX(-${current * (100 / slides.length)}%)`;
  }

  document.querySelectorAll(`[data-slider="${wrapperId}"]`).forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('next')) {
        current = (current + 1) % slides.length;
      } else {
        current = (current - 1 + slides.length) % slides.length;
      }
      update();
    });
  });
}

setupTrackSlider('artSlider');

  /* contact form*/
const contactForm = document.getElementById('contactForm');

  /* footer*/
document.getElementById('year').textContent = new Date().getFullYear();