
// mobile nav//

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // Close the mobile menu when a navigation link is clicked
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}


// hero slider images //

function setupFadeSlider(sliderId) {
  const slider = document.getElementById(sliderId);

  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');

  if (slides.length === 0) return;

  let current = 0;

  function showSlide(index) {
    slides[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
  }

  // connect previous and next buttons to the slider
  document.querySelectorAll(`[data-slider="${sliderId}"]`).forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('next')) {
        showSlide(current + 1);
      } else {
        showSlide(current - 1);
      }
    });
  });

  // automatically advance every 5 seconds
  setInterval(() => {
    showSlide(current + 1);
  }, 5000);
}

setupFadeSlider('heroSlider');


// artwork slider -might not be here anymore idk//

function setupTrackSlider(wrapperId) {
  const wrapper = document.getElementById(wrapperId);

  if (!wrapper) return;

  const track = wrapper.querySelector('.art-track');
  const slides = wrapper.querySelectorAll('.art-slide');

  if (!track || slides.length === 0) return;

  let current = 0;

  function update() {
    track.style.transform = `translateX(-${current * (100 / slides.length)}%)`;
  }

  // connect previous and next buttons to the slider
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


// footer //

const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// photo lightbox - separate galleries with individual navigation//

const galleryGrids = document.querySelectorAll(
  '.gallery-grid, .artwork-grid'
);

if (galleryGrids.length > 0) {

  // create the lightbox container
  const lightbox = document.createElement('div');

  lightbox.className = 'lightbox';

  lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <button class="lightbox-prev">&#10094;</button>

    <div class="lightbox-content">
      <span class="lightbox-label"></span>
      <img src="" alt="">
    </div>

    <button class="lightbox-next">&#10095;</button>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxLabel = lightbox.querySelector('.lightbox-label');

  let currentImages = [];
  let currentImage = 0;


  // expands the selected image and its before/after label
  function showImage(index) {

    if (currentImages.length === 0) return;

    currentImage = (index + currentImages.length) % currentImages.length;

    const img = currentImages[currentImage];

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    // find the BEFORE or AFTER label, if one exists
    const originalLabel = img.closest('.gallery-item')
      ?.querySelector('.gallery-label');

    if (originalLabel) {

      lightboxLabel.textContent = originalLabel.textContent;
      lightboxLabel.className = 'lightbox-label';

      // Apply the gold background to AFTER labels
      if (originalLabel.classList.contains('after-label')) {
        lightboxLabel.classList.add('after-label');
      }

      lightboxLabel.style.display = 'block';

    } else {
      lightboxLabel.style.display = 'none';
    }

    lightbox.classList.add('active');
  }


  // gives each gallery its own set of images
  galleryGrids.forEach((grid) => {

    const images = grid.querySelectorAll('img');

    images.forEach((img, index) => {

      img.addEventListener('click', () => {
        currentImages = Array.from(images);
        showImage(index);
      });

    });

  });


  // lightbox, click to the next image
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
    showImage(currentImage + 1);
  });


  // lightbox, click to the previous image
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
    showImage(currentImage - 1);
  });


  // close the lightbox
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // close the lightbox when clicking the dark background
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });


  // keyboard navigation and closing controls
  document.addEventListener('keydown', (event) => {

    if (!lightbox.classList.contains('active')) return;

    if (event.key === 'Escape') {
      lightbox.classList.remove('active');
    }

    if (event.key === 'ArrowRight') {
      showImage(currentImage + 1);
    }

    if (event.key === 'ArrowLeft') {
      showImage(currentImage - 1);
    }

  });

}


