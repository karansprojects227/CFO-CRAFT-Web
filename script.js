document.addEventListener('DOMContentLoaded', () => {
  // ===== Navbar scroll effect =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ===== Mobile menu toggle =====
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      // Close all open dropdowns when menu closes
      if (!navLinks.classList.contains('active')) {
        document.querySelectorAll('.nav-dropdown-wrap.open').forEach(w => w.classList.remove('open'));
      }
    });
  }

  // ===== Mobile dropdown accordion =====
  document.querySelectorAll('.nav-dropdown-wrap > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only intercept on mobile (when hamburger is visible)
      if (window.innerWidth > 768) return;
      const wrap = link.closest('.nav-dropdown-wrap');
      const dropdown = wrap.querySelector('.nav-dropdown');
      if (!dropdown) return;
      e.preventDefault();
      // Close other open dropdowns (accordion behavior)
      document.querySelectorAll('.nav-dropdown-wrap.open').forEach(w => {
        if (w !== wrap) w.classList.remove('open');
      });
      wrap.classList.toggle('open');
    });
  });

  // ===== Close mobile menu when navigating to a section =====
  if (navLinks && mobileMenuBtn) {
    navLinks.querySelectorAll('a:not(.nav-dropdown-wrap > .nav-link)').forEach(itemLink => {
      itemLink.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mobileMenuBtn.classList.remove('active');
          navLinks.classList.remove('active');
          document.querySelectorAll('.nav-dropdown-wrap.open').forEach(w => w.classList.remove('open'));
        }
      });
    });
  }

  // ===== FAQ Accordion =====
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ===== Counter Animation =====
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = parseFloat(counter.dataset.target);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            if (target % 1 !== 0) {
              counter.textContent = current.toFixed(1);
            } else {
              counter.textContent = Math.floor(current).toLocaleString();
            }
          }, 16);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const metricsGrid = document.querySelector('.metrics-grid');
  if (metricsGrid) counterObserver.observe(metricsGrid);

  // ===== Scroll Reveal Animation =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-row, .team-card, .metric-card, .testimonial-card, .section-heading, .hero-content').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ===== Case Studies Modal & Slider =====
  const csModal = document.getElementById('case-studies-modal');
  const openCsModalBtn = document.getElementById('open-cs-modal');
  const closeCsModalBtn = document.querySelector('.cs-modal-close');
  const csSlider = document.getElementById('cs-slider');
  const csPrevBtn = document.getElementById('cs-prev');
  const csNextBtn = document.getElementById('cs-next');

  let currentSlide = 0;
  const totalSlides = 9;

  function updateSliderPosition() {
    if (csSlider) {
      csSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }

  if (openCsModalBtn && csModal) {
    openCsModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      csModal.classList.add('show');
      updateSliderPosition();
    });
  }

  if (closeCsModalBtn && csModal) {
    closeCsModalBtn.addEventListener('click', () => {
      csModal.classList.remove('show');
    });
  }

  if (csModal) {
    window.addEventListener('click', (e) => {
      if (e.target === csModal) {
        csModal.classList.remove('show');
      }
    });
  }

  if (csNextBtn) {
    csNextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSliderPosition();
    });
  }

  if (csPrevBtn) {
    csPrevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSliderPosition();
    });
  }
});