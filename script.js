document.addEventListener("DOMContentLoaded", () => {
  // ===== Navbar scroll effect =====
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // ===== Mobile menu toggle =====
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
      // Close all open dropdowns when menu closes
      if (!navLinks.classList.contains("active")) {
        document
          .querySelectorAll(".nav-dropdown-wrap.open")
          .forEach((w) => w.classList.remove("open"));
      }
    });
  }

  // ===== Mobile dropdown accordion =====
  document
    .querySelectorAll(".nav-dropdown-wrap > .nav-link")
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        // Only intercept on mobile (when hamburger is visible)
        if (window.innerWidth > 768) return;
        const wrap = link.closest(".nav-dropdown-wrap");
        const dropdown = wrap.querySelector(".nav-dropdown");
        if (!dropdown) return;
        e.preventDefault();
        // Close other open dropdowns (accordion behavior)
        document.querySelectorAll(".nav-dropdown-wrap.open").forEach((w) => {
          if (w !== wrap) w.classList.remove("open");
        });
        wrap.classList.toggle("open");
      });
    });

  // ===== Close mobile menu when navigating to a section =====
  if (navLinks && mobileMenuBtn) {
    navLinks
      .querySelectorAll("a:not(.nav-dropdown-wrap > .nav-link)")
      .forEach((itemLink) => {
        itemLink.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            mobileMenuBtn.classList.remove("active");
            navLinks.classList.remove("active");
            document
              .querySelectorAll(".nav-dropdown-wrap.open")
              .forEach((w) => w.classList.remove("open"));
          }
        });
      });
  }

  // ===== FAQ Accordion =====
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains("open");
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  // ===== Counter Animation =====
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".counter");
          counters.forEach((counter) => {
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
    },
    { threshold: 0.3 },
  );

  const metricsGrid = document.querySelector(".metrics-grid");
  if (metricsGrid) counterObserver.observe(metricsGrid);

  // ===== Scroll Reveal Animation =====
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(
      ".feature-row, .team-card, .metric-card, .testimonial-card, .section-heading, .hero-content",
    )
    .forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });

  // ===== Case Studies Modal & Slider =====
  const csModal = document.getElementById("case-studies-modal");
  const openCsModalBtn = document.getElementById("open-cs-modal");
  const closeCsModalBtn = document.querySelector(".cs-modal-close");
  const csSlider = document.getElementById("cs-slider");
  const csPrevBtn = document.getElementById("cs-prev");
  const csNextBtn = document.getElementById("cs-next");

  let currentSlide = 0;
  const totalSlides = 9;

  function updateSliderPosition() {
    if (csSlider) {
      csSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }

  if (openCsModalBtn && csModal) {
    openCsModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      csModal.classList.add("show");
      updateSliderPosition();
    });
  }

  if (closeCsModalBtn && csModal) {
    closeCsModalBtn.addEventListener("click", () => {
      csModal.classList.remove("show");
    });
  }

  if (csModal) {
    window.addEventListener("click", (e) => {
      if (e.target === csModal) {
        csModal.classList.remove("show");
      }
    });
  }

  if (csNextBtn) {
    csNextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSliderPosition();
    });
  }

  if (csPrevBtn) {
    csPrevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSliderPosition();
    });
  }
});

/* ==========================================================================
   ANIMATED SVG DASHBOARD EMBEDS
   Each supplied standalone dashboard is loaded into an isolated srcdoc iframe.
   This keeps every supplied SVG's own styles, IDs and JavaScript animations fully
   functional without colliding with the existing website CSS/JS.
   ========================================================================== */
const CFOCRAFT_DASHBOARD_DOCUMENTS = {
  manufacturing: String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>CFO CRAFT — Manufacturing Finance Dashboard</title>
    <style>
      * {
        box-sizing: border-box;
      }
      html,
      body {
        margin: 0;
        padding: 0;
        background: #fff;
      }
      body {
        font-family: Inter, Arial, Helvetica, sans-serif;
      }
      .stage {
        width: 800px;
        max-width: 100vw;
        margin: 0 auto;
      }
      svg {
        display: block;
        width: 100%;
        height: auto;
        overflow: hidden;
      }
      text {
        font-family: Inter, Arial, Helvetica, sans-serif;
      }
      .title {
        font-weight: 800;
        fill: #143451;
      }
      .semi {
        font-weight: 700;
        fill: #183a58;
      }
      .muted {
        font-weight: 500;
        fill: #718294;
      }
      .micro {
        font-size: 4.8px;
        font-weight: 500;
        fill: #8493a0;
      }
      .tiny {
        font-size: 4.35px;
        font-weight: 500;
        fill: #8997a4;
      }

      /* animation */
      .counter {
        font-variant-numeric: tabular-nums;
      }
      .bar {
        transform-box: fill-box;
        transform-origin: bottom;
      }

      @media (prefers-reduced-motion: reduce) {
        .bar,
        .spark,
        .floatA,
        .floatB {
          animation: none !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <svg
        viewBox="0 0 800 450"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CFO CRAFT manufacturing finance dashboard"
      >
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#073f91" />
            <stop offset=".50" stop-color="#063778" />
            <stop offset="1" stop-color="#082e65" />
          </linearGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="1" stop-color="#f9fbfd" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow
              dx="0"
              dy="5"
              stdDeviation="7"
              flood-color="#03265c"
              flood-opacity=".26"
            />
          </filter>
          <filter id="smallShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="4"
              flood-color="#0a315b"
              flood-opacity=".18"
            />
          </filter>

          <!-- Hard clipping keeps every internal dashboard element inside its card -->
          <clipPath id="dashboardClip">
            <rect x="76" y="42" width="650" height="370" rx="14" />
          </clipPath>
        </defs>

        <!-- ===================== BACKGROUND ===================== -->
        <rect width="800" height="450" rx="23" fill="url(#bg)" />
        <g fill="none" stroke="#a8d0ff" stroke-opacity=".16" stroke-width="1">
          <path d="M-115 45C70-35 230-25 360 83" />
          <path d="M-122 91C70 2 252 10 395 118" />
          <path d="M-100 144C86 67 269 73 414 176" />
          <path d="M430-35C606-6 738 79 828 189" />
          <path d="M-55 357C93 297 218 318 320 403" />
          <path d="M530 345C654 351 760 401 839 472" />
        </g>

        <!-- ===================== MAIN DASHBOARD ===================== -->
        <rect
          x="76"
          y="42"
          width="650"
          height="370"
          rx="14"
          fill="url(#paper)"
          filter="url(#shadow)"
        />

        <g clip-path="url(#dashboardClip)">
          <!-- HEADER -->
          <rect x="91" y="57" width="29" height="29" rx="6" fill="#eaf3ff" />
          <path d="M98 78V68h5v6h5v-9h5v13z" fill="#2879ca" />
          <text x="127" y="69" class="title" font-size="14.1">Manufacturing Finance</text>
          <text x="127" y="80.5" class="muted" font-size="6.6">Plant economics, margins, capex and working capital</text>

          <rect
            x="492"
            y="55"
            width="111"
            height="22"
            rx="5"
            fill="#fff"
            stroke="#e7edf2"
          />
          <text
            x="501"
            y="65.5"
            font-size="5.55"
            font-weight="700"
            fill="#596d7e"
          >Q1 FY27 (Apr–Jun 2026)</text>
          <path
            d="M593 64l2 2 2-2"
            fill="none"
            stroke="#83909d"
            stroke-width=".7"
          />
          <rect x="467" y="79" width="136" height="11" rx="4" fill="#f7f9fb" />
          <text x="535" y="86.2" text-anchor="middle" class="tiny">Illustrative dashboard with sample data, not client results</text>

          <!-- ================= KPI ROW ================= -->

          <!-- Revenue -->
          <rect
            x="91"
            y="94"
            width="151"
            height="59"
            rx="8"
            fill="#fff"
            stroke="#e4eaf0"
          />
          <circle cx="106" cy="110" r="9" fill="#eaf3ff" />
          <path d="M101 115v-6h3v4h3v-7h3v9z" fill="#2878c9" />
          <text x="120" y="107" class="muted" font-size="6.05">Revenue, Q1</text>
          <text x="120" y="122" class="title" font-size="14.2">₹<tspan class="counter" data-target="12.5" data-decimals="1">12.5</tspan> Cr</text>

          <!-- proper upward trend icon -->
          <g transform="translate(120 126)">
            <circle cx="3.8" cy="3.8" r="3.8" fill="#e7f7ef" />
            <path
              d="M2 5.4L5.4 2M3.7 2h1.7v1.7"
              fill="none"
              stroke="#299d73"
              stroke-width=".8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <text
            x="128"
            y="133.6"
            font-size="5.25"
            font-weight="700"
            fill="#299d73"
          >12.6% QoQ</text>
          <text x="120" y="143" class="micro">₹11.1 Cr Q4 FY26</text>
          <g class="sparkChart"><path d="M194.0 136.0 C195.2 135.8 198.8 135.8 201.2 134.8 C203.6 133.8 206.0 131.4 208.4 130.0 C210.8 128.6 213.2 127.6 215.6 126.4 C218.0 125.2 220.4 124.2 222.8 122.8 C225.2 121.4 228.8 118.8 230.0 118.0 V138.5 H194z" fill="#e3f5ec"/><path d="M194.0 136.0 C195.2 135.8 198.8 135.8 201.2 134.8 C203.6 133.8 206.0 131.4 208.4 130.0 C210.8 128.6 213.2 127.6 215.6 126.4 C218.0 125.2 220.4 124.2 222.8 122.8 C225.2 121.4 228.8 118.8 230.0 118.0" fill="none" stroke="#2f9e6c" stroke-width="1.2" stroke-linecap="round" class="spark"/><circle cx="230.0" cy="118.0" r="1.6" fill="#2f9e6c"/></g>

          <!-- Gross margin -->
          <rect
            x="247"
            y="94"
            width="151"
            height="59"
            rx="8"
            fill="#fff"
            stroke="#e4eaf0"
          />
          <circle cx="262" cy="110" r="9" fill="#e7f7ef" />
          <text x="257" y="114" font-size="9" font-weight="800" fill="#36a77d">%</text>
          <text x="276" y="107" class="muted" font-size="6.05">Gross margin</text>
          <text x="276" y="122" class="title" font-size="14.2"><tspan class="counter" data-target="28" data-decimals="1">28.0</tspan>%</text>
          <g transform="translate(276 126)">
            <circle cx="3.8" cy="3.8" r="3.8" fill="#e7f7ef" />
            <path
              d="M2 5.4L5.4 2M3.7 2h1.7v1.7"
              fill="none"
              stroke="#299d73"
              stroke-width=".8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <text
            x="284"
            y="133.6"
            font-size="5.25"
            font-weight="700"
            fill="#299d73"
          >1.5 pts QoQ</text>
          <text x="276" y="143" class="micro">Q4 FY26: 26.5%</text>
          <g class="bar" fill="#55b889">
            <rect x="356" y="135" width="4" height="5" rx="1" />
            <rect x="363" y="132" width="4" height="8" rx="1" />
            <rect x="370" y="128" width="4" height="12" rx="1" />
            <rect x="377" y="123" width="4" height="17" rx="1" />
          </g>

          <!-- Inventory days -->
          <rect
            x="403"
            y="94"
            width="151"
            height="59"
            rx="8"
            fill="#fff"
            stroke="#e4eaf0"
          />
          <circle cx="418" cy="110" r="9" fill="#fff3df" />
          <path
            d="M414 108l4-4 4 4M414 112l4 4 4-4"
            fill="none"
            stroke="#eaa044"
            stroke-width="1.1"
            stroke-linecap="round"
          />
          <text x="432" y="107" class="muted" font-size="6.05">Inventory days</text>
          <text x="432" y="122" class="title" font-size="14.2"><tspan class="counter" data-target="91" data-decimals="0">91</tspan></text>
          <g transform="translate(432 126)">
            <circle cx="3.8" cy="3.8" r="3.8" fill="#e7f7ef" />
            <path
              d="M2 2l3.4 3.4M3.7 5.4h1.7V3.7"
              fill="none"
              stroke="#299d73"
              stroke-width=".8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <text
            x="440"
            y="133.6"
            font-size="5.25"
            font-weight="700"
            fill="#299d73"
          >4 days vs Mar</text>
          <text x="432" y="143" class="micro">Mar 2026: 95 days</text>
          <g class="sparkChart"><path d="M508.0 121.0 C509.2 121.4 512.8 122.1 515.2 123.3 C517.6 124.4 520.0 126.7 522.4 127.9 C524.8 129.0 527.2 129.0 529.6 130.1 C532.0 131.3 534.4 133.6 536.8 134.7 C539.2 135.9 542.8 136.6 544.0 137.0 V139.5 H508z" fill="#e3f5ec"/><path d="M508.0 121.0 C509.2 121.4 512.8 122.1 515.2 123.3 C517.6 124.4 520.0 126.7 522.4 127.9 C524.8 129.0 527.2 129.0 529.6 130.1 C532.0 131.3 534.4 133.6 536.8 134.7 C539.2 135.9 542.8 136.6 544.0 137.0" fill="none" stroke="#2f9e6c" stroke-width="1.2" stroke-linecap="round" class="spark"/><circle cx="544.0" cy="137.0" r="1.6" fill="#2f9e6c"/></g>

          <!-- Capex ROI -->
          <rect
            x="559"
            y="94"
            width="153"
            height="59"
            rx="8"
            fill="#fff"
            stroke="#e4eaf0"
          />
          <circle cx="574" cy="110" r="9" fill="#eaf3ff" />
          <path d="M571 106h6v9h-6zM572 104h4v2h-4z" fill="#2b7cc9" />
          <text x="588" y="107" class="muted" font-size="6.05">Capex ROI</text>
          <text x="588" y="122" class="title" font-size="14.2"><tspan class="counter" data-target="24" data-decimals="0">24</tspan>%</text>
          <text x="588" y="134" class="muted" font-size="5.25">Expected, pre-tax</text>
          <text x="588" y="143" class="micro">₹1.2 Cr p.a. on ₹5 Cr</text>
          <g class="bar" fill="#5798db">
            <rect x="677" y="135" width="4" height="5" rx="1" />
            <rect x="684" y="132" width="4" height="8" rx="1" />
            <rect x="691" y="128" width="4" height="12" rx="1" />
            <rect x="698" y="123" width="4" height="17" rx="1" />
          </g>

          <!-- ================= LOWER ROW ================= -->

          <!-- EBITDA -->
          <rect
            x="91"
            y="162"
            width="188"
            height="147"
            rx="8"
            fill="#fff"
            stroke="#e4eaf0"
          />
          <text x="102" y="177" class="title" font-size="8.05">Plant EBITDA margin</text>
          <text x="185" y="177" class="micro" transform="translate(20 0)">Q1 FY27, after allocated costs</text>
          <g stroke="#edf1f4" stroke-width=".8">
            <line x1="108" y1="202.00" x2="267" y2="202.00" />
            <line x1="108" y1="222.75" x2="267" y2="222.75" />
            <line x1="108" y1="243.50" x2="267" y2="243.50" />
            <line x1="108" y1="264.25" x2="267" y2="264.25" />
          </g>
          <text x="105" y="203.60" text-anchor="end" class="micro">20%</text>
          <text x="105" y="224.35" text-anchor="end" class="micro">15%</text>
          <text x="105" y="245.10" text-anchor="end" class="micro">10%</text>
          <text x="105" y="265.85" text-anchor="end" class="micro">5%</text>
          <text x="105" y="286.6" text-anchor="end" class="micro">0%</text>
          <line x1="108" y1="285" x2="267" y2="285" stroke="#dfe6eb" />
          <g class="bar"><rect x="131" y="210.30" width="20" height="74.70" rx="2" fill="#2378c9" /></g>
          <g class="bar d1"><rect x="177" y="226.90" width="20" height="58.10" rx="2" fill="#2378c9" /></g>
          <g class="bar d2"><rect x="221" y="251.80" width="20" height="33.20" rx="2" fill="#f1a844" /></g>
          <text x="141" y="207.30" text-anchor="middle" class="semi" font-size="6.4">18%</text>
          <text x="187" y="223.90" text-anchor="middle" class="semi" font-size="6.4">14%</text>
          <text x="231" y="248.80" text-anchor="middle" font-size="6.4" font-weight="700" fill="#8d6a39">8%</text>
          <text x="141" y="294" text-anchor="middle" class="micro">Plant A</text>
          <text x="187" y="294" text-anchor="middle" class="micro">Plant B</text>
          <text x="231" y="294" text-anchor="middle" class="micro">Plant C</text>
          <text x="124" y="303" text-anchor="end" class="micro">Revenue</text>
          <text x="141" y="303" text-anchor="middle" class="micro">₹5.5 Cr</text>
          <text x="187" y="303" text-anchor="middle" class="micro">₹4.2 Cr</text>
          <text x="231" y="303" text-anchor="middle" font-size="4.8" font-weight="600" fill="#df8e3c">₹2.8 Cr</text>
          <!-- =====================================================
     BOM / PRODUCT COSTING & BOM VARIANCE
===================================================== -->

          <rect
            x="285"
            y="162"
            width="188"
            height="147"
            rx="8"
            fill="#fff"
            stroke="#e4eaf0"
          />

          <!-- Title -->
          <text x="296" y="177" class="title" font-size="8.05">Product costing and BOM variance</text>

          <!-- Unit -->
          <text x="445" y="177" class="micro" transform="translate(10 0)">₹ Cr</text>

          <!-- =====================================================
     LEGEND
===================================================== -->

          <circle cx="297" cy="189" r="2.4" fill="#2479c8" />

          <text x="303" y="191" class="micro">Standard cost</text>

          <circle cx="351" cy="189" r="2.4" fill="#74a8da" />

          <text x="357" y="191" class="micro">Actual cost</text>

          <!-- =====================================================
     CHART GRID
===================================================== -->

          <g stroke="#eef1f4" stroke-width=".8">
            <line x1="306" y1="206.0" x2="465" y2="206.0" />
            <line x1="306" y1="223.0" x2="465" y2="223.0" />
            <line x1="306" y1="240.0" x2="465" y2="240.0" />
          </g>
          <text x="303" y="207.6" text-anchor="end" class="micro">6</text>
          <text x="303" y="224.6" text-anchor="end" class="micro">4</text>
          <text x="303" y="241.6" text-anchor="end" class="micro">2</text>
          <line x1="306" y1="257" x2="465" y2="257" stroke="#dfe6eb" />
          <g class="bar d1"><rect x="327" y="207.28" width="12" height="49.72" rx="2" fill="#277acb" /><rect x="344" y="209.40" width="12" height="47.60" rx="2" fill="#76aadd" /></g>
          <g class="bar d2"><rect x="375" y="245.10" width="12" height="11.90" rx="2" fill="#277acb" /><rect x="392" y="244.25" width="12" height="12.75" rx="2" fill="#76aadd" /></g>
          <g class="bar d3"><rect x="417" y="240.43" width="12" height="16.57" rx="2" fill="#277acb" /><rect x="432" y="240.85" width="12" height="16.15" rx="2" fill="#76aadd" /></g>
          <text x="333" y="204.28" text-anchor="middle" class="semi" font-size="5.9">5.85</text>
          <text x="350" y="206.40" text-anchor="middle" class="semi" font-size="5.9">5.60</text>
          <text x="341.5" y="268" text-anchor="middle" class="micro">Raw material</text>
          <text x="381" y="242.10" text-anchor="middle" class="semi" font-size="5.9">1.40</text>
          <text x="398" y="241.25" text-anchor="middle" class="semi" font-size="5.9">1.50</text>
          <text x="389.5" y="268" text-anchor="middle" class="micro">Direct labour</text>
          <text x="423" y="237.43" text-anchor="middle" class="semi" font-size="5.9">1.95</text>
          <text x="438" y="237.85" text-anchor="middle" class="semi" font-size="5.9">1.90</text>
          <text x="430.5" y="268" text-anchor="middle" class="micro">Overheads</text>
          <!-- =====================================================
     STANDARD COST
===================================================== -->

          <rect x="298" y="278" width="53" height="25" rx="5" fill="#f7f9fb" />

          <text x="304" y="287" class="micro">Standard cost</text>

          <text x="304" y="298" class="semi" font-size="7.2">₹<tspan class="counter" data-target="9.20" data-decimals="2">9.20</tspan> Cr</text>

          <!-- =====================================================
     ACTUAL COST
===================================================== -->

          <rect x="356" y="278" width="53" height="25" rx="5" fill="#f7f9fb" />

          <text x="362" y="287" class="micro">Actual cost</text>

          <text x="362" y="298" class="semi" font-size="7.2">₹<tspan class="counter" data-target="9.00" data-decimals="2">9.00</tspan> Cr</text>

          <!-- =====================================================
     VARIANCE
===================================================== -->

          <rect x="414" y="278" width="54" height="25" rx="5" fill="#eaf8f1" />

          <text x="420" y="285" class="micro">Variance</text>

          <text
            x="420"
            y="293.5"
            font-size="7.4"
            font-weight="800"
            fill="#299d73"
          ><tspan class="counter" data-target="-2.2" data-decimals="1">−2.2</tspan>%</text>

          <text
            x="420"
            y="300"
            font-size="4.8"
            font-weight="700"
            fill="#43aa80"
          >Favourable</text>

          <!-- CAPEX + WC -->
          <rect
            x="479"
            y="162"
            width="230"
            height="147"
            rx="8"
            fill="#fff"
            stroke="#e4eaf0"
          />
          <text x="490" y="177" class="title" font-size="8.05">Capex return (expected)</text>

          <text x="490" y="191" class="micro">Invested</text>
          <text x="490" y="204" class="semi" font-size="10.2">₹<tspan class="counter" data-target="5.0" data-decimals="1">5.0</tspan> Cr</text>

          <text x="550" y="191" class="micro">Expected return</text>
          <text x="550" y="204" class="semi" font-size="10.2">₹<tspan class="counter" data-target="1.2" data-decimals="1">1.2</tspan> Cr p.a.</text>

          <text x="618" y="191" class="micro">ROI / payback</text>
          <text
            x="618"
            y="204"
            font-size="10.2"
            font-weight="800"
            fill="#299d73"
          ><tspan class="counter" data-target="24" data-decimals="0">24</tspan>% / <tspan class="counter" data-target="4.2" data-decimals="1">4.2</tspan> yrs</text>

          <line x1="490" y1="213" x2="701" y2="213" stroke="#edf1f4" />
          <text x="490" y="228" class="title" font-size="8.05">Working capital snapshot</text>
          <text x="668" y="228" class="micro">vs Mar 2026</text>

          <rect x="490" y="235" width="50" height="53" rx="5" fill="#f7f9fb" />
          <text x="495" y="245" class="micro">Inventory</text>
          <text x="495" y="258" class="semi" font-size="9.2">₹<tspan class="counter" data-target="9.0" data-decimals="1">9.0</tspan> Cr</text>
          <g transform="translate(495 263)">
            <circle cx="3.2" cy="3.2" r="3.2" fill="#e7f7ef" />
            <path
              d="M1.6 1.3l3.2 3.2M3.1 4.5h1.7V2.8"
              fill="none"
              stroke="#299d73"
              stroke-width=".65"
            />
          </g>
          <text
            x="502"
            y="269.2"
            font-size="4.9"
            font-weight="700"
            fill="#299d73"
          >4 days</text>

          <rect x="544" y="235" width="50" height="53" rx="5" fill="#f7f9fb" />
          <text x="549" y="245" class="micro">Receivables</text>
          <text x="549" y="258" class="semi" font-size="9.2">₹<tspan class="counter" data-target="8.5" data-decimals="1">8.5</tspan> Cr</text>
          <g transform="translate(549 263)">
            <circle cx="3.2" cy="3.2" r="3.2" fill="#e7f7ef" />
            <path
              d="M1.6 1.3l3.2 3.2M3.1 4.5h1.7V2.8"
              fill="none"
              stroke="#299d73"
              stroke-width=".65"
            />
          </g>
          <text
            x="556"
            y="269.2"
            font-size="4.9"
            font-weight="700"
            fill="#299d73"
          >8 days</text>

          <rect x="598" y="235" width="50" height="53" rx="5" fill="#f7f9fb" />
          <text x="603" y="245" class="micro">Payables</text>
          <text x="603" y="258" class="semi" font-size="9.2">₹<tspan class="counter" data-target="5.0" data-decimals="1">5.0</tspan> Cr</text>
          <g transform="translate(603 263)">
            <circle cx="3.2" cy="3.2" r="3.2" fill="#e7f7ef" />
            <path
              d="M1.6 4.5l3.2-3.2M3.1 1.3h1.7V3"
              fill="none"
              stroke="#299d73"
              stroke-width=".65"
            />
          </g>
          <text
            x="610"
            y="269.2"
            font-size="4.9"
            font-weight="700"
            fill="#299d73"
          >4 days</text>

          <rect x="652" y="235" width="49" height="53" rx="5" fill="#f7f9fb" />
          <text x="657" y="245" class="micro">Cash cycle</text>
          <text x="657" y="258" class="semi" font-size="9.2"><tspan class="counter" data-target="102" data-decimals="0">102</tspan> days</text>
          <g transform="translate(657 263)">
            <circle cx="3.2" cy="3.2" r="3.2" fill="#e7f7ef" />
            <path
              d="M1.6 1.3l3.2 3.2M3.1 4.5h1.7V2.8"
              fill="none"
              stroke="#299d73"
              stroke-width=".65"
            />
          </g>
          <text
            x="664"
            y="269.2"
            font-size="4.9"
            font-weight="700"
            fill="#299d73"
          >16 days</text>

          <!-- ================= INSIGHTS ================= -->

          <rect
            x="200"
            y="316"
            width="449"
            height="81"
            rx="8"
            fill="#fff"
            stroke="#e4eaf0"
          />

          <!-- SECTION TITLE -->
          <text x="210" y="330" class="title" font-size="8.15">Key manufacturing insights</text>

          <!-- =====================================================
     INSIGHT 1
===================================================== -->

          <g>
            <rect
              x="210"
              y="338"
              width="104"
              height="50"
              rx="6"
              fill="#f7fafd"
            />

            <circle cx="219" cy="347" r="3" fill="#d93c3c" />

            <text
              x="226"
              y="347"
              font-size="4.85"
              font-weight="800"
              fill="#173957"
            >Plant C EBITDA margin is 10 pts</text>

            <text
              x="226"
              y="353"
              font-size="4.85"
              font-weight="800"
              fill="#173957"
            >below Plant A</text>

            <text x="226" y="364" class="micro" font-size="4.2">Review conversion cost and yield</text>

            <text x="226" y="370" class="micro" font-size="4.2">losses.</text>
          </g>

          <!-- =====================================================
     INSIGHT 2
===================================================== -->

          <g>
            <rect
              x="319"
              y="338"
              width="104"
              height="50"
              rx="6"
              fill="#f7fafd"
            />

            <circle cx="328" cy="347" r="3" fill="#2da36f" />

            <text
              x="335"
              y="347"
              font-size="4.85"
              font-weight="800"
              fill="#173957"
            >Material cost 4.3% below</text>

            <text
              x="335"
              y="353"
              font-size="4.85"
              font-weight="800"
              fill="#173957"
            >standard</text>

            <text x="335" y="364" class="micro" font-size="4.2">But direct labour is 7.1% over</text>

            <text x="335" y="370" class="micro" font-size="4.2">standard. Review shift planning.</text>
          </g>

          <!-- =====================================================
     INSIGHT 3
===================================================== -->

          <g>
            <rect
              x="428"
              y="338"
              width="104"
              height="50"
              rx="6"
              fill="#f7fafd"
            />

            <circle cx="437" cy="347" r="3" fill="#2878c9" />

            <text
              x="444"
              y="347"
              font-size="4.85"
              font-weight="800"
              fill="#173957"
            >Capex expected to return</text>

            <text
              x="444"
              y="353"
              font-size="4.85"
              font-weight="800"
              fill="#173957"
            >₹1.2 Cr per year</text>

            <text x="444" y="364" class="micro" font-size="4.2">24% expected ROI, payback</text>

            <text x="444" y="370" class="micro" font-size="4.2">about 4.2 years.</text>
          </g>

          <!-- =====================================================
     INSIGHT 4
===================================================== -->

          <g>
            <rect
              x="537"
              y="338"
              width="102"
              height="50"
              rx="6"
              fill="#f7fafd"
            />

            <circle cx="546" cy="347" r="3" fill="#e89d29" />

            <text
              x="553"
              y="347"
              font-size="4.85"
              font-weight="800"
              fill="#173957"
            >Inventory at 91 days,</text>

            <text
              x="553"
              y="353"
              font-size="4.85"
              font-weight="800"
              fill="#173957"
            >down 4 days</text>

            <text x="553" y="364" class="micro" font-size="4.2">Identify slow-moving stock</text>

            <text x="553" y="370" class="micro" font-size="4.2">to keep turnover improving.</text>
          </g>
        </g>

        <!-- ================= FLOATING CARDS — OUTSIDE CLIP ON PURPOSE ================= -->

        <!-- top-right -->
        <g class="floatA" filter="url(#smallShadow)">
          <rect x="622" y="15" width="166" height="65" rx="11" fill="#fbfdff" />
          <circle cx="639" cy="30" r="7" fill="#e3f5ec" />
          <circle cx="639" cy="30" r="2.3" fill="#3aa47b" />
          <text
            x="655"
            y="29"
            font-size="5.75"
            font-weight="700"
            fill="#50687b"
          >Plant margin opportunity</text>
          <text
            x="655"
            y="48"
            font-size="16.4"
            font-weight="800"
            fill="#1d9e73"
          >+₹<tspan class="counter" data-target="67" data-decimals="0">67</tspan> L a year</text>
          <text x="655" y="59" font-size="5.15" fill="#73818e">if Plant C reaches Plant B's 14%</text>
          <text x="655" y="67" font-size="5.15" fill="#73818e">EBITDA margin on current revenue.</text>
        </g>

        <!-- bottom-left -->
        <g class="floatB" filter="url(#smallShadow)">
          <rect x="13" y="360" width="151" height="67" rx="11" fill="#fbfdff" />
          <circle cx="29" cy="380" r="8" fill="#e8f2ff" />
          <path
            d="M25 378l4-4 4 4-4 4zM25 382l4 4 4-4"
            fill="none"
            stroke="#2878c9"
            stroke-width="1.05"
          />
          <text
            x="49"
            y="379"
            font-size="6.25"
            font-weight="700"
            fill="#173957"
          >Net working capital</text>
          <text x="49" y="397" font-size="17" font-weight="800" fill="#2878c9">₹<tspan class="counter" data-target="12.5" data-decimals="1">12.5</tspan> Cr</text>
          <text x="49" y="410" font-size="5.0" fill="#73818e">Inventory ₹9.0 Cr + receivables</text>
          <text x="49" y="419" font-size="5.0" fill="#73818e">₹8.5 Cr − payables ₹5.0 Cr.</text>
        </g>
      </svg>
    </div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        // Line charts: <g class="lineChart"> holding one polyline + its dots.
        // The line draws left to right; each dot appears as the line reaches it.
        const lines = Array.from(document.querySelectorAll(".lineChart")).map((g) => {
          const pl = g.querySelector("polyline");
          const xs = pl.getAttribute("points").trim().split(/\s+/).map((pt) => num(pt.split(",")[0], 0));
          const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
          const L = pl.getTotalLength ? pl.getTotalLength() : 1000;
          pl.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          const dots = Array.from(g.querySelectorAll("circle")).map((c) => ({
            c, at: x1 > x0 ? (num(c.getAttribute("cx"), 0) - x0) / (x1 - x0) : 0
          }));
          return { pl, L, dots };
        });

        // KPI sparklines: <g class="sparkChart"> with an area path, a line path and an end dot.
        // Line draws left to right, area fills behind it, dot lands at the end.
        const sparks = Array.from(document.querySelectorAll(".sparkChart")).map((g, i) => {
          const paths = Array.from(g.querySelectorAll("path"));
          const line = paths.find((p) => p.getAttribute("fill") === "none");
          const area = paths.find((p) => p !== line);
          const dot = g.querySelector("circle");
          const L = line.getTotalLength();
          line.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          let clip = null, bb = null;
          if (area) {
            bb = area.getBBox();
            const ns = "http://www.w3.org/2000/svg";
            const cp = document.createElementNS(ns, "clipPath");
            cp.setAttribute("id", "sparkClip" + i);
            clip = document.createElementNS(ns, "rect");
            clip.setAttribute("x", bb.x); clip.setAttribute("y", bb.y - 2);
            clip.setAttribute("height", bb.height + 4); clip.setAttribute("width", 0);
            cp.appendChild(clip); g.appendChild(cp);
            area.setAttribute("clip-path", "url(#sparkClip" + i + ")");
          }
          return { line, L, clip, bb, dot };
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          sparks.forEach((sp) => {
            sp.line.setAttribute("stroke-dashoffset", (sp.L * (1 - p)).toFixed(2));
            if (sp.clip) sp.clip.setAttribute("width", (sp.bb.width * p).toFixed(2));
            if (sp.dot) sp.dot.style.opacity = Math.max(0, Math.min(1, (p - 0.94) / 0.06)).toFixed(2);
          });
          lines.forEach((ln) => {
            ln.pl.setAttribute("stroke-dashoffset", (ln.L * (1 - p)).toFixed(2));
            ln.dots.forEach((d) => {
              d.c.style.opacity = Math.max(0, Math.min(1, (p - d.at) / 0.06 + 1)).toFixed(2);
            });
          });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body>
</html>
`,
  trading: String.raw`<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>CFO CRAFT — Trading & Distribution Finance</title><style>
*{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff}
body{font-family:Inter,Arial,Helvetica,sans-serif}.stage{width:800px;max-width:100vw;margin:0 auto}
svg{display:block;width:100%;height:auto;overflow:hidden}text{font-family:Inter,Arial,Helvetica,sans-serif}
.title{font-weight:800;fill:#143451}.semi{font-weight:700;fill:#183a58}.muted{font-weight:500;fill:#718294}
.micro{font-size:4.8px;font-weight:500;fill:#8493a0}.tiny{font-size:4.35px;font-weight:500;fill:#8997a4}
.counter{font-variant-numeric:tabular-nums}.bar{transform-box:fill-box;transform-origin:bottom}
.floatA,.floatB{animation:float 3.2s ease-in-out infinite alternate}
@keyframes float{from{transform:translateY(0)}to{transform:translateY(-2px)}}
@media(prefers-reduced-motion:reduce){.bar,.spark,.floatA,.floatB{animation:none!important}}


</style></head>
<body><div class="stage"><svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-label="Trading and Distribution Finance dashboard">
<defs>
<linearGradient id="bgT" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#073f91"/><stop offset=".5" stop-color="#063778"/><stop offset="1" stop-color="#082e65"/></linearGradient>
<linearGradient id="paperT" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#f9fbfd"/></linearGradient>
<filter id="shT" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#03265c" flood-opacity=".26"/></filter>
<filter id="smT" x="-20%" y="-20%" width="150%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0a315b" flood-opacity=".18"/></filter>
<clipPath id="clipT"><rect x="76" y="42" width="650" height="370" rx="14"/></clipPath>
</defs>
<rect width="800" height="450" rx="23" fill="url(#bgT)"/>
<g fill="none" stroke="#a8d0ff" stroke-opacity=".16">
<path d="M-115 45C70-35 230-25 360 83"/><path d="M-122 91C70 2 252 10 395 118"/><path d="M-100 144C86 67 269 73 414 176"/><path d="M430-35C606-6 738 79 828 189"/><path d="M-55 357C93 297 218 318 320 403"/><path d="M530 345C654 351 760 401 839 472"/>
</g>
<rect x="76" y="42" width="650" height="370" rx="14" fill="url(#paperT)" filter="url(#shT)"/>
<g clip-path="url(#clipT)">
<rect x="91" y="57" width="29" height="29" rx="6" fill="#eaf3ff"/><path d="M98 78v-10h5v6h5v-9h5v13z" fill="#2879ca"/>
<text x="127" y="69" class="title" font-size="14.1">Trading &amp; Distribution Finance</text>
<text x="127" y="80.5" class="muted" font-size="6.6">SKU profitability, credit risk, inventory and cash cycle</text>
<rect x="492" y="55" width="111" height="22" rx="5" fill="#fff" stroke="#e7edf2"/>
<text x="501" y="65.5" font-size="5.55" font-weight="700" fill="#596d7e">Q1 FY27 (Apr–Jun 2026)</text>
<path d="M593 64l2 2 2-2" fill="none" stroke="#83909d" stroke-width=".7"/>
<rect x="467" y="79" width="136" height="11" rx="4" fill="#f7f9fb"/>
<text x="535" y="86.2" text-anchor="middle" class="tiny">Illustrative dashboard with sample data, not client results</text>

<!-- KPI 1 -->
<rect x="91" y="94" width="151" height="59" rx="8" fill="#fff" stroke="#e4eaf0"/>
<circle cx="106" cy="110" r="9" fill="#eaf3ff"/><path d="M101 115v-6h3v4h3v-7h3v9z" fill="#2878c9"/>
<text x="120" y="107" class="muted" font-size="6.05">Gross margin</text>
<text x="120" y="122" class="title" font-size="14.2"><tspan class="counter" data-target="18.6" data-decimals="1">18.6</tspan>%</text>
<text x="120" y="133.6" font-size="5.25" font-weight="700" fill="#299d73">▲ 2.4 pts QoQ</text>
<text x="120" y="143" class="micro">Q4 FY26: 16.2%</text>
<g class="sparkChart"><path d="M191 135C201 134 207 128 214 126C222 123 226 119 232 116V136.5H191z" fill="#e3f5ec"/><path d="M191 135C201 134 207 128 214 126C222 123 226 119 232 116" fill="none" stroke="#2f9e6c" stroke-width="1.2" stroke-linecap="round" class="spark"/><circle cx="232" cy="116" r="1.6" fill="#2f9e6c"/></g>

<!-- KPI 2 -->
<rect x="247" y="94" width="151" height="59" rx="8" fill="#fff" stroke="#e4eaf0"/>
<circle cx="262" cy="110" r="9" fill="#fff3df"/><path d="M258 108l4-4 4 4M258 112l4 4 4-4" fill="none" stroke="#eaa044" stroke-width="1.1"/>
<text x="276" y="107" class="muted" font-size="6.05">Inventory turns</text>
<text x="276" y="122" class="title" font-size="14.2"><tspan class="counter" data-target="6.2" data-decimals="1">6.2</tspan>x</text>
<text x="276" y="133.6" font-size="5.25" font-weight="700" fill="#299d73">▲ 0.8x QoQ</text>
<text x="276" y="143" class="micro">Q4 FY26: 5.4x</text>
<g class="bar" fill="#55b889"><rect x="356" y="135" width="4" height="5" rx="1"/><rect x="363" y="132" width="4" height="8" rx="1"/><rect x="370" y="128" width="4" height="12" rx="1"/><rect x="377" y="123" width="4" height="17" rx="1"/></g>

<!-- KPI 3 -->
<rect x="403" y="94" width="151" height="59" rx="8" fill="#fff" stroke="#e4eaf0"/>
<circle cx="418" cy="110" r="9" fill="#e7f7ef"/><rect x="414" y="104" width="8" height="11" rx="1" fill="#2da36f"/><path d="M416 107h4M416 110h4" stroke="#fff" stroke-width=".8"/>
<text x="432" y="107" class="muted" font-size="6.05">Collection days</text>
<text x="432" y="122" class="title" font-size="14.2"><tspan class="counter" data-target="45" data-decimals="0">45</tspan></text>
<text x="432" y="133.6" font-size="5.25" font-weight="700" fill="#299d73">▼ 8 days QoQ</text>
<text x="432" y="143" class="micro">Q4 FY26: 53 days</text>
<g class="sparkChart"><path d="M507 122C515 124 521 127 528 130C536 134 542 135 548 140V141.5H507z" fill="#e3f5ec"/><path d="M507 122C515 124 521 127 528 130C536 134 542 135 548 140" fill="none" stroke="#2f9e6c" stroke-width="1.2" stroke-linecap="round" class="spark"/><circle cx="548" cy="140" r="1.6" fill="#2f9e6c"/></g>

<!-- KPI 4 -->
<rect x="559" y="94" width="153" height="59" rx="8" fill="#fff" stroke="#e4eaf0"/>
<circle cx="574" cy="110" r="9" fill="#f0eaff"/><circle cx="574" cy="110" r="4" fill="none" stroke="#8150db" stroke-width="1.2"/><path d="M574 105v5l3 2" fill="none" stroke="#8150db" stroke-width=".8"/>
<text x="588" y="107" class="muted" font-size="6.05">Cash cycle</text>
<text x="588" y="122" class="title" font-size="14.2"><tspan class="counter" data-target="59" data-decimals="0">59</tspan> days</text>
<text x="588" y="133.6" font-size="5.25" font-weight="700" fill="#299d73">▼ 13 days QoQ</text>
<text x="588" y="143" class="micro">Q4 FY26: 72 days</text>
<g class="sparkChart"><path d="M663 122C671.3 126 677.9 130 684.5 133C691.1 137 696 139 701 141V142.5H663z" fill="#e3f5ec"/><path d="M663 122C671.3 126 677.9 130 684.5 133C691.1 137 696 139 701 141" fill="none" stroke="#2f9e6c" stroke-width="1.2" stroke-linecap="round" class="spark"/><circle cx="701" cy="141" r="1.6" fill="#2f9e6c"/></g>

<!-- lower left: SKU profitability -->
<rect x="91" y="162" width="164" height="147" rx="8" fill="#fff" stroke="#e4eaf0"/>
<text x="102" y="177" class="title" font-size="8.05">SKU profitability</text><text x="207" y="177" class="micro">Gross margin %</text>
<text x="102" y="190" class="micro">Premium tier</text><text x="230" y="190" class="semi" font-size="5.8">
  <tspan class="counter" data-target="32" data-decimals="0">32</tspan>%
</text>
<rect x="150" y="186" width="74" height="7" rx="3" fill="#eaf0f6"/><rect class="hBar" x="150" y="186" width="59.2" height="7" rx="3" fill="#277acb"/>
<text x="102" y="208" class="micro">Standard tier</text><text x="230" y="208" class="semi" font-size="5.8">
  <tspan class="counter" data-target="14" data-decimals="0">14</tspan>%
</text>
<rect x="150" y="204" width="74" height="7" rx="3" fill="#eaf0f6"/><rect class="hBar" x="150" y="204" width="25.9" height="7" rx="3" fill="#6ca3da"/>
<text x="102" y="226" class="micro">Low margin</text><text x="230" y="226" class="semi" font-size="5.8">
  <tspan class="counter" data-target="7" data-decimals="0">7</tspan>%
</text>
<rect x="150" y="222" width="74" height="7" rx="3" fill="#eaf0f6"/><rect class="hBar" x="150" y="222" width="12.9" height="7" rx="3" fill="#9cc5ea"/>
<text x="102" y="244" class="micro">Loss making</text><text x="230" y="244" font-size="5.8" font-weight="700" fill="#d93c3c">
  <tspan class="counter" data-target="-3" data-decimals="0">-3</tspan>%
</text>
<rect x="150" y="240" width="74" height="7" rx="3" fill="#f3e7e7"/><rect class="hBar" x="150" y="240" width="5.5" height="7" rx="3" fill="#d93c3c"/>
<text x="102" y="261" class="micro">Loss-making SKUs are 5% of the range.</text><text x="102" y="270" class="micro">Weighted mix = 18.6% gross margin.</text>

<!-- credit risk -->
<rect x="263" y="162" width="205" height="147" rx="8" fill="#fff" stroke="#e4eaf0"/>
<text x="274" y="177" class="title" font-size="8.05">Customer credit risk</text>
<text x="274" y="191" class="micro">As on 30 Jun 2026</text>
<rect x="274" y="196" width="57" height="32" rx="5" fill="#f7f9fb"/><text x="279" y="207" class="micro">Credit receivables</text><text x="279" y="219" class="semi" font-size="9">₹<tspan class="counter" data-target="7.4" data-decimals="1">7.4</tspan> Cr</text><text x="279" y="226" font-size="4.8" fill="#5f7285">▲ 5.7% QoQ</text>
<rect x="336" y="196" width="57" height="32" rx="5" fill="#f7f9fb"/><text x="341" y="207" class="micro">Overdue</text><text x="341" y="219" class="semi" font-size="9">₹<tspan class="counter" data-target="1.9" data-decimals="1">1.9</tspan> Cr</text><text x="341" y="226" font-size="4.8" fill="#d93c3c">▲ 2.9% QoQ</text>
<rect x="398" y="196" width="57" height="32" rx="5" fill="#f7f9fb"/><text x="403" y="207" class="micro">High risk</text><text x="403" y="219" class="semi" font-size="9"><tspan class="counter" data-target="12" data-decimals="0">12</tspan></text><text x="403" y="226" font-size="4.8" fill="#d93c3c">▲ 4 QoQ</text>
<text x="274" y="239" class="micro">Top overdue accounts</text><text x="338" y="239" class="micro">Outstanding</text><text x="392" y="239" class="micro">Days</text><text x="431" y="239" class="micro">Risk</text>
<line x1="274" y1="243" x2="455" y2="243" stroke="#edf1f4"/>
<text x="274" y="252" class="micro">ABC Retailers</text><text x="338" y="252" class="micro">₹48 L</text><text x="395" y="252" class="micro">76</text><rect x="430" y="246" width="22" height="9" rx="3" fill="#fdeaea"/><text x="434" y="252" font-size="4.4" fill="#d93c3c">High</text>
<text x="274" y="263" class="micro">XYZ Traders</text><text x="338" y="263" class="micro">₹32 L</text><text x="395" y="263" class="micro">48</text><rect x="430" y="257" width="22" height="9" rx="3" fill="#fff1db"/><text x="433" y="263" font-size="4.4" fill="#d98c22">Medium</text>
<text x="274" y="274" class="micro">Metro Distributors</text><text x="338" y="274" class="micro">₹21 L</text><text x="395" y="274" class="micro">12</text><rect x="430" y="268" width="22" height="9" rx="3" fill="#e5f7ed"/><text x="436" y="274" font-size="4.4" fill="#299d73">Low</text>
<text x="274" y="285" class="micro">Global Mart</text><text x="338" y="285" class="micro">₹18 L</text><text x="395" y="285" class="micro">5</text><rect x="430" y="279" width="22" height="9" rx="3" fill="#e5f7ed"/><text x="436" y="285" font-size="4.4" fill="#299d73">Low</text>

<!-- inventory turnover -->
<rect x="476" y="162" width="233" height="70" rx="8" fill="#fff" stroke="#e4eaf0"/>
<text x="487" y="177" class="title" font-size="8.05">Inventory turnover</text>
<text x="487" y="197" class="title" font-size="14"><tspan class="counter" data-target="6.2" data-decimals="1">6.2</tspan>x</text><text x="520" y="197" class="micro">vs 7.0x target</text>
<rect x="487" y="207" width="155" height="5" rx="2.5" fill="#e8eef4"/><rect class="hBar" x="487" y="207" width="137" height="5" rx="2.5" fill="#2879ca"/>
<rect x="649" y="187" width="52" height="27" rx="5" fill="#fff2f2"/><text x="654" y="194.5" font-size="4.15" font-weight="700" fill="#7c8b98">Slow-moving stock</text><text x="654" y="205" font-size="7.2" font-weight="800" fill="#d93c3c">₹<tspan class="counter" data-target="1.7" data-decimals="1">1.7</tspan> Cr</text><text x="654" y="211.5" font-size="4.05" fill="#8493a0">22% of ₹7.9 Cr stock</text>

<!-- cash cycle -->
<rect x="476" y="239" width="233" height="70" rx="8" fill="#fff" stroke="#e4eaf0"/>
<text x="487" y="254" class="title" font-size="8.05">Cash cycle breakdown</text><text x="678" y="254" class="micro">days, QoQ</text>
<g>
<rect x="487" y="263" width="50" height="35" rx="5" fill="#f7f9fb"/><text x="492" y="272" class="micro">Inventory</text><text x="492" y="284" class="semi" font-size="9"><tspan class="counter" data-target="59" data-decimals="0">59</tspan></text><text x="492" y="292" font-size="4.8" fill="#299d73">↓ 9 days</text>
<rect x="541" y="263" width="50" height="35" rx="5" fill="#f7f9fb"/><text x="546" y="272" class="micro">Collection</text><text x="546" y="284" class="semi" font-size="9"><tspan class="counter" data-target="45" data-decimals="0">45</tspan></text><text x="546" y="292" font-size="4.8" fill="#299d73">↓ 8 days</text>
<rect x="595" y="263" width="50" height="35" rx="5" fill="#f7f9fb"/><text x="600" y="272" class="micro">Payable</text><text x="600" y="284" class="semi" font-size="9"><tspan class="counter" data-target="45" data-decimals="0">45</tspan></text><text x="600" y="292" font-size="4.8" fill="#d93c3c">↓ 4 days</text>
<rect x="649" y="263" width="50" height="35" rx="5" fill="#f7f9fb"/><text x="654" y="272" class="micro">Cash cycle</text><text x="654" y="284" class="semi" font-size="9"><tspan class="counter" data-target="59" data-decimals="0">59</tspan></text><text x="654" y="292" font-size="4.8" fill="#299d73">↓ 13 days</text>
</g>
<text x="487" y="304" class="micro">59 + 45 − 45 = 59 days. Shorter supplier credit adds 4 days.</text>

<!-- insights -->
<rect x="172" y="316" width="468" height="81" rx="8" fill="#fff" stroke="#e4eaf0"/>
<text x="182" y="330" class="title" font-size="8.15">Key trading insights</text>
<g><rect x="182" y="338" width="108" height="50" rx="6" fill="#f7fafd"/><circle cx="191" cy="347" r="3" fill="#2d7acb"/><text x="198" y="347" font-size="4.85" font-weight="800" fill="#173957">Premium tier: 36% of</text><text x="198" y="353" font-size="4.85" font-weight="800" fill="#173957">sales, 62% of gross profit</text><text x="198" y="364" class="micro">Push volume and deepen</text><text x="198" y="370" class="micro">distribution.</text></g>
<g><rect x="294" y="338" width="108" height="50" rx="6" fill="#f7fafd"/><circle cx="303" cy="347" r="3" fill="#d93c3c"/><text x="310" y="347" font-size="4.85" font-weight="800" fill="#173957">₹1.9 Cr overdue</text><text x="310" y="353" font-size="4.85" font-weight="800" fill="#173957">receivables</text><text x="310" y="364" class="micro">Tighten credit limits and</text><text x="310" y="370" class="micro">follow-ups.</text></g>
<g><rect x="406" y="338" width="108" height="50" rx="6" fill="#f7fafd"/><circle cx="415" cy="347" r="3" fill="#e89d29"/><text x="422" y="347" font-size="4.85" font-weight="800" fill="#173957">Slow-moving stock of</text><text x="422" y="353" font-size="4.85" font-weight="800" fill="#173957">₹1.7 Cr</text><text x="422" y="364" class="micro">Rationalise SKUs to turn</text><text x="422" y="370" class="micro">to 7.0x.</text></g>
<g><rect x="518" y="338" width="112" height="50" rx="6" fill="#f7fafd"/><circle cx="527" cy="347" r="3" fill="#7b45d4"/><text x="534" y="347" font-size="4.85" font-weight="800" fill="#173957">Supplier credit down 4</text><text x="534" y="353" font-size="4.85" font-weight="800" fill="#173957">days</text><text x="534" y="364" class="micro">Renegotiate terms to protect</text><text x="534" y="370" class="micro">the cycle.</text></g>
</g>

<!-- floating cards -->
<g class="floatA" filter="url(#smT)"><rect x="638" y="344" width="150" height="76" rx="11" fill="#fbfdff"/><circle cx="654" cy="367" r="7" fill="#e3f5ec"/><circle cx="654" cy="367" r="2.3" fill="#3aa47b"/><text x="670" y="366" font-size="5.75" font-weight="700" fill="#50687b">CFO insight</text><text x="670" y="385" font-size="16.4" font-weight="800" fill="#1d9e73">₹<tspan class="counter" data-target="1.7" data-decimals="1">1.7</tspan> Cr</text><text x="670" y="397" font-size="5.15" fill="#73818e">Cash release: ₹0.9 Cr from</text><text x="670" y="405" font-size="5.15" fill="#73818e">turns 6.2→7.0x, ₹0.8 Cr from</text><text x="670" y="413" font-size="5.15" fill="#73818e">collections 45→40 days.</text></g>
<g class="floatB" filter="url(#smT)"><rect x="13" y="356" width="151" height="76" rx="11" fill="#fbfdff"/><circle cx="29" cy="380" r="8" fill="#e8f2ff"/><path d="M25 378l4-4 4 4-4 4zM25 382l4 4 4-4" fill="none" stroke="#2878c9" stroke-width="1.05"/><text x="49" y="379" font-size="6.25" font-weight="700" fill="#173957">Stock + debtors</text><text x="49" y="397" font-size="17" font-weight="800" fill="#2878c9">₹<tspan class="counter" data-target="15.3" data-decimals="1">15.3</tspan> Cr</text><text x="49" y="410" font-size="5.0" fill="#73818e">Inventory ₹7.9 Cr + receivables</text><text x="49" y="419" font-size="5.0" fill="#73818e">₹7.4 Cr. Supplier credit funds</text><text x="49" y="427" font-size="5.0" fill="#73818e">₹6.0 Cr of it (45 days).</text></g>
</svg></div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        // Line charts: <g class="lineChart"> holding one polyline + its dots.
        // The line draws left to right; each dot appears as the line reaches it.
        const lines = Array.from(document.querySelectorAll(".lineChart")).map((g) => {
          const pl = g.querySelector("polyline");
          const xs = pl.getAttribute("points").trim().split(/\s+/).map((pt) => num(pt.split(",")[0], 0));
          const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
          const L = pl.getTotalLength ? pl.getTotalLength() : 1000;
          pl.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          const dots = Array.from(g.querySelectorAll("circle, text")).map((c) => ({
            c, at: x1 > x0 ? (num(c.getAttribute("cx") || c.getAttribute("x"), 0) - x0) / (x1 - x0) : 0
          }));
          return { pl, L, dots };
        });

        // KPI sparklines: <g class="sparkChart"> with an area path, a line path and an end dot.
        // Line draws left to right, area fills behind it, dot lands at the end.
        const sparks = Array.from(document.querySelectorAll(".sparkChart")).map((g, i) => {
          const paths = Array.from(g.querySelectorAll("path"));
          const line = paths.find((p) => p.getAttribute("fill") === "none");
          const area = paths.find((p) => p !== line);
          const dot = g.querySelector("circle");
          const L = line.getTotalLength();
          line.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          let clip = null, bb = null;
          if (area) {
            bb = area.getBBox();
            const ns = "http://www.w3.org/2000/svg";
            const cp = document.createElementNS(ns, "clipPath");
            cp.setAttribute("id", "sparkClip" + i);
            clip = document.createElementNS(ns, "rect");
            clip.setAttribute("x", bb.x); clip.setAttribute("y", bb.y - 2);
            clip.setAttribute("height", bb.height + 4); clip.setAttribute("width", 0);
            cp.appendChild(clip); g.appendChild(cp);
            area.setAttribute("clip-path", "url(#sparkClip" + i + ")");
          }
          return { line, L, clip, bb, dot };
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          sparks.forEach((sp) => {
            sp.line.setAttribute("stroke-dashoffset", (sp.L * (1 - p)).toFixed(2));
            if (sp.clip) sp.clip.setAttribute("width", (sp.bb.width * p).toFixed(2));
            if (sp.dot) sp.dot.style.opacity = Math.max(0, Math.min(1, (p - 0.94) / 0.06)).toFixed(2);
          });
          lines.forEach((ln) => {
            ln.pl.setAttribute("stroke-dashoffset", (ln.L * (1 - p)).toFixed(2));
            ln.dots.forEach((d) => {
              d.c.style.opacity = Math.max(0, Math.min(1, (p - d.at) / 0.06 + 1)).toFixed(2);
            });
          });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body></html>`,
  services: String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>CFO CRAFT — Services Industry Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body { font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .stage { width: 800px; max-width: 100vw; margin: 0 auto; }
      svg { display: block; width: 100%; height: auto; overflow: hidden; }
      text { text-rendering: geometricPrecision; font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .title { font-weight: 700; fill: #10233f; }
      .semi { font-weight: 700; fill: #183a58; }
      .muted { font-weight: 500; fill: #5f7285; }
      .lab { fill: #1b3a57; }
      .micro { font-size: 4.8px; font-weight: 400; fill: #7a8896; }
      .tiny { font-size: 4.35px; font-weight: 400; fill: #7a8896; }
      .th text { font-size: 5.1px; font-weight: 500; fill: #5f7285; }
      .td text { font-size: 5.4px; font-weight: 500; fill: #1b3a57; }
      .counter { font-variant-numeric: tabular-nums; }
      .bar { transform-box: fill-box; transform-origin: bottom; }
      @media (prefers-reduced-motion: reduce) {
        .bar, .spark, .floatA, .floatB { animation: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-label="CFO CRAFT services industry dashboard">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#073f91" />
            <stop offset=".50" stop-color="#063778" />
            <stop offset="1" stop-color="#082e65" />
          </linearGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="1" stop-color="#f9fbfd" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#03265c" flood-opacity=".26" />
          </filter>
          <filter id="smallShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0a315b" flood-opacity=".18" />
          </filter>
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#8fbaf0" fill-opacity=".35" />
          </pattern>
          <clipPath id="dashboardClip">
            <rect x="76" y="42" width="650" height="370" rx="14" />
          </clipPath>
        </defs>

        <!-- ===================== BACKGROUND ===================== -->
        <rect width="800" height="450" rx="23" fill="url(#bg)" />
        <g fill="none" stroke="#a8d0ff" stroke-opacity=".16" stroke-width="1">
          <path d="M-115 45C70-35 230-25 360 83" />
          <path d="M-122 91C70 2 252 10 395 118" />
          <path d="M-100 144C86 67 269 73 414 176" />
          <path d="M430-35C606-6 738 79 828 189" />
          <path d="M-55 357C93 297 218 318 320 403" />
          <path d="M530 345C654 351 760 401 839 472" />
        </g>
        <rect x="64" y="28" width="674" height="394" rx="18" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />
        <rect x="8" y="428" width="120" height="18" fill="url(#dots)" />
        <rect x="676" y="4" width="118" height="12" fill="url(#dots)" />

        <!-- ===================== MAIN DASHBOARD ===================== -->
        <rect x="76" y="42" width="650" height="370" rx="14" fill="url(#paper)" filter="url(#shadow)" />

        <g clip-path="url(#dashboardClip)">
          <!-- HEADER -->
          <rect x="89" y="52" width="29" height="29" rx="6" fill="#eaf3ff" />
          <path d="M100 62.5v-1.3c0-.8.6-1.4 1.4-1.4h5.2c.8 0 1.4.6 1.4 1.4v1.3h2.6c.9 0 1.6.7 1.6 1.6v8.3c0 .9-.7 1.6-1.6 1.6H97.4c-.9 0-1.6-.7-1.6-1.6v-8.3c0-.9.7-1.6 1.6-1.6zm1.5 0h5v-1.2h-5z" fill="#1f6fd0" />
          <text x="126" y="66" class="title" font-size="14.4">Services Industry</text>
          <text x="126" y="77.5" class="muted" font-size="6.4">Track utilisation, project profitability and profit retention</text>

          <rect x="497" y="48" width="107" height="20" rx="5" fill="#fff" stroke="#e7edf2" />
          <text x="504" y="60" font-size="5.55" font-weight="600" fill="#33495d">Q1 FY27 (Apr–Jun 2026)</text>
          <path d="M594 57.5l1.8 1.8 1.8-1.8" fill="none" stroke="#83909d" stroke-width=".8" />
          <rect x="428" y="72" width="176" height="15" rx="4" fill="#f1f5fb" />
          <text x="516" y="81.5" text-anchor="middle" class="tiny">Illustrative dashboard with sample data, not client results</text>

          <!-- ================= KPI ROW ================= -->
          <rect x="91" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <rect x="97" y="99" width="23" height="23" rx="6" fill="#eaf3ff"/>
          <g fill="#2878c9"><circle cx="106.3" cy="108.5" r="2.1"/><circle cx="111.3" cy="109.1" r="1.7"/><path d="M102.5 114.9c0-3 1.8-4.4 3.8-4.4s3.8 1.4 3.8 4.4z"/><path d="M110.7 114.9c0-1.4-.3-2.5-.9-3.3.4-.4 1-.6 1.5-.6 1.7 0 3.2 1.2 3.2 3.9z"/></g>
          <text x="127" y="107" class="muted lab" font-size="6.05">Resource utilisation</text>
          <text x="127" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="82" data-decimals="0">82</tspan>%</text>
          <path d="M127 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <text x="133" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">6 pts vs Mar</text>
          <text x="127" y="144" class="micro">Mar 2026: 76%</text>
          <g class="sparkChart"><path d="M198 139L230 124V139z" fill="#e3f5ec"/><path d="M198 139L230 124" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="230" cy="124" r="1.6" fill="#2f9e6c"/></g>
          <rect x="247" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <rect x="253" y="99" width="23" height="23" rx="6" fill="#eaf3ff"/>
          <g fill="#2878c9"><ellipse cx="264.5" cy="106.9" rx="4.4" ry="1.7"/><path d="M260.1 108.1c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/><path d="M260.1 111.7c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/></g>
          <text x="283" y="107" class="muted lab" font-size="6.05">Revenue (realised)</text>
          <text x="283" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="6.5" data-decimals="1">6.5</tspan> Cr</text>
          <path d="M283 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <text x="289" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">14.2% QoQ</text>
          <text x="283" y="144" class="micro">Q1 FY27</text>
          <g class="bar"><rect x="358" y="136" width="4.2" height="3" rx=".8" fill="#9cc3ee"/><rect x="364" y="133" width="4.2" height="6" rx=".8" fill="#7aaee8"/><rect x="370" y="129.5" width="4.2" height="9.5" rx=".8" fill="#4f93de"/><rect x="376" y="126" width="4.2" height="13" rx=".8" fill="#2f7fd6"/><rect x="382" y="122.5" width="4.2" height="16.5" rx=".8" fill="#1f6fd0"/></g>
          <rect x="403" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <rect x="409" y="99" width="23" height="23" rx="6" fill="#e7f7ef"/>
          <text x="420.5" y="113.8" text-anchor="middle" font-size="9.4" font-weight="800" fill="#2e9e6e">%</text>
          <text x="439" y="107" class="muted lab" font-size="6.05">Gross margin</text>
          <text x="439" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="35.4" data-decimals="1">35.4</tspan>%</text>
          <path d="M439 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <text x="445" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">3.8 pts QoQ</text>
          <text x="439" y="144" class="micro">Q4 FY26: 31.6%</text>
          <g class="sparkChart"><path d="M514 138C521 136 525 135 530 131S539 126 544 123V138z" fill="#e3f5ec"/><path d="M514 138C521 136 525 135 530 131S539 126 544 123" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="544" cy="123" r="1.6" fill="#2f9e6c"/></g>
          <rect x="559" y="93" width="153" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <rect x="565" y="99" width="23" height="23" rx="6" fill="#f1ecfe"/>
          <circle cx="576.5" cy="110.5" r="4.6" fill="none" stroke="#7a4fe0" stroke-width="1.2"/><path d="M576.5 108.1V110.5l1.8 1.3" fill="none" stroke="#7a4fe0" stroke-width="1.1" stroke-linecap="round"/>
          <text x="595" y="107" class="muted lab" font-size="6.05">Avg project cycle</text>
          <text x="595" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="68" data-decimals="0">68</tspan> days</text>
          <path d="M595 132.2h4.2l-2.1 3.4z" fill="#299d73"/>
          <text x="601" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">12 days QoQ</text>
          <text x="595" y="144" class="micro">Q4 FY26: 80 days</text>
          <g class="sparkChart"><path d="M672 124C679 125 685 126 690 129S697 135 701 137V139H672z" fill="#e3f5ec"/><path d="M672 124C679 125 685 126 690 129S697 135 701 137" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="701" cy="137" r="1.6" fill="#2f9e6c"/></g>
          <!-- ================= PROJECT PROFITABILITY ================= -->
          <rect x="89" y="157" width="214" height="131" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="97" y="173" class="title" font-size="8.05">Project profitability</text>
          <text x="295" y="173" text-anchor="end" class="micro">selected projects</text>
          <rect x="97" y="180" width="199" height="14" rx="2" fill="#f2f6fb"/>
          <g class="th"><text x="100" y="189.3">Project</text><text x="177" y="189.3" text-anchor="end">Revenue ₹ L</text><text x="209" y="189.3" text-anchor="end">Cost ₹ L</text><text x="241" y="189.3" text-anchor="end">Margin</text><text x="247" y="189.3">Status</text></g>
          <g class="td"><text x="100" y="204.5">Alpha</text><text x="177" y="204.5" text-anchor="end">120</text><text x="209" y="204.5" text-anchor="end">72</text><text x="241" y="204.5" text-anchor="end">40%</text></g>
          <rect x="247" y="197.9" width="35" height="9.4" rx="2" fill="#e2f6ea"/>
          <text x="264.5" y="204.3" text-anchor="middle" font-size="5.1" font-weight="700" fill="#1f9a5f">Profitable</text>
          <line x1="97" y1="211.0" x2="296" y2="211.0" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="100" y="220.5">Beta</text><text x="177" y="220.5" text-anchor="end">95</text><text x="209" y="220.5" text-anchor="end">70</text><text x="241" y="220.5" text-anchor="end">26%</text></g>
          <rect x="247" y="213.9" width="35" height="9.4" rx="2" fill="#e2f6ea"/>
          <text x="264.5" y="220.3" text-anchor="middle" font-size="5.1" font-weight="700" fill="#1f9a5f">Profitable</text>
          <line x1="97" y1="227.0" x2="296" y2="227.0" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="100" y="236.5">Gamma</text><text x="177" y="236.5" text-anchor="end">80</text><text x="209" y="236.5" text-anchor="end">68</text><text x="241" y="236.5" text-anchor="end">15%</text></g>
          <rect x="247" y="229.9" width="25" height="9.4" rx="2" fill="#fff0d9"/>
          <text x="259.5" y="236.3" text-anchor="middle" font-size="5.1" font-weight="700" fill="#d88a17">Watch</text>
          <line x1="97" y1="243.0" x2="296" y2="243.0" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="100" y="252.5">Delta</text><text x="177" y="252.5" text-anchor="end">60</text><text x="209" y="252.5" text-anchor="end">54</text><text x="241" y="252.5" text-anchor="end">10%</text></g>
          <rect x="247" y="245.9" width="39" height="9.4" rx="2" fill="#fde7e7"/>
          <text x="266.5" y="252.3" text-anchor="middle" font-size="5.1" font-weight="700" fill="#d93c3c">Low margin</text>
          <line x1="97" y1="259.0" x2="296" y2="259.0" stroke="#edf1f4" stroke-width=".7"/>
          <text x="97" y="269" class="micro" font-size="4.6">These 4 projects: ₹355 L of ₹650 L revenue, 25.6% blended margin.</text>
          <!-- ================= RESOURCE UTILISATION TREND ================= -->
          <rect x="311" y="157" width="189" height="131" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="319" y="173" class="title" font-size="8.05">Resource utilisation trend</text>
          <circle cx="322" cy="184.6" r="2" fill="#1f63d6"/><text x="326" y="186.3" class="micro">Billable hours</text>
          <circle cx="370" cy="184.6" r="2" fill="#9cc3ee"/><text x="374" y="186.3" class="micro">Non-billable</text>
          <circle cx="417" cy="184.6" r="2" fill="#2f9e6c"/><text x="421" y="186.3" class="micro">Utilisation</text>
          <line x1="338" y1="273.0" x2="462" y2="273.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="335" y="274.6" text-anchor="end" class="micro">0K</text>
          <line x1="338" y1="257.8" x2="462" y2="257.8" stroke="#eef1f4" stroke-width=".7"/>
          <text x="335" y="259.4" text-anchor="end" class="micro">1K</text>
          <line x1="338" y1="242.6" x2="462" y2="242.6" stroke="#eef1f4" stroke-width=".7"/>
          <text x="335" y="244.2" text-anchor="end" class="micro">2K</text>
          <line x1="338" y1="227.4" x2="462" y2="227.4" stroke="#eef1f4" stroke-width=".7"/>
          <text x="335" y="229.0" text-anchor="end" class="micro">3K</text>
          <line x1="338" y1="212.2" x2="462" y2="212.2" stroke="#eef1f4" stroke-width=".7"/>
          <text x="335" y="213.8" text-anchor="end" class="micro">4K</text>
          <line x1="338" y1="197.0" x2="462" y2="197.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="335" y="198.6" text-anchor="end" class="micro">5K</text>
          <text x="466" y="274.6" class="micro">0%</text><text x="466" y="259.4" class="micro">20%</text><text x="466" y="244.2" class="micro">40%</text><text x="466" y="229.0" class="micro">60%</text><text x="466" y="213.8" class="micro">80%</text><text x="466" y="198.6" class="micro">100%</text>
          <g class="bar">
          <rect x="340.5" y="221.3" width="13" height="15.5" rx="1.5" fill="#a9cdf2"/>
          <rect x="340.5" y="235.8" width="13" height="37.2" rx="1.5" fill="#1f63d6"/>
          <rect x="362.0" y="221.3" width="13" height="14.4" rx="1.5" fill="#a9cdf2"/>
          <rect x="362.0" y="234.8" width="13" height="38.2" rx="1.5" fill="#1f63d6"/>
          <rect x="383.5" y="221.3" width="13" height="13.4" rx="1.5" fill="#a9cdf2"/>
          <rect x="383.5" y="233.7" width="13" height="39.3" rx="1.5" fill="#1f63d6"/>
          <rect x="405.0" y="221.3" width="13" height="12.4" rx="1.5" fill="#a9cdf2"/>
          <rect x="405.0" y="232.7" width="13" height="40.3" rx="1.5" fill="#1f63d6"/>
          <rect x="426.5" y="221.3" width="13" height="11.3" rx="1.5" fill="#a9cdf2"/>
          <rect x="426.5" y="231.7" width="13" height="41.3" rx="1.5" fill="#1f63d6"/>
          <rect x="448.0" y="221.3" width="13" height="10.3" rx="1.5" fill="#a9cdf2"/>
          <rect x="448.0" y="230.6" width="13" height="42.4" rx="1.5" fill="#1f63d6"/>
          </g>
          <text x="347" y="281" text-anchor="middle" class="micro">Jan</text>
          <text x="368.5" y="281" text-anchor="middle" class="micro">Feb</text>
          <text x="390" y="281" text-anchor="middle" class="micro">Mar</text>
          <text x="411.5" y="281" text-anchor="middle" class="micro">Apr</text>
          <text x="433" y="281" text-anchor="middle" class="micro">May</text>
          <text x="454.5" y="281" text-anchor="middle" class="micro">Jun</text>
          <g class="lineChart">
          <polyline points="347,218.3 368.5,216.8 390,215.2 411.5,213.7 433,212.2 454.5,210.7" fill="none" stroke="#2f9e6c" stroke-width="1.1"/>
          <circle cx="347" cy="218.3" r="1.9" fill="#fff" stroke="#2f9e6c" stroke-width=".9"/>
          <circle cx="368.5" cy="216.8" r="1.9" fill="#fff" stroke="#2f9e6c" stroke-width=".9"/>
          <circle cx="390" cy="215.2" r="1.9" fill="#fff" stroke="#2f9e6c" stroke-width=".9"/>
          <circle cx="411.5" cy="213.7" r="1.9" fill="#fff" stroke="#2f9e6c" stroke-width=".9"/>
          <circle cx="433" cy="212.2" r="1.9" fill="#fff" stroke="#2f9e6c" stroke-width=".9"/>
          <circle cx="454.5" cy="210.7" r="1.9" fill="#fff" stroke="#2f9e6c" stroke-width=".9"/>
          <text x="347" y="214.1" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">72%</text>
          <text x="368.5" y="212.6" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">74%</text>
          <text x="390" y="211.0" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">76%</text>
          <text x="411.5" y="209.5" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">78%</text>
          <text x="433" y="208.0" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">80%</text>
          <text x="454.5" y="206.5" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">82%</text>
          </g>
          <!-- ================= REVENUE MIX ================= -->
          <rect x="507" y="157" width="204" height="131" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="515" y="173" class="title" font-size="8.05">Revenue mix by service line</text>
          <g transform="rotate(-90 552 222)">
          <circle class="circleBar" cx="552" cy="222" r="30.5" fill="none" stroke="#0d1f4a" stroke-width="11" stroke-dasharray="76.05 115.58" stroke-dashoffset="0.00"/>
          <circle class="circleBar" cx="552" cy="222" r="30.5" fill="none" stroke="#1f5fd1" stroke-width="11" stroke-dasharray="53.06 138.58" stroke-dashoffset="-76.65"/>
          <circle class="circleBar" cx="552" cy="222" r="30.5" fill="none" stroke="#4f93e0" stroke-width="11" stroke-dasharray="33.89 157.74" stroke-dashoffset="-130.31"/>
          <circle class="circleBar" cx="552" cy="222" r="30.5" fill="none" stroke="#a9cdf2" stroke-width="11" stroke-dasharray="26.23 165.41" stroke-dashoffset="-164.81"/>
          </g>
          <text x="552" y="224.5" text-anchor="middle" class="title" font-size="9.2">₹<tspan class="counter" data-target="6.5" data-decimals="1">6.5</tspan> Cr</text>
          <text x="552" y="232" text-anchor="middle" class="micro">Total revenue</text>
          <circle cx="598" cy="186.1" r="2.2" fill="#0d1f4a"/>
          <text x="604" y="188.0" font-size="5.6" font-weight="500" fill="#1b3a57">Advisory</text>
          <text x="604" y="196.0" class="micro">₹2.6 Cr (40%)</text>
          <circle cx="598" cy="206.6" r="2.2" fill="#1f5fd1"/>
          <text x="604" y="208.5" font-size="5.6" font-weight="500" fill="#1b3a57">Implementation</text>
          <text x="604" y="216.5" class="micro">₹1.8 Cr (28%)</text>
          <circle cx="598" cy="227.1" r="2.2" fill="#4f93e0"/>
          <text x="604" y="229.0" font-size="5.6" font-weight="500" fill="#1b3a57">Managed services</text>
          <text x="604" y="237.0" class="micro">₹1.2 Cr (18%)</text>
          <circle cx="598" cy="247.6" r="2.2" fill="#a9cdf2"/>
          <text x="604" y="249.5" font-size="5.6" font-weight="500" fill="#1b3a57">Others</text>
          <text x="604" y="257.5" class="micro">₹0.9 Cr (14%)</text>
          <!-- ================= PROFITABILITY ================= -->
          <rect x="174" y="303" width="248" height="96" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="182" y="317" class="title" font-size="8.05">Profitability</text>
          <text x="414" y="317" text-anchor="end" class="micro">Q1 FY27</text>
          <rect x="182" y="325" width="54" height="47" rx="5" fill="#f3f7fc"/>
          <text x="187" y="335" class="micro">EBITDA</text>
          <text x="187" y="347.5" class="title" font-size="8.6">₹<tspan class="counter" data-target="1.20" data-decimals="2">1.20</tspan> Cr</text>
          <text x="187" y="357.0" font-size="4.7" font-weight="700" fill="#4d6275">18.5% margin</text>
          <rect x="241" y="325" width="54" height="47" rx="5" fill="#f3f7fc"/>
          <text x="246" y="335" class="micro">Profit after tax</text>
          <text x="246" y="347.5" class="title" font-size="8.6">₹<tspan class="counter" data-target="0.84" data-decimals="2">0.84</tspan> Cr</text>
          <text x="246" y="357.0" font-size="4.7" font-weight="700" fill="#4d6275">After dep. and</text>
          <text x="246" y="365.5" font-size="4.7" font-weight="700" fill="#4d6275">tax</text>
          <rect x="300" y="325" width="54" height="47" rx="5" fill="#f3f7fc"/>
          <text x="305" y="335" class="micro">Dividend</text>
          <text x="305" y="347.5" class="title" font-size="8.6">₹<tspan class="counter" data-target="0.30" data-decimals="2">0.30</tspan> Cr</text>
          <text x="305" y="357.0" font-size="4.7" font-weight="700" fill="#4d6275">Declared</text>
          <rect x="359" y="325" width="54" height="47" rx="5" fill="#f3f7fc"/>
          <text x="364" y="335" class="micro">Retained profit</text>
          <text x="364" y="347.5" class="title" font-size="8.6">₹<tspan class="counter" data-target="0.54" data-decimals="2">0.54</tspan> Cr</text>
          <text x="364" y="357.0" font-size="4.7" font-weight="700" fill="#4d6275">For the quarter</text>
          <!-- ================= CASH FLOW TREND ================= -->
          <rect x="430" y="303" width="202" height="96" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="438" y="317" class="title" font-size="8.05">Cash flow trend</text>
          <text x="528" y="317" class="micro">₹ Cr</text>
          <circle cx="568" cy="315.3" r="2" fill="#1f63d6"/><text x="572" y="317" font-size="4.8" font-weight="700" fill="#1f63d6">Inflow</text>
          <circle cx="596" cy="315.3" r="2" fill="#9cc3ee"/><text x="600" y="317" font-size="4.8" font-weight="700" fill="#7aaee8">Outflow</text>
          <line x1="455" y1="367.5" x2="586" y2="367.5" stroke="#eef1f4" stroke-width=".7"/>
          <text x="449" y="369.1" text-anchor="end" class="micro">1</text>
          <line x1="455" y1="355.0" x2="586" y2="355.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="449" y="356.6" text-anchor="end" class="micro">1.5</text>
          <line x1="455" y1="342.5" x2="586" y2="342.5" stroke="#eef1f4" stroke-width=".7"/>
          <text x="449" y="344.1" text-anchor="end" class="micro">2</text>
          <line x1="455" y1="330.0" x2="586" y2="330.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="449" y="331.6" text-anchor="end" class="micro">2.5</text>
          <g class="lineChart">
          <polyline points="463,353.8 485,352.5 507,351.2 529,350.0 551,348.8 573,347.5" fill="none" stroke="#a9cdf2" stroke-width="1.1"/>
          <circle cx="463" cy="353.8" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="485" cy="352.5" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="507" cy="351.2" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="529" cy="350.0" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="551" cy="348.8" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="573" cy="347.5" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          </g>
          <g class="lineChart">
          <polyline points="463,347.5 485,346.2 507,343.8 529,342.5 551,338.8 573,335.0" fill="none" stroke="#1f63d6" stroke-width="1.2"/>
          <circle cx="463" cy="347.5" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="485" cy="346.2" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="507" cy="343.8" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="529" cy="342.5" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="551" cy="338.8" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="573" cy="335.0" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          </g>
          <text x="463" y="378" text-anchor="middle" class="micro">Jan</text>
          <text x="485" y="378" text-anchor="middle" class="micro">Feb</text>
          <text x="507" y="378" text-anchor="middle" class="micro">Mar</text>
          <text x="529" y="378" text-anchor="middle" class="micro">Apr</text>
          <text x="551" y="378" text-anchor="middle" class="micro">May</text>
          <text x="573" y="378" text-anchor="middle" class="micro">Jun</text>
        </g>

        <!-- ================= FLOATING CARDS — OUTSIDE CLIP ON PURPOSE ================= -->

        <!-- top-right: key insight -->
        <g class="floatA" filter="url(#smallShadow)">
          <rect x="622" y="13" width="165" height="74" rx="11" fill="#f2fbf6" />
          <circle cx="644" cy="34" r="12" fill="#dff3e8" />
          <path d="M644 28.2a3.9 3.9 0 0 0-2.3 7.1v1.6h4.6v-1.6a3.9 3.9 0 0 0-2.3-7.1zM642.3 38.1h3.4v1.2h-3.4z" fill="#2f9e6c" />
          <text x="664" y="27.5" font-size="6.1" font-weight="700" fill="#173957">Key insight</text>
          <text x="664" y="46" font-size="16" font-weight="800" fill="#1d9e63"><tspan class="counter" data-target="35.4" data-decimals="1">35.4</tspan>%</text>
          <text x="664" y="57" font-size="5.15" fill="#4d6275">gross margin. Gamma and Delta</text>
          <text x="664" y="66" font-size="5.15" fill="#4d6275">(15% and 10%) pull it down; review</text>
          <text x="664" y="75" font-size="5.15" fill="#4d6275">their pricing.</text>
        </g>

        <!-- bottom-left: project margin insight -->
        <g class="floatB" filter="url(#smallShadow)">
          <rect x="13" y="357" width="151" height="68" rx="11" fill="#f6f3ff" />
          <circle cx="36" cy="380" r="12.5" fill="#ebe4fd" />
          <circle cx="36" cy="380" r="5.6" fill="none" stroke="#6a35e0" stroke-width="1.1" />
          <circle cx="36" cy="380" r="3" fill="none" stroke="#6a35e0" stroke-width="1.1" />
          <circle cx="36" cy="380" r="1" fill="#6a35e0" />
          <text x="56" y="373" font-size="6.25" font-weight="700" fill="#173957">Project margin insight</text>
          <text x="56" y="392" font-size="17" font-weight="800" fill="#6a2fe0"><tspan class="counter" data-target="40" data-decimals="0">40</tspan>%</text>
          <text x="56" y="403" font-size="5.0" fill="#4d6275">Project Alpha is the highest-</text>
          <text x="56" y="412.5" font-size="5.0" fill="#4d6275">margin project.</text>
        </g>

        <!-- bottom-right: utilisation opportunity -->
        <g class="floatA" filter="url(#smallShadow)">
          <rect x="643" y="350" width="145" height="75" rx="11" fill="#fff8ec" />
          <circle cx="666" cy="372" r="12" fill="#fdeccf" />
          <g fill="#e68a1a">
            <rect x="661" y="373.5" width="2.4" height="3.5" rx=".6" />
            <rect x="664.8" y="370.5" width="2.4" height="6.5" rx=".6" />
            <rect x="668.6" y="367" width="2.4" height="10" rx=".6" />
          </g>
          <text x="686" y="366" font-size="6.25" font-weight="700" fill="#173957">Utilisation opportunity</text>
          <text x="686" y="384" font-size="16" font-weight="800" fill="#e68a1a">+<tspan class="counter" data-target="9.8" data-decimals="1">9.8</tspan>%</text>
          <text x="686" y="397" font-size="5.0" fill="#4d6275">revenue if utilisation rises</text>
          <text x="686" y="406.5" font-size="5.0" fill="#4d6275">from 82% to 90% at current</text>
          <text x="686" y="416" font-size="5.0" fill="#4d6275">rates.</text>
        </g>
      </svg>
    </div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        // Line charts: <g class="lineChart"> holding one polyline + its dots.
        // The line draws left to right; each dot appears as the line reaches it.
        const lines = Array.from(document.querySelectorAll(".lineChart")).map((g) => {
          const pl = g.querySelector("polyline");
          const xs = pl.getAttribute("points").trim().split(/\s+/).map((pt) => num(pt.split(",")[0], 0));
          const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
          const L = pl.getTotalLength ? pl.getTotalLength() : 1000;
          pl.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          const dots = Array.from(g.querySelectorAll("circle, text, rect")).map((c) => {
            const x = c.hasAttribute("cx") ? num(c.getAttribute("cx"), 0)
              : num(c.getAttribute("x"), 0) + (c.tagName === "rect" ? num(c.getAttribute("width"), 0) / 2 : 0);
            return { c, at: x1 > x0 ? (x - x0) / (x1 - x0) : 0 };
          });
          return { pl, L, dots };
        });

        // KPI sparklines: <g class="sparkChart"> with an area path, a line path and an end dot.
        // Line draws left to right, area fills behind it, dot lands at the end.
        const sparks = Array.from(document.querySelectorAll(".sparkChart")).map((g, i) => {
          const paths = Array.from(g.querySelectorAll("path"));
          const line = paths.find((p) => p.getAttribute("fill") === "none");
          const area = paths.find((p) => p !== line);
          const dot = g.querySelector("circle");
          const L = line.getTotalLength();
          line.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          let clip = null, bb = null;
          if (area) {
            bb = area.getBBox();
            const ns = "http://www.w3.org/2000/svg";
            const cp = document.createElementNS(ns, "clipPath");
            cp.setAttribute("id", "sparkClip" + i);
            clip = document.createElementNS(ns, "rect");
            clip.setAttribute("x", bb.x); clip.setAttribute("y", bb.y - 2);
            clip.setAttribute("height", bb.height + 4); clip.setAttribute("width", 0);
            cp.appendChild(clip); g.appendChild(cp);
            area.setAttribute("clip-path", "url(#sparkClip" + i + ")");
          }
          return { line, L, clip, bb, dot };
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          sparks.forEach((sp) => {
            sp.line.setAttribute("stroke-dashoffset", (sp.L * (1 - p)).toFixed(2));
            if (sp.clip) sp.clip.setAttribute("width", (sp.bb.width * p).toFixed(2));
            if (sp.dot) sp.dot.style.opacity = Math.max(0, Math.min(1, (p - 0.94) / 0.06)).toFixed(2);
          });
          lines.forEach((ln) => {
            ln.pl.setAttribute("stroke-dashoffset", (ln.L * (1 - p)).toFixed(2));
            ln.dots.forEach((d) => {
              d.c.style.opacity = Math.max(0, Math.min(1, (p - d.at) / 0.06 + 1)).toFixed(2);
            });
          });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body>
</html>
`,
  startup: String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>CFO CRAFT — Startup Finance Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body { font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .stage { width: 800px; max-width: 100vw; margin: 0 auto; }
      svg { display: block; width: 100%; height: auto; overflow: hidden; }
      text { text-rendering: geometricPrecision; font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .title { font-weight: 700; fill: #10233f; }
      .semi { font-weight: 700; fill: #183a58; }
      .muted { font-weight: 500; fill: #5f7285; }
      .lab { fill: #1b3a57; }
      .micro { font-size: 4.8px; font-weight: 400; fill: #7a8896; }
      .tiny { font-size: 4.35px; font-weight: 400; fill: #7a8896; }
      .th text { font-size: 5.1px; font-weight: 500; fill: #5f7285; }
      .td text { font-size: 5.4px; font-weight: 500; fill: #1b3a57; }
      .counter { font-variant-numeric: tabular-nums; }
      .bar { transform-box: fill-box; transform-origin: bottom; }
      @media (prefers-reduced-motion: reduce) {
        .bar, .circleBar, .spark, .floatA, .floatB { animation: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-label="CFO CRAFT startup finance dashboard">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#073f91" />
            <stop offset=".50" stop-color="#063778" />
            <stop offset="1" stop-color="#082e65" />
          </linearGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="1" stop-color="#f9fbfd" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#03265c" flood-opacity=".26" />
          </filter>
          <filter id="smallShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0a315b" flood-opacity=".18" />
          </filter>
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#8fbaf0" fill-opacity=".35" />
          </pattern>
          <clipPath id="dashboardClip">
            <rect x="76" y="42" width="650" height="370" rx="14" />
          </clipPath>
        </defs>

        <!-- ===================== BACKGROUND ===================== -->
        <rect width="800" height="450" rx="23" fill="url(#bg)" />
        <g fill="none" stroke="#a8d0ff" stroke-opacity=".16" stroke-width="1">
          <path d="M-115 45C70-35 230-25 360 83" />
          <path d="M-122 91C70 2 252 10 395 118" />
          <path d="M-100 144C86 67 269 73 414 176" />
          <path d="M430-35C606-6 738 79 828 189" />
          <path d="M-55 357C93 297 218 318 320 403" />
          <path d="M530 345C654 351 760 401 839 472" />
        </g>
        <rect x="64" y="28" width="674" height="394" rx="18" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />
        <rect x="8" y="428" width="120" height="18" fill="url(#dots)" />
        <rect x="676" y="4" width="118" height="12" fill="url(#dots)" />

        <!-- ===================== MAIN DASHBOARD ===================== -->
        <rect x="76" y="42" width="650" height="370" rx="14" fill="url(#paper)" filter="url(#shadow)" />

        <g clip-path="url(#dashboardClip)">
          <!-- HEADER -->
          <rect x="89" y="52" width="29" height="29" rx="6" fill="#eaf3ff" />
          <path d="M108.6 58.4c-3.6.4-6.4 2.8-8.2 6.4l-2.6.3-2 2.3 3 .6 2.5 2.5.6 3 2.3-2 .3-2.6c3.6-1.8 6-4.6 6.4-8.2l.2-2.4z" fill="#1f6fd0" /><circle cx="105.2" cy="63.4" r="1.4" fill="#eaf3ff" /><path d="M97.6 70.6c-1.6.4-2.4 2-2.6 3.8 1.8-.2 3.4-1 3.8-2.6z" fill="#1f6fd0" />
          <text x="126" y="66" class="title" font-size="14.4">Startup Finance</text>
          <text x="126" y="77.5" class="muted" font-size="6.4">Runway, burn, unit economics and investor readiness</text>

          <rect x="497" y="48" width="107" height="20" rx="5" fill="#fff" stroke="#e7edf2" />
          <text x="504" y="60" font-size="5.55" font-weight="600" fill="#33495d">Q1 FY27 (Apr–Jun 2026)</text>
          <path d="M594 57.5l1.8 1.8 1.8-1.8" fill="none" stroke="#83909d" stroke-width=".8" />
          <rect x="428" y="72" width="176" height="15" rx="4" fill="#f1f5fb" />
          <text x="516" y="81.5" text-anchor="middle" class="tiny">Illustrative dashboard with sample data, not client results</text>

          <!-- ================= KPI ROW ================= -->
          <rect x="91" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <rect x="97" y="99" width="23" height="23" rx="6" fill="#eaf3ff"/>
          <g fill="#2878c9"><ellipse cx="108.5" cy="106.9" rx="4.4" ry="1.7"/><path d="M104.1 108.1c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/><path d="M104.1 111.7c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/></g>
          <text x="127" y="107" class="muted lab" font-size="6.05">Cash runway (months)</text>
          <text x="127" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="14.2" data-decimals="1">14.2</tspan></text>
          <path d="M127 132.2h4.2l-2.1 3.4z" fill="#33495d"/>
          <text x="133" y="135.6" font-size="5.25" font-weight="700" fill="#33495d">1.7 vs Mar 2026</text>
          <text x="127" y="144" class="micro">At ₹45 L monthly burn</text>
          <g class="sparkChart"><path d="M200.0 124.0 C201.0 124.6 204.1 126.7 206.2 127.8 C208.3 128.9 210.3 129.6 212.4 130.5 C214.5 131.4 216.5 132.5 218.6 133.2 C220.7 133.8 222.7 133.7 224.8 134.3 C226.9 135.0 230.0 136.6 231.0 137.0 V139 H200z" fill="#e3eefb"/><path d="M200.0 124.0 C201.0 124.6 204.1 126.7 206.2 127.8 C208.3 128.9 210.3 129.6 212.4 130.5 C214.5 131.4 216.5 132.5 218.6 133.2 C220.7 133.8 222.7 133.7 224.8 134.3 C226.9 135.0 230.0 136.6 231.0 137.0" fill="none" stroke="#2f7fd6" stroke-width="1.2" stroke-linecap="round" class="spark"/><circle cx="231.0" cy="137.0" r="1.6" fill="#2f7fd6"/></g>
          <rect x="247" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <rect x="253" y="99" width="23" height="23" rx="6" fill="#fdeaea"/>
          <path d="M264.5 105.5c.4 2.4 3.6 3.6 3.6 6.6a3.6 3.6 0 0 1-7.2 0c0-1.6.8-2.6 1.6-3.4.1 1.2.7 2 1.4 2.2-.4-1.8-.2-3.8.6-5.4z" fill="#e0483e"/>
          <text x="283" y="107" class="muted lab" font-size="6.05">Monthly burn</text>
          <text x="283" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="45" data-decimals="0">45</tspan> L</text>
          <path d="M283 132.2h4.2l-2.1 3.4z" fill="#299d73"/>
          <text x="289" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">8.2% vs Mar</text>
          <text x="283" y="144" class="micro">Mar 2026: ₹49 L</text>
          <g class="bar"><rect x="358" y="123" width="3.4" height="16" rx=".7" fill="#9fd8bb"/><rect x="363" y="123.5" width="3.4" height="15.5" rx=".7" fill="#8bd0ad"/><rect x="368" y="127" width="3.4" height="12" rx=".7" fill="#6cc197"/><rect x="373" y="128" width="3.4" height="11" rx=".7" fill="#55b588"/><rect x="378" y="132.5" width="3.4" height="6.5" rx=".7" fill="#3fa877"/><rect x="383" y="135" width="3.4" height="4" rx=".7" fill="#2e9e6c"/></g>
          <rect x="403" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <rect x="409" y="99" width="23" height="23" rx="6" fill="#e7f7ef"/>
          <g fill="#2e9e6e"><rect x="416.1" y="110.9" width="2.3" height="3.6" rx=".5"/><rect x="419.35" y="108.6" width="2.3" height="5.9" rx=".5"/><rect x="422.6" y="106.1" width="2.3" height="8.4" rx=".5"/></g>
          <text x="439" y="107" class="muted lab" font-size="6.05">ARR</text>
          <text x="439" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="5.4" data-decimals="1">5.4</tspan> Cr</text>
          <path d="M439 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <text x="445" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">18.6% QoQ</text>
          <text x="439" y="144" class="micro">Annual recurring</text>
          <g class="bar"><rect x="516" y="136" width="4.2" height="3" rx=".8" fill="#a8dcc1"/><rect x="522" y="133" width="4.2" height="6" rx=".8" fill="#86cfa9"/><rect x="528" y="129.5" width="4.2" height="9.5" rx=".8" fill="#5fbd8d"/><rect x="534" y="126" width="4.2" height="13" rx=".8" fill="#3faa77"/><rect x="540" y="122.5" width="4.2" height="16.5" rx=".8" fill="#2e9e6c"/></g>
          <rect x="559" y="93" width="153" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <rect x="565" y="99" width="23" height="23" rx="6" fill="#f1ecfe"/>
          <text x="576.5" y="113.8" text-anchor="middle" font-size="9.4" font-weight="800" fill="#6a35e0">%</text>
          <text x="595" y="107" class="muted lab" font-size="6.05">Gross margin</text>
          <text x="595" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="72" data-decimals="0">72</tspan>%</text>
          <path d="M595 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <text x="601" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">3.4 pts QoQ</text>
          <text x="595" y="144" class="micro">Q4 FY26: 68.6%</text>
          <g class="sparkChart"><path d="M671 137C677 135 682 134 687 131S696 126 701 123V138H671z" fill="#e3f5ec"/><path d="M671 137C677 135 682 134 687 131S696 126 701 123" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="701" cy="123" r="1.6" fill="#2f9e6c"/></g>
          <!-- ================= CASH RUNWAY AND BURN ================= -->
          <rect x="89" y="157" width="214" height="139" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="97" y="172" class="title" font-size="8.05">Cash runway and burn</text>
          <circle cx="99.5" cy="181.7" r="2" fill="#5b9be8"/><text x="103.5" y="183.4" class="micro">Cash balance (₹ Cr)</text>
          <circle cx="169.5" cy="181.7" r="2" fill="#1f6fd0"/><text x="173.5" y="183.4" class="micro">Runway (months)</text>
          <line x1="117" y1="269.0" x2="277" y2="269.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="113" y="270.6" text-anchor="end" class="micro">0</text>
          <text x="281" y="270.6" class="micro">0m</text>
          <line x1="117" y1="250.8" x2="277" y2="250.8" stroke="#eef1f4" stroke-width=".7"/>
          <text x="113" y="252.3" text-anchor="end" class="micro">4</text>
          <text x="281" y="252.3" class="micro">5m</text>
          <line x1="117" y1="232.5" x2="277" y2="232.5" stroke="#eef1f4" stroke-width=".7"/>
          <text x="113" y="234.1" text-anchor="end" class="micro">8</text>
          <text x="281" y="234.1" class="micro">10m</text>
          <line x1="117" y1="214.2" x2="277" y2="214.2" stroke="#eef1f4" stroke-width=".7"/>
          <text x="113" y="215.8" text-anchor="end" class="micro">12</text>
          <text x="281" y="215.8" class="micro">15m</text>
          <line x1="117" y1="196.0" x2="277" y2="196.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="113" y="197.6" text-anchor="end" class="micro">16</text>
          <text x="281" y="197.6" class="micro">20m</text>
          <text transform="translate(102 233) rotate(-90)" text-anchor="middle" class="micro">Cash (₹ Cr)</text>
          <g class="bar">
          <rect x="120" y="228.8" width="16" height="40.2" rx="1.6" fill="#5b9be8"/>
          <rect x="147" y="231.1" width="16" height="37.9" rx="1.6" fill="#5b9be8"/>
          <rect x="174" y="233.4" width="16" height="35.6" rx="1.6" fill="#5b9be8"/>
          <rect x="202" y="235.7" width="16" height="33.3" rx="1.6" fill="#5b9be8"/>
          <rect x="229" y="237.5" width="16" height="31.5" rx="1.6" fill="#5b9be8"/>
          <rect x="256" y="239.8" width="16" height="29.2" rx="1.6" fill="#5b9be8"/>
          </g>
          <text x="128" y="225.8" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">8.8</text>
          <text x="128" y="279" text-anchor="middle" class="micro">Jan</text>
          <text x="155" y="228.1" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">8.3</text>
          <text x="155" y="279" text-anchor="middle" class="micro">Feb</text>
          <text x="182" y="230.4" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">7.8</text>
          <text x="182" y="279" text-anchor="middle" class="micro">Mar</text>
          <text x="210" y="232.7" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">7.3</text>
          <text x="210" y="279" text-anchor="middle" class="micro">Apr</text>
          <text x="237" y="234.5" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">6.9</text>
          <text x="237" y="279" text-anchor="middle" class="micro">May</text>
          <text x="264" y="236.8" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">6.4</text>
          <text x="264" y="279" text-anchor="middle" class="micro">Jun</text>
          <g class="lineChart">
          <polyline points="128,204.8 155,208.4 182,211.0 210,213.5 237,214.6 264,217.2" fill="none" stroke="#1f6fd0" stroke-width="1.1"/>
          <circle cx="128" cy="204.8" r="1.9" fill="#fff" stroke="#1f6fd0" stroke-width=".9"/>
          <text x="128" y="200.8" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">17.6</text>
          <circle cx="155" cy="208.4" r="1.9" fill="#fff" stroke="#1f6fd0" stroke-width=".9"/>
          <text x="155" y="204.4" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">16.6</text>
          <circle cx="182" cy="211.0" r="1.9" fill="#fff" stroke="#1f6fd0" stroke-width=".9"/>
          <text x="182" y="207.0" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">15.9</text>
          <circle cx="210" cy="213.5" r="1.9" fill="#fff" stroke="#1f6fd0" stroke-width=".9"/>
          <text x="210" y="209.5" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">15.2</text>
          <circle cx="237" cy="214.6" r="1.9" fill="#fff" stroke="#1f6fd0" stroke-width=".9"/>
          <text x="237" y="210.6" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">14.9</text>
          <circle cx="264" cy="217.2" r="1.9" fill="#fff" stroke="#1f6fd0" stroke-width=".9"/>
          <text x="264" y="213.2" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">14.2</text>
          </g>
          <!-- ================= UNIT ECONOMICS ================= -->
          <rect x="312" y="157" width="179" height="139" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="319" y="172" class="title" font-size="8.05">Unit economics</text>
          <text x="483" y="172" text-anchor="end" class="micro">QoQ</text>
          <rect x="320" y="191" width="16" height="16" rx="4.5" fill="#eaf3ff"/>
          <g fill="#2878c9"><circle cx="326.2" cy="197.4" r="1.7"/><circle cx="330.3" cy="197.9" r="1.4"/><path d="M323.1 202.6c0-2.4 1.4-3.6 3.1-3.6s3.1 1.2 3.1 3.6z"/><path d="M329.8 202.6c0-1.1-.2-2-.7-2.7.3-.3.8-.5 1.2-.5 1.4 0 2.6 1 2.6 3.2z"/></g>
          <text x="341" y="186.5" class="micro" font-size="5">CAC</text>
          <text x="341" y="200.5" class="title" font-size="9.4">₹<tspan class="counter" data-target="18" data-decimals="0">18</tspan>K</text>
          <path d="M341 211l2.1-3.4 2.1 3.4z" fill="#d93c3c"/>
          <text x="347" y="211" font-size="5" font-weight="700" fill="#d93c3c">12%</text>
          <rect x="405" y="191" width="16" height="16" rx="4.5" fill="#eaf3ff"/>
          <path d="M409 197.4l1.6-2.4h4.8l1.6 2.4L413 202.8z" fill="#1f6fd0"/>
          <text x="426" y="186.5" class="micro" font-size="5">LTV</text>
          <text x="426" y="200.5" class="title" font-size="9.4">₹<tspan class="counter" data-target="1.42" data-decimals="2">1.42</tspan> L</text>
          <path d="M426 211l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <text x="432" y="211" font-size="5" font-weight="700" fill="#299d73">16%</text>
          <rect x="320" y="234" width="16" height="16" rx="4.5" fill="#eaf3ff"/>
          <g fill="none" stroke="#2878c9" stroke-width=".9" stroke-linecap="round"><path d="M328 238v7.4M325 245.4h6M324 239.6h8"/><path d="M324 239.6l-1.6 3h3.2zM332 239.6l-1.6 3h3.2z"/></g>
          <text x="341" y="229.5" class="micro" font-size="5">LTV : CAC</text>
          <text x="341" y="243.5" class="title" font-size="9.4"><tspan class="counter" data-target="7.9" data-decimals="1">7.9</tspan>x</text>
          <path d="M341 254l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <text x="347" y="254" font-size="5" font-weight="700" fill="#299d73">0.3x</text>
          <rect x="405" y="234" width="16" height="16" rx="4.5" fill="#f1ecfe"/>
          <circle cx="413" cy="242" r="3.8" fill="none" stroke="#7a4fe0" stroke-width="1"/><path d="M413 240V242l1.5 1.1" fill="none" stroke="#7a4fe0" stroke-width=".9" stroke-linecap="round"/>
          <text x="426" y="229.5" class="micro" font-size="5">Payback period</text>
          <text x="426" y="243.5" class="title" font-size="9.4"><tspan class="counter" data-target="4.8" data-decimals="1">4.8</tspan> months</text>
          <path d="M426 250.6h4.2l-2.1 3.4z" fill="#299d73"/>
          <text x="432" y="254" font-size="5" font-weight="700" fill="#299d73">1.2 months</text>
          <!-- ================= INVESTOR MIS ================= -->
          <rect x="499" y="157" width="212" height="139" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="507" y="172" class="title" font-size="8.05">Investor MIS</text>
          <text x="703" y="172" text-anchor="end" class="micro">Q1 FY27 YTD</text>
          <rect x="507" y="180" width="196" height="14" rx="2" fill="#f2f6fb"/>
          <g class="th"><text x="510" y="189.3">Metric</text><text x="611" y="189.3" text-anchor="end">Actual</text><text x="654" y="189.3" text-anchor="end">Plan</text><text x="700" y="189.3" text-anchor="end">Variance</text></g>
          <g class="td"><text x="510" y="203.5">Revenue</text><text x="611" y="203.5" text-anchor="end">₹1.30 Cr</text><text x="654" y="203.5" text-anchor="end">₹1.20 Cr</text></g>
          <text x="700" y="203.5" text-anchor="end" font-size="5.4" font-weight="700" fill="#299d73">+8.3%</text>
          <line x1="507" y1="209.0" x2="703" y2="209.0" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="510" y="218.0">EBITDA</text><text x="611" y="218.0" text-anchor="end">−₹1.39 Cr</text><text x="654" y="218.0" text-anchor="end">−₹1.50 Cr</text></g>
          <text x="700" y="218.0" text-anchor="end" font-size="5.4" font-weight="700" fill="#299d73">+7.3%</text>
          <line x1="507" y1="223.5" x2="703" y2="223.5" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="510" y="232.5">Cash balance</text><text x="611" y="232.5" text-anchor="end">₹6.40 Cr</text><text x="654" y="232.5" text-anchor="end">₹6.20 Cr</text></g>
          <text x="700" y="232.5" text-anchor="end" font-size="5.4" font-weight="700" fill="#299d73">+3.2%</text>
          <line x1="507" y1="238.0" x2="703" y2="238.0" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="510" y="247.0">Monthly burn</text><text x="611" y="247.0" text-anchor="end">₹45 L</text><text x="654" y="247.0" text-anchor="end">₹49 L</text></g>
          <text x="700" y="247.0" text-anchor="end" font-size="5.4" font-weight="700" fill="#299d73">−8.2%</text>
          <line x1="507" y1="252.5" x2="703" y2="252.5" stroke="#edf1f4" stroke-width=".7"/>
          <text x="507" y="262" class="micro" font-size="4.6">All variances favourable to plan.</text>
          <!-- ================= DILIGENCE READINESS ================= -->
          <rect x="173" y="304" width="204" height="101" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="182" y="318" class="title" font-size="8.05">Diligence readiness</text>
          <circle cx="206" cy="362" r="20.3" fill="none" stroke="#e7ebf0" stroke-width="5.6"/>
          <circle class="circleBar" cx="206" cy="362" r="20.3" fill="none" stroke="#1d9e5f" stroke-width="5.6" stroke-dasharray="102.04 127.55" stroke-dashoffset="0" transform="rotate(-90 206 362)"/>
          <text x="206" y="362.8" text-anchor="middle" font-size="5.6" font-weight="700" fill="#173957"><tspan class="counter" data-target="4" data-decimals="0">4</tspan> of 5</text>
          <text x="206" y="368.8" text-anchor="middle" class="micro" font-size="4.4">ready</text>
          <circle cx="239" cy="333.0" r="3.2" fill="#1d9e5f"/><path d="M237.5 333.0l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="247" y="334.9" font-size="5.4" font-weight="500" fill="#1b3a57">Financial model</text>
          <rect x="333" y="328.2" width="36" height="9.6" rx="2" fill="#e2f6ea"/>
          <text x="351.0" y="334.8" text-anchor="middle" font-size="5.1" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="239" cy="347.5" r="3.2" fill="#1d9e5f"/><path d="M237.5 347.5l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="247" y="349.4" font-size="5.4" font-weight="500" fill="#1b3a57">Cap table</text>
          <rect x="333" y="342.7" width="36" height="9.6" rx="2" fill="#e2f6ea"/>
          <text x="351.0" y="349.3" text-anchor="middle" font-size="5.1" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="239" cy="362.0" r="3.2" fill="#1d9e5f"/><path d="M237.5 362.0l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="247" y="363.9" font-size="5.4" font-weight="500" fill="#1b3a57">MIS pack</text>
          <rect x="333" y="357.2" width="36" height="9.6" rx="2" fill="#e2f6ea"/>
          <text x="351.0" y="363.8" text-anchor="middle" font-size="5.1" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="239" cy="376.5" r="3.2" fill="#1d9e5f"/><path d="M237.5 376.5l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="247" y="378.4" font-size="5.4" font-weight="500" fill="#1b3a57">Bank statements</text>
          <rect x="333" y="371.7" width="36" height="9.6" rx="2" fill="#e2f6ea"/>
          <text x="351.0" y="378.3" text-anchor="middle" font-size="5.1" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="239" cy="391.0" r="3.2" fill="#f08c1a"/><text x="239" y="392.7" text-anchor="middle" font-size="4.6" font-weight="800" fill="#fff">!</text>
          <text x="247" y="392.9" font-size="5.4" font-weight="500" fill="#1b3a57">Legal records</text>
          <rect x="329" y="386.2" width="40" height="9.6" rx="2" fill="#fff0d9"/>
          <text x="349.0" y="392.8" text-anchor="middle" font-size="5.1" font-weight="700" fill="#d88a17">In progress</text>
          <!-- ================= KEY STARTUP INSIGHTS ================= -->
          <rect x="386" y="303" width="245" height="102" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="393" y="318" class="title" font-size="8.05">Key startup insights</text>
          <rect x="393" y="327" width="74" height="63" rx="6" fill="#f3f7fc"/>
          <circle cx="402" cy="337.3" r="2.6" fill="#1d9e5f"/>
          <text x="410" y="339" font-size="5.6" font-weight="700" fill="#173957">Burn down</text>
          <text x="410" y="347.8" font-size="5.6" font-weight="700" fill="#173957">8.2% in the</text>
          <text x="410" y="356.6" font-size="5.6" font-weight="700" fill="#173957">quarter</text>
          <text x="410" y="364.6" class="micro" font-size="5">Hiring and</text>
          <text x="410" y="372.8" class="micro" font-size="5">operating cost</text>
          <text x="410" y="381.0" class="micro" font-size="5">discipline.</text>
          <rect x="472" y="327" width="74" height="63" rx="6" fill="#f3f7fc"/>
          <circle cx="481" cy="337.3" r="2.6" fill="#f08c1a"/>
          <text x="489" y="339" font-size="5.6" font-weight="700" fill="#173957">Runway at 14.2</text>
          <text x="489" y="347.8" font-size="5.6" font-weight="700" fill="#173957">months</text>
          <text x="489" y="355.8" class="micro" font-size="5">Start planning</text>
          <text x="489" y="364.0" class="micro" font-size="5">the next raise</text>
          <text x="489" y="372.2" class="micro" font-size="5">now.</text>
          <rect x="550" y="327" width="73" height="63" rx="6" fill="#f3f7fc"/>
          <circle cx="559" cy="337.3" r="2.6" fill="#d93c3c"/>
          <text x="567" y="339" font-size="5.6" font-weight="700" fill="#173957">CAC up 12%</text>
          <text x="567" y="347.0" class="micro" font-size="5">LTV:CAC still</text>
          <text x="567" y="355.2" class="micro" font-size="5">strong at 7.9x.</text>
        </g>

        <!-- ================= FLOATING CARDS — OUTSIDE CLIP ON PURPOSE ================= -->

        <!-- top-right: investor readiness -->
        <g class="floatA" filter="url(#smallShadow)">
          <rect x="620" y="12" width="167" height="66" rx="11" fill="#f2fbf6" />
          <circle cx="644" cy="33" r="12.5" fill="#dff3e8" />
          <circle cx="644" cy="33" r="5.6" fill="none" stroke="#1d9e5f" stroke-width="1.1" />
          <circle cx="644" cy="33" r="3" fill="none" stroke="#1d9e5f" stroke-width="1.1" />
          <circle cx="644" cy="33" r="1" fill="#1d9e5f" />
          <text x="665" y="28" font-size="6.1" font-weight="700" fill="#173957">Investor readiness</text>
          <text x="665" y="47" font-size="16" font-weight="800" fill="#1d9e5f"><tspan class="counter" data-target="4" data-decimals="0">4</tspan> of 5</text>
          <text x="665" y="57.5" font-size="5.15" fill="#4d6275">diligence items ready. Legal and</text>
          <text x="665" y="67" font-size="5.15" fill="#4d6275">secretarial records in progress.</text>
        </g>

        <!-- bottom-left: cash runway -->
        <g class="floatB" filter="url(#smallShadow)">
          <rect x="13" y="357" width="150" height="67" rx="11" fill="#f1f6fe" />
          <circle cx="36" cy="380" r="12.5" fill="#e1ecfb" />
          <g fill="#1f6fd0">
            <rect x="31" y="381.5" width="2.4" height="3.5" rx=".6" />
            <rect x="34.8" y="378.5" width="2.4" height="6.5" rx=".6" />
            <rect x="38.6" y="375" width="2.4" height="10" rx="0.6" />
          </g>
          <text x="56" y="373" font-size="6.25" font-weight="700" fill="#173957">Cash runway</text>
          <text x="56" y="392.5" font-size="16.2" font-weight="800" fill="#1f6fd0"><tspan class="counter" data-target="14.2" data-decimals="1">14.2</tspan> months</text>
          <text x="56" y="404" font-size="5.0" fill="#4d6275">₹6.40 Cr cash at ₹45 L monthly</text>
          <text x="56" y="413.5" font-size="5.0" fill="#4d6275">burn.</text>
        </g>

        <!-- bottom-right: CFO insight -->
        <g class="floatA" filter="url(#smallShadow)">
          <rect x="641" y="345" width="147" height="79" rx="11" fill="#fff8ec" />
          <circle cx="666" cy="369" r="12" fill="#fdeccf" />
          <path d="M666 363.2a3.9 3.9 0 0 0-2.3 7.1v1.6h4.6v-1.6a3.9 3.9 0 0 0-2.3-7.1zM664.3 373.1h3.4v1.2h-3.4z" fill="#e68a1a" />
          <text x="687" y="364" font-size="6.25" font-weight="700" fill="#173957">CFO insight</text>
          <text x="687" y="383" font-size="16" font-weight="800" fill="#e68a1a"><tspan class="counter" data-target="16.0" data-decimals="1">16.0</tspan></text>
          <text x="687" y="395" font-size="5.0" fill="#4d6275">months of runway (from 14.2)</text>
          <text x="687" y="404" font-size="5.0" fill="#4d6275">if monthly burn falls by a</text>
          <text x="687" y="413" font-size="5.0" fill="#4d6275">further ₹5 L.</text>
        </g>
      </svg>
    </div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        // Line charts: <g class="lineChart"> holding one polyline + its dots.
        // The line draws left to right; each dot appears as the line reaches it.
        const lines = Array.from(document.querySelectorAll(".lineChart")).map((g) => {
          const pl = g.querySelector("polyline");
          const xs = pl.getAttribute("points").trim().split(/\s+/).map((pt) => num(pt.split(",")[0], 0));
          const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
          const L = pl.getTotalLength ? pl.getTotalLength() : 1000;
          pl.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          const dots = Array.from(g.querySelectorAll("circle, text")).map((c) => ({
            c, at: x1 > x0 ? (num(c.getAttribute("cx") || c.getAttribute("x"), 0) - x0) / (x1 - x0) : 0
          }));
          return { pl, L, dots };
        });

        // KPI sparklines: <g class="sparkChart"> with an area path, a line path and an end dot.
        // Line draws left to right, area fills behind it, dot lands at the end.
        const sparks = Array.from(document.querySelectorAll(".sparkChart")).map((g, i) => {
          const paths = Array.from(g.querySelectorAll("path"));
          const line = paths.find((p) => p.getAttribute("fill") === "none");
          const area = paths.find((p) => p !== line);
          const dot = g.querySelector("circle");
          const L = line.getTotalLength();
          line.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          let clip = null, bb = null;
          if (area) {
            bb = area.getBBox();
            const ns = "http://www.w3.org/2000/svg";
            const cp = document.createElementNS(ns, "clipPath");
            cp.setAttribute("id", "sparkClip" + i);
            clip = document.createElementNS(ns, "rect");
            clip.setAttribute("x", bb.x); clip.setAttribute("y", bb.y - 2);
            clip.setAttribute("height", bb.height + 4); clip.setAttribute("width", 0);
            cp.appendChild(clip); g.appendChild(cp);
            area.setAttribute("clip-path", "url(#sparkClip" + i + ")");
          }
          return { line, L, clip, bb, dot };
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          sparks.forEach((sp) => {
            sp.line.setAttribute("stroke-dashoffset", (sp.L * (1 - p)).toFixed(2));
            if (sp.clip) sp.clip.setAttribute("width", (sp.bb.width * p).toFixed(2));
            if (sp.dot) sp.dot.style.opacity = Math.max(0, Math.min(1, (p - 0.94) / 0.06)).toFixed(2);
          });
          lines.forEach((ln) => {
            ln.pl.setAttribute("stroke-dashoffset", (ln.L * (1 - p)).toFixed(2));
            ln.dots.forEach((d) => {
              d.c.style.opacity = Math.max(0, Math.min(1, (p - d.at) / 0.06 + 1)).toFixed(2);
            });
          });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body>
</html>
`,
  diagnostic: String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>CFO CRAFT — Finance Diagnostic Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body { font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .stage { width: 800px; max-width: 100vw; margin: 0 auto; }
      svg { display: block; width: 100%; height: auto; overflow: hidden; }
      text { text-rendering: geometricPrecision; font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .title { font-weight: 700; fill: #10233f; }
      .semi { font-weight: 700; fill: #183a58; }
      .muted { font-weight: 500; fill: #5f7285; }
      .lab { fill: #1b3a57; }
      .micro { font-size: 4.8px; font-weight: 400; fill: #7a8896; }
      .tiny { font-size: 4.35px; font-weight: 400; fill: #7a8896; }
      .th text { font-size: 5.1px; font-weight: 500; fill: #5f7285; }
      .td text { font-size: 5.4px; font-weight: 500; fill: #1b3a57; }
      .counter { font-variant-numeric: tabular-nums; }
      .bar { transform-box: fill-box; transform-origin: bottom; }
      .barN { transform-box: fill-box; transform-origin: top; }
      @media (prefers-reduced-motion: reduce) {
        .bar, .barN, .spark, .floatA, .floatB { animation: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-label="CFO CRAFT finance diagnostic dashboard">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#073f91" />
            <stop offset=".50" stop-color="#063778" />
            <stop offset="1" stop-color="#082e65" />
          </linearGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="1" stop-color="#f9fbfd" />
          </linearGradient>
          <radialGradient id="orb" cx=".35" cy=".3" r=".8">
            <stop offset="0" stop-color="#2f78d8" stop-opacity=".75" />
            <stop offset="1" stop-color="#0a3f8f" stop-opacity=".15" />
          </radialGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#7fb4ff" stop-opacity=".7" />
            <stop offset=".6" stop-color="#e3b25a" stop-opacity=".85" />
            <stop offset="1" stop-color="#e3b25a" stop-opacity="0" />
          </linearGradient>
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#8fbaf0" fill-opacity=".45" />
          </pattern>
          <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#8fbaf0" stroke-opacity=".12" stroke-width=".7" />
          </pattern>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#03265c" flood-opacity=".26" />
          </filter>
          <filter id="smallShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0a315b" flood-opacity=".18" />
          </filter>
          <clipPath id="dashboardClip">
            <rect x="76" y="42" width="650" height="370" rx="14" />
          </clipPath>
        </defs>

        <!-- ===================== BACKGROUND ===================== -->
        <rect width="800" height="450" rx="23" fill="url(#bg)" />
        <circle cx="68" cy="70" r="52" fill="url(#orb)" />
        <circle cx="35" cy="300" r="58" fill="url(#orb)" opacity=".7" />
        <circle cx="770" cy="330" r="55" fill="url(#orb)" opacity=".8" />
        <g stroke="#a8d0ff" stroke-opacity=".22"><path d="M0 330L70 270M0 350L80 280" /><path d="M735 200L800 140M745 225L800 175" /></g>
        <rect x="12" y="92" width="50" height="46" fill="url(#dots)" />
        <rect x="740" y="224" width="48" height="44" fill="url(#dots)" />
        <rect x="64" y="28" width="674" height="394" rx="18" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />

        <!-- ===================== MAIN DASHBOARD ===================== -->
        <rect x="76" y="42" width="650" height="370" rx="14" fill="url(#paper)" filter="url(#shadow)" />

        <g clip-path="url(#dashboardClip)">
          <!-- HEADER -->
          <rect x="89" y="52" width="29" height="29" rx="6" fill="#eaf3ff" />
          <g transform="translate(103.5 66.5) scale(1.45) translate(-103.5 -66.5)"><g fill="#1f6fd0"><rect x="99.1" y="66.9" width="2.3" height="3.6" rx=".5"/><rect x="102.35" y="64.6" width="2.3" height="5.9" rx=".5"/><rect x="105.6" y="62.1" width="2.3" height="8.4" rx=".5"/></g></g>
          <text x="126" y="66" class="title" font-size="14.4">Finance Diagnostic</text>
          <text x="126" y="77.5" class="muted" font-size="6.4">Know exactly where your cash and profit are stuck</text>

          <rect x="497" y="48" width="107" height="20" rx="5" fill="#fff" stroke="#e7edf2" />
          <text x="504" y="60"  font-size="5.55" font-weight="600" fill="#33495d">Q1 FY27 (Apr–Jun 2026)</text>
          <path d="M594 57.5l1.8 1.8 1.8-1.8" fill="none" stroke="#83909d" stroke-width=".8" />
          <rect x="428" y="72" width="176" height="15" rx="4" fill="#f1f5fb" />
          <text x="516" y="81.5" text-anchor="middle" class="tiny">Illustrative dashboard with sample data, not client results</text>

          <!-- ================= KPI ROW ================= -->
          <rect x="91" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="97" y="99" width="23" height="23" rx="6" fill="#eaf3ff"/>
<circle cx="108.5" cy="110.5" r="4.6" fill="none" stroke="#1f6fd0" stroke-width="1.2"/><path d="M108.5 108.1V110.5l1.8 1.3" fill="none" stroke="#1f6fd0" stroke-width="1.1" stroke-linecap="round"/>
<text x="127" y="107" class="muted lab" font-size="6.05">Cash cycle</text>
<text x="127" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="102" data-decimals="0">102</tspan> days</text>
<path d="M127 132.2h4.2l-2.1 3.4z" fill="#299d73"/>
<text x="133" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">16 days vs Mar</text>
<text x="127" y="144" class="micro">Mar 2026: 118 days</text>
<g class="sparkChart"><path d="M198 124C207.3 125 210.4 129.0 213.5 130.5S222.8 136 229 137V138.5H198z" fill="#e3f5ec"/><path d="M198 124C207.3 125 210.4 129.0 213.5 130.5S222.8 136 229 137" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="229" cy="137" r="1.6" fill="#2f9e6c"/></g>
          <rect x="247" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="253" y="99" width="23" height="23" rx="6" fill="#fff3df"/>
<g fill="#eaa044"><ellipse cx="264.5" cy="106.9" rx="4.4" ry="1.7"/><path d="M260.1 108.1c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/><path d="M260.1 111.7c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/></g>
<text x="283" y="107" class="muted lab" font-size="6.05">Net working capital</text>
<text x="283" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="12.5" data-decimals="1">12.5</tspan> Cr</text>
<path d="M283 132.2h4.2l-2.1 3.4z" fill="#299d73"/>
<text x="289" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">2.7% vs Mar</text>
<text x="283" y="144" class="micro">Mar 2026: ₹12.85 Cr</text>
<g class="sparkChart"><path d="M354 124C363.3 125 366.4 129.0 369.5 130.5S378.8 136 385 137V138.5H354z" fill="#e3f5ec"/><path d="M354 124C363.3 125 366.4 129.0 369.5 130.5S378.8 136 385 137" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="385" cy="137" r="1.6" fill="#2f9e6c"/></g>
          <rect x="403" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="409" y="99" width="23" height="23" rx="6" fill="#e7f7ef"/>
<circle cx="420.5" cy="110.5" r="5" fill="none" stroke="#2e9e6e" stroke-width="1.1"/><circle cx="420.5" cy="110.5" r="2.7" fill="none" stroke="#2e9e6e" stroke-width="1.1"/><circle cx="420.5" cy="110.5" r=".9" fill="#2e9e6e"/>
<text x="439" y="107" class="muted lab" font-size="6.05">Potential cash release</text>
<text x="439" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="4.85" data-decimals="2">4.85</tspan> Cr</text>
<text x="439" y="135.6" font-size="5.25" font-weight="700" fill="#4d6275">Estimated, 3 levers</text>
<text x="439" y="144" class="micro">Stock, debtors, suppliers</text>

          <rect x="559" y="93" width="153" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="565" y="99" width="23" height="23" rx="6" fill="#f1ecfe"/>
<path d="M573.1 105.9h4.4l2.4 2.4v6.8h-6.8z" fill="#7a4fe0"/><path d="M574.7 110.5h3.6M574.7 112.3h3.6" stroke="#fff" stroke-width=".6"/>
<text x="595" y="107" class="muted lab" font-size="6.05">Action plan</text>
<text x="595" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="4" data-decimals="0">4</tspan> weeks</text>
<text x="595" y="135.6" font-size="5.25" font-weight="700" fill="#4d6275">Delivered with the diagnostic</text>
<text x="595" y="144" class="micro">Prioritised, with owners</text>

          <!-- ================= CASH CYCLE TREND ================= -->
          <rect x="90" y="158" width="224" height="145" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="98" y="173" class="title" font-size="8.05">Cash cycle trend</text>
          <circle cx="219" cy="171.3" r="2" fill="#5b9be8"/><text x="223" y="173.0" class="micro" font-weight="600" fill="#6f8094">Cash cycle (days)</text>
          <circle cx="283" cy="171.3" r="2" fill="#10233f"/><text x="287" y="173.0" class="micro" font-weight="600" fill="#6f8094">Trend</text>
          <line x1="117" y1="268.0" x2="306" y2="268.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="112" y="269.6" text-anchor="end" class="micro">0</text>
          <line x1="117" y1="252.0" x2="306" y2="252.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="112" y="253.6" text-anchor="end" class="micro">30</text>
          <line x1="117" y1="236.0" x2="306" y2="236.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="112" y="237.6" text-anchor="end" class="micro">60</text>
          <line x1="117" y1="220.0" x2="306" y2="220.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="112" y="221.6" text-anchor="end" class="micro">90</text>
          <line x1="117" y1="204.0" x2="306" y2="204.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="112" y="205.6" text-anchor="end" class="micro">120</text>
          <line x1="117" y1="188.0" x2="306" y2="188.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="112" y="189.6" text-anchor="end" class="micro">150</text>
          <text transform="translate(102 232) rotate(-90)" text-anchor="middle" class="micro">Days</text>
          <g class="bar"><rect x="122" y="198.7" width="16" height="69.3" rx="1.6" fill="#5b9be8"/><rect x="153.5" y="201.9" width="16" height="66.1" rx="1.6" fill="#5b9be8"/><rect x="185" y="205.1" width="16" height="62.9" rx="1.6" fill="#5b9be8"/><rect x="216" y="208.3" width="16" height="59.7" rx="1.6" fill="#5b9be8"/><rect x="247.5" y="210.9" width="16" height="57.1" rx="1.6" fill="#5b9be8"/><rect x="279" y="213.6" width="16" height="54.4" rx="1.6" fill="#5b9be8"/></g>
          <line x1="124" y1="198.3" x2="293" y2="214.5" stroke="#10233f" stroke-width=".8" stroke-dasharray="2 1.4"/>
          <text x="130" y="195.7" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">130</text>
          <text x="130" y="278" text-anchor="middle" class="micro">Jan</text>
          <text x="161.5" y="198.9" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">124</text>
          <text x="161.5" y="278" text-anchor="middle" class="micro">Feb</text>
          <text x="193" y="202.1" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">118</text>
          <text x="193" y="278" text-anchor="middle" class="micro">Mar</text>
          <text x="224" y="205.3" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">112</text>
          <text x="224" y="278" text-anchor="middle" class="micro">Apr</text>
          <text x="255.5" y="207.9" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">107</text>
          <text x="255.5" y="278" text-anchor="middle" class="micro">May</text>
          <text x="287" y="210.6" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">102</text>
          <text x="287" y="278" text-anchor="middle" class="micro">Jun</text>
          <!-- ================= WORKING CAPITAL BREAKDOWN ================= -->
          <rect x="322" y="158" width="168" height="145" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="330" y="173" class="title" font-size="8.05">Working capital breakdown</text>
          <rect x="330" y="184.0" width="20" height="20" rx="5" fill="#eaf3ff"/>
          <g fill="none" stroke="#1f6fd0" stroke-width="1.05" stroke-linejoin="round"><path d="M340 189.2l4.2 2.4v4.8l-4.2 2.4-4.2-2.4v-4.8z"/><path d="M335.8 191.6l4.2 2.4 4.2-2.4M340 194.0v4.8"/></g>
          <text x="356" y="191.8" font-size="5.6" font-weight="500" fill="#1b3a57">Inventory</text>
          <text x="356" y="200.6" class="micro" font-size="4.6">51% of gross working capital</text>
          <text x="483" y="197.0" text-anchor="end" class="title" font-size="8.4">₹<tspan class="counter" data-target="9.0" data-decimals="1">9.0</tspan> Cr</text>
          <line x1="330" y1="208.0" x2="483" y2="208.0" stroke="#edf1f4" stroke-width=".7"/>
          <rect x="330" y="212.7" width="20" height="20" rx="5" fill="#e7f7ef"/>
          <g fill="#2e9e6e"><circle cx="337.8" cy="220.7" r="2.1"/><circle cx="342.8" cy="221.29999999999998" r="1.7"/><path d="M334 227.1c0-3 1.8-4.4 3.8-4.4s3.8 1.4 3.8 4.4z"/><path d="M342.2 227.1c0-1.4-.3-2.5-.9-3.3.4-.4 1-.6 1.5-.6 1.7 0 3.2 1.2 3.2 3.9z"/></g>
          <text x="356" y="220.5" font-size="5.6" font-weight="500" fill="#1b3a57">Receivables</text>
          <text x="356" y="229.3" class="micro" font-size="4.6">49% of gross working capital</text>
          <text x="483" y="225.7" text-anchor="end" class="title" font-size="8.4">₹<tspan class="counter" data-target="8.5" data-decimals="1">8.5</tspan> Cr</text>
          <line x1="330" y1="236.7" x2="483" y2="236.7" stroke="#edf1f4" stroke-width=".7"/>
          <rect x="330" y="241.4" width="20" height="20" rx="5" fill="#fff3df"/>
          <g fill="#eaa044"><rect x="335.2" y="248.20000000000002" width="5.8" height="4.8" rx=".6"/><path d="M341.4 249.8h2l1.6 1.8v1.4h-3.6z"/><circle cx="337.2" cy="253.8" r="1.1"/><circle cx="342.6" cy="253.8" r="1.1"/></g>
          <text x="356" y="249.2" font-size="5.6" font-weight="500" fill="#1b3a57">Less: supplier credit</text>
          <text x="356" y="258.0" class="micro" font-size="4.6">Payables</text>
          <text x="483" y="254.4" text-anchor="end" class="title" font-size="8.4">(₹<tspan class="counter" data-target="5.0" data-decimals="1">5.0</tspan> Cr)</text>
          <line x1="330" y1="265.4" x2="483" y2="265.4" stroke="#edf1f4" stroke-width=".7"/>
          <text x="330" y="279" class="title" font-size="7.6">Net working capital</text>
          <text x="483" y="279" text-anchor="end" class="title" font-size="8.4">₹<tspan class="counter" data-target="12.5" data-decimals="1">12.5</tspan> Cr</text>
          <!-- ================= CASH CYCLE BY COMPONENT ================= -->
          <rect x="499" y="158" width="211" height="145" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="507" y="173" class="title" font-size="8.05">Cash cycle by component</text>
          <text x="702" y="173" text-anchor="end" class="micro">days</text>
          <line x1="524" y1="266.0" x2="700" y2="266.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="520" y="267.6" text-anchor="end" class="micro">-60</text>
          <line x1="524" y1="253.0" x2="700" y2="253.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="520" y="254.6" text-anchor="end" class="micro">-30</text>
          <line x1="524" y1="240.0" x2="700" y2="240.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="520" y="241.6" text-anchor="end" class="micro">0</text>
          <line x1="524" y1="227.0" x2="700" y2="227.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="520" y="228.6" text-anchor="end" class="micro">30</text>
          <line x1="524" y1="214.0" x2="700" y2="214.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="520" y="215.6" text-anchor="end" class="micro">60</text>
          <line x1="524" y1="201.0" x2="700" y2="201.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="520" y="202.6" text-anchor="end" class="micro">90</text>
          <line x1="524" y1="188.0" x2="700" y2="188.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="520" y="189.6" text-anchor="end" class="micro">120</text>
          <g class="bar"><rect x="534" y="200.6" width="16" height="39.4" rx="1.6" fill="#1a5fd6"/></g>
          <text x="542" y="197.6" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">91</text>
          <text x="542" y="276" text-anchor="middle" class="micro">Inventory</text>
          <g class="bar"><rect x="569.5" y="213.1" width="16" height="26.9" rx="1.6" fill="#5b9be8"/></g>
          <text x="577.5" y="210.1" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">62</text>
          <text x="577.5" y="276" text-anchor="middle" class="micro">Receivables</text>
          <g class="barN"><rect x="605" y="240" width="16" height="22.1" rx="1.6" fill="#6a3fe0"/></g>
          <text x="613" y="267.7" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">−51</text>
          <text x="613" y="276" text-anchor="middle" class="micro">Payables</text>
          <g class="bar"><rect x="641" y="195.8" width="16" height="44.2" rx="1.6" fill="#1d9e5f"/></g>
          <text x="649" y="192.8" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">102</text>
          <text x="649" y="276" text-anchor="middle" class="micro">Cash cycle</text>
          <!-- ================= DIAGNOSTIC COVERAGE ================= -->
          <rect x="174" y="311" width="168" height="87" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="182" y="325" class="title" font-size="8.05">Diagnostic coverage</text>
          <text x="334" y="325" text-anchor="end" class="micro">4 of 4 complete</text>
          <circle cx="186" cy="340.0" r="3.2" fill="#1d9e5f"/><path d="M184.5 340.0l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="194" y="341.9" font-size="5.4" font-weight="500" fill="#1b3a57">Cash conversion cycle</text>
          <rect x="299" y="335.4" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="316.5" y="341.76" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="186" cy="354.7" r="3.2" fill="#1d9e5f"/><path d="M184.5 354.7l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="194" y="356.6" font-size="5.4" font-weight="500" fill="#1b3a57">Working capital analysis</text>
          <rect x="299" y="350.09999999999997" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="316.5" y="356.46" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="186" cy="369.4" r="3.2" fill="#1d9e5f"/><path d="M184.5 369.4l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="194" y="371.3" font-size="5.4" font-weight="500" fill="#1b3a57">Rupee-value insights</text>
          <rect x="299" y="364.79999999999995" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="316.5" y="371.16" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="186" cy="384.1" r="3.2" fill="#1d9e5f"/><path d="M184.5 384.1l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="194" y="386.0" font-size="5.4" font-weight="500" fill="#1b3a57">Prioritised action plan</text>
          <rect x="299" y="379.5" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="316.5" y="385.86" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <!-- ================= KEY INSIGHTS ================= -->
          <rect x="351" y="311" width="280" height="87" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="358" y="325" class="title" font-size="8.05">Key insights</text>
          <rect x="359" y="333" width="84" height="56" rx="6" fill="#f3f7fc"/>
          <circle cx="366.5" cy="343" r="2.4" fill="#1f6fd0"/>
          <text x="374" y="345" font-size="5.5" font-weight="700" fill="#173957">Cash cycle is 102</text>
          <text x="374" y="353.8" font-size="5.5" font-weight="700" fill="#173957">days</text>
          <text x="374" y="363.0" class="micro" font-size="4.7">₹12.5 Cr is tied up in</text>
          <text x="374" y="371.0" class="micro" font-size="4.7">net working capital.</text>
          <rect x="449" y="333" width="84" height="56" rx="6" fill="#f3f7fc"/>
          <circle cx="456.5" cy="343" r="2.4" fill="#f08c1a"/>
          <text x="464" y="345" font-size="5.5" font-weight="700" fill="#173957">₹4.85 Cr can be</text>
          <text x="464" y="353.8" font-size="5.5" font-weight="700" fill="#173957">released</text>
          <text x="464" y="363.0" class="micro" font-size="4.7">Inventory ₹1.80 Cr,</text>
          <text x="464" y="371.0" class="micro" font-size="4.7">collections ₹2.06 Cr,</text>
          <text x="464" y="379.0" class="micro" font-size="4.7">suppliers ₹0.99 Cr.</text>
          <rect x="539" y="333" width="84" height="56" rx="6" fill="#f3f7fc"/>
          <circle cx="546.5" cy="343" r="2.4" fill="#1d9e5f"/>
          <text x="554" y="345" font-size="5.5" font-weight="700" fill="#173957">Action plan in 4</text>
          <text x="554" y="353.8" font-size="5.5" font-weight="700" fill="#173957">weeks</text>
          <text x="554" y="363.0" class="micro" font-size="4.7">Prioritised steps with</text>
          <text x="554" y="371.0" class="micro" font-size="4.7">clear owners.</text>
        </g>

        <!-- ================= FLOATING CARDS — OUTSIDE CLIP ON PURPOSE ================= -->
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="622" y="12" width="164" height="66" rx="11" fill="#f2fbf6"/>
        <circle cx="645" cy="35" r="12.5" fill="#dff3e8"/>
        <circle cx="645" cy="35" r="5" fill="none" stroke="#1d9e5f" stroke-width="1.1"/><circle cx="645" cy="35" r="2.7" fill="none" stroke="#1d9e5f" stroke-width="1.1"/><circle cx="645" cy="35" r=".9" fill="#1d9e5f"/>
        <text x="665" y="28" font-size="6.2" font-weight="700" fill="#173957">Potential to free cash</text>
        <text x="665" y="46" font-size="16" font-weight="800" fill="#1d9e5f">₹<tspan class="counter" data-target="4.85" data-decimals="2">4.85</tspan> Cr</text>
        <text x="665" y="57" font-size="5.1" fill="#4d6275">estimated from the three working-</text>
        <text x="665" y="66" font-size="5.1" fill="#4d6275">capital levers.</text>
        </g>
        <g class="floatB" filter="url(#smallShadow)">
        <rect x="12" y="370" width="150" height="57" rx="11" fill="#f1f6fe"/>
        <circle cx="35" cy="393" r="12.5" fill="#e1ecfb"/>
        <circle cx="35" cy="393" r="4.6" fill="none" stroke="#1f6fd0" stroke-width="1.2"/><path d="M35 390.6V393l1.8 1.3" fill="none" stroke="#1f6fd0" stroke-width="1.1" stroke-linecap="round"/>
        <text x="55" y="386" font-size="6.2" font-weight="700" fill="#173957">Cash cycle</text>
        <text x="55" y="404.5" font-size="17" font-weight="800" fill="#1f6fd0"><tspan class="counter" data-target="102" data-decimals="0">102</tspan> days</text>
        <text x="55" y="415" font-size="5.1" fill="#4d6275">▼ 16 days vs Mar 2026.</text>
        </g>
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="643" y="352" width="145" height="75" rx="11" fill="#fff8ec"/>
        <circle cx="666" cy="374" r="12.5" fill="#fdeccf"/>
        <path d="M666 368.2a3.9 3.9 0 0 0-2.3 7.1v1.6h4.6v-1.6a3.9 3.9 0 0 0-2.3-7.1zM664.3 378.1h3.4v1.2h-3.4z" fill="#e68a1a"/>
        <text x="686" y="367" font-size="6.2" font-weight="700" fill="#173957">CFO CRAFT advisor</text>
        <text x="686" y="386" font-size="16" font-weight="800" fill="#10233f"><tspan class="counter" data-target="59" data-decimals="0">59</tspan> days</text>
        <text x="686" y="397" font-size="5.1" fill="#4d6275">achievable cash cycle, from</text>
        <text x="686" y="406" font-size="5.1" fill="#4d6275">102 days today, releasing</text>
        <text x="686" y="415" font-size="5.1" fill="#4d6275">₹4.85 Cr.</text>
        </g>

      </svg>
    </div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        // Line charts: <g class="lineChart"> holding one polyline + its dots.
        // The line draws left to right; each dot appears as the line reaches it.
        const lines = Array.from(document.querySelectorAll(".lineChart")).map((g) => {
          const pl = g.querySelector("polyline");
          const xs = pl.getAttribute("points").trim().split(/\s+/).map((pt) => num(pt.split(",")[0], 0));
          const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
          const L = pl.getTotalLength ? pl.getTotalLength() : 1000;
          pl.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          const dots = Array.from(g.querySelectorAll("circle")).map((c) => ({
            c, at: x1 > x0 ? (num(c.getAttribute("cx"), 0) - x0) / (x1 - x0) : 0
          }));
          return { pl, L, dots };
        });

        // KPI sparklines: <g class="sparkChart"> with an area path, a line path and an end dot.
        // Line draws left to right, area fills behind it, dot lands at the end.
        const sparks = Array.from(document.querySelectorAll(".sparkChart")).map((g, i) => {
          const paths = Array.from(g.querySelectorAll("path"));
          const line = paths.find((p) => p.getAttribute("fill") === "none");
          const area = paths.find((p) => p !== line);
          const dot = g.querySelector("circle");
          const L = line.getTotalLength();
          line.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          let clip = null, bb = null;
          if (area) {
            bb = area.getBBox();
            const ns = "http://www.w3.org/2000/svg";
            const cp = document.createElementNS(ns, "clipPath");
            cp.setAttribute("id", "sparkClip" + i);
            clip = document.createElementNS(ns, "rect");
            clip.setAttribute("x", bb.x); clip.setAttribute("y", bb.y - 2);
            clip.setAttribute("height", bb.height + 4); clip.setAttribute("width", 0);
            cp.appendChild(clip); g.appendChild(cp);
            area.setAttribute("clip-path", "url(#sparkClip" + i + ")");
          }
          return { line, L, clip, bb, dot };
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          sparks.forEach((sp) => {
            sp.line.setAttribute("stroke-dashoffset", (sp.L * (1 - p)).toFixed(2));
            if (sp.clip) sp.clip.setAttribute("width", (sp.bb.width * p).toFixed(2));
            if (sp.dot) sp.dot.style.opacity = Math.max(0, Math.min(1, (p - 0.94) / 0.06)).toFixed(2);
          });
          lines.forEach((ln) => {
            ln.pl.setAttribute("stroke-dashoffset", (ln.L * (1 - p)).toFixed(2));
            ln.dots.forEach((d) => {
              d.c.style.opacity = Math.max(0, Math.min(1, (p - d.at) / 0.06 + 1)).toFixed(2);
            });
          });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body>
</html>
`,
  cashflow: String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>CFO CRAFT — Monthly Cash Flow Model</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body { font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .stage { width: 800px; max-width: 100vw; margin: 0 auto; }
      svg { display: block; width: 100%; height: auto; overflow: hidden; }
      text { text-rendering: geometricPrecision; font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .title { font-weight: 700; fill: #10233f; }
      .semi { font-weight: 700; fill: #183a58; }
      .muted { font-weight: 500; fill: #5f7285; }
      .lab { fill: #1b3a57; }
      .micro { font-size: 4.8px; font-weight: 400; fill: #7a8896; }
      .tiny { font-size: 4.35px; font-weight: 400; fill: #7a8896; }
      .th text { font-size: 5.1px; font-weight: 500; fill: #5f7285; }
      .td text { font-size: 5.4px; font-weight: 500; fill: #1b3a57; }
      .counter { font-variant-numeric: tabular-nums; }
      .bar { transform-box: fill-box; transform-origin: bottom; }
      .barN { transform-box: fill-box; transform-origin: top; }
      @media (prefers-reduced-motion: reduce) {
        .bar, .barN, .spark, .floatA, .floatB { animation: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-label="CFO CRAFT monthly cash flow model section">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#073f91" />
            <stop offset=".50" stop-color="#063778" />
            <stop offset="1" stop-color="#082e65" />
          </linearGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="1" stop-color="#f9fbfd" />
          </linearGradient>
          <radialGradient id="orb" cx=".35" cy=".3" r=".8">
            <stop offset="0" stop-color="#2f78d8" stop-opacity=".75" />
            <stop offset="1" stop-color="#0a3f8f" stop-opacity=".15" />
          </radialGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#7fb4ff" stop-opacity=".7" />
            <stop offset=".6" stop-color="#e3b25a" stop-opacity=".85" />
            <stop offset="1" stop-color="#e3b25a" stop-opacity="0" />
          </linearGradient>
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#8fbaf0" fill-opacity=".45" />
          </pattern>
          <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#8fbaf0" stroke-opacity=".12" stroke-width=".7" />
          </pattern>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#03265c" flood-opacity=".26" />
          </filter>
          <filter id="smallShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0a315b" flood-opacity=".18" />
          </filter>
          <clipPath id="dashboardClip">
            <rect x="76" y="42" width="650" height="370" rx="14" />
          </clipPath>
        </defs>

        <!-- ===================== BACKGROUND ===================== -->
        <rect width="800" height="450" rx="23" fill="url(#bg)" />
        <path d="M530 -10C560 60 650 75 800 70" fill="none" stroke="#9cc3ee" stroke-opacity=".3" />
        <line x1="680" y1="0" x2="680" y2="80" stroke="#9cc3ee" stroke-opacity=".2" />
        <g stroke="#9cc3ee" stroke-opacity=".22"><path d="M0 80L80 0" /><path d="M0 240L50 200" /><path d="M110 460L230 360" /><path d="M700 450L800 370" /><path d="M740 190L800 140" /></g>
        <path d="M520 450C560 360 600 372 800 372" fill="none" stroke="#9cc3ee" stroke-opacity=".2" />
        <rect x="728" y="22" width="54" height="34" fill="url(#dots)" />
        <rect x="10" y="408" width="76" height="30" fill="url(#dots)" />
        <rect x="30" y="44" width="440" height="370" rx="16" fill="#0d4aa6" fill-opacity=".35" stroke="#7fb4ff" stroke-opacity=".35" />
        <rect x="52" y="63" width="384" height="333" rx="10" fill="url(#paper)" filter="url(#shadow)" />
        <rect x="66" y="77" width="29" height="29" rx="6" fill="#eaf3ff" />
        <g transform="translate(80.5 91.5) scale(1.45) translate(-80.5 -91.5)"><g fill="#1f6fd0"><rect x="76.1" y="91.9" width="2.3" height="3.6" rx=".5"/><rect x="79.35" y="89.6" width="2.3" height="5.9" rx=".5"/><rect x="82.6" y="87.1" width="2.3" height="8.4" rx=".5"/></g></g>
        <text x="103" y="96" class="title" font-size="12.6">Monthly Cash Flow Model</text>
        <text x="65" y="122" font-size="6" font-weight="700" fill="#1f6fd0">Cash receipts</text>
        <text x="132" y="122" font-size="6" font-weight="500" fill="#6f8094">Cash payments</text>
        <text x="204" y="122" font-size="6" font-weight="500" fill="#6f8094">Net position</text>
        <line x1="65" y1="130.5" x2="322" y2="130.5" stroke="#e7edf2" stroke-width=".7"/>
        <rect x="65" y="129.5" width="52" height="1.6" rx=".8" fill="#1f6fd0"/>
        <rect x="65" y="138" width="250" height="14" rx="2" fill="#f2f6fb"/>
        <g class="th"><text x="68" y="147">Category</text><text x="212" y="147" text-anchor="end">Apr</text><text x="262" y="147" text-anchor="end">May</text><text x="312" y="147" text-anchor="end">Jun</text></g>
        <g class="td"><text x="68" y="162.0" style="fill:#1f6fd0">Debtor collections</text><text x="212" y="162.0" text-anchor="end">₹4.05 Cr</text><text x="262" y="162.0" text-anchor="end">₹4.10 Cr</text><text x="312" y="162.0" text-anchor="end">₹4.39 Cr</text></g>
        <line x1="65" y1="168.0" x2="315" y2="168.0" stroke="#edf1f4" stroke-width=".7"/>
        <g class="td"><text x="68" y="177.5" >Other receipts</text><text x="212" y="177.5" text-anchor="end">₹0.10 Cr</text><text x="262" y="177.5" text-anchor="end">₹0.08 Cr</text><text x="312" y="177.5" text-anchor="end">₹0.12 Cr</text></g>
        <line x1="65" y1="183.5" x2="315" y2="183.5" stroke="#edf1f4" stroke-width=".7"/>
        <rect x="65" y="184" width="250" height="14" rx="2" fill="#f2f6fb"/>
        <g font-size="5.5" font-weight="700" fill="#173957"><text x="68" y="193">Total receipts</text><text x="212" y="193" text-anchor="end">₹4.15 Cr</text><text x="262" y="193" text-anchor="end">₹4.18 Cr</text><text x="312" y="193" text-anchor="end">₹4.51 Cr</text></g>
        <rect x="65" y="207" width="357" height="141" rx="7" fill="#fff" stroke="#e7edf2"/>
        <text x="74" y="222" class="title" font-size="7.2">Cash inflow vs outflow</text>
        <circle cx="171" cy="220.2" r="2" fill="#1d9e5f"/><text x="175" y="221.89999999999998" class="micro" font-weight="600" fill="#5f7285">Inflow</text>
        <circle cx="201" cy="220.2" r="2" fill="#1f6fd0"/><text x="205" y="221.89999999999998" class="micro" font-weight="600" fill="#5f7285">Outflow</text>
        <line x1="97" y1="326.0" x2="388" y2="326.0" stroke="#eef1f4" stroke-width=".7"/>
        <text x="93" y="327.6" text-anchor="end" class="micro">0</text>
        <line x1="97" y1="313.4" x2="388" y2="313.4" stroke="#eef1f4" stroke-width=".7"/>
        <text x="93" y="315.0" text-anchor="end" class="micro">1</text>
        <line x1="97" y1="300.8" x2="388" y2="300.8" stroke="#eef1f4" stroke-width=".7"/>
        <text x="93" y="302.4" text-anchor="end" class="micro">2</text>
        <line x1="97" y1="288.2" x2="388" y2="288.2" stroke="#eef1f4" stroke-width=".7"/>
        <text x="93" y="289.8" text-anchor="end" class="micro">3</text>
        <line x1="97" y1="275.6" x2="388" y2="275.6" stroke="#eef1f4" stroke-width=".7"/>
        <text x="93" y="277.2" text-anchor="end" class="micro">4</text>
        <line x1="97" y1="263.0" x2="388" y2="263.0" stroke="#eef1f4" stroke-width=".7"/>
        <text x="93" y="264.6" text-anchor="end" class="micro">5</text>
        <line x1="97" y1="250.4" x2="388" y2="250.4" stroke="#eef1f4" stroke-width=".7"/>
        <text x="93" y="252.0" text-anchor="end" class="micro">6</text>
        <line x1="97" y1="237.8" x2="388" y2="237.8" stroke="#eef1f4" stroke-width=".7"/>
        <text x="93" y="239.4" text-anchor="end" class="micro">7</text>
        <text transform="translate(78 282) rotate(-90)" text-anchor="middle" class="micro">Amount (₹ Cr)</text>
        <g class="bar">
        <rect x="103.8" y="279.1" width="14.4" height="46.9" rx="1.6" fill="#1d9e5f"/>
        <rect x="121.4" y="280.9" width="14.4" height="45.1" rx="1.6" fill="#1f6fd0"/>
        <rect x="152.6" y="277.9" width="14.4" height="48.1" rx="1.6" fill="#1d9e5f"/>
        <rect x="170.2" y="280.0" width="14.4" height="46.0" rx="1.6" fill="#1f6fd0"/>
        <rect x="201.4" y="274.1" width="14.4" height="51.9" rx="1.6" fill="#1d9e5f"/>
        <rect x="219.0" y="275.9" width="14.4" height="50.1" rx="1.6" fill="#1f6fd0"/>
        <rect x="250.2" y="273.7" width="14.4" height="52.3" rx="1.6" fill="#1d9e5f"/>
        <rect x="267.8" y="274.3" width="14.4" height="51.7" rx="1.6" fill="#1f6fd0"/>
        <rect x="299.0" y="273.3" width="14.4" height="52.7" rx="1.6" fill="#1d9e5f"/>
        <rect x="316.6" y="274.1" width="14.4" height="51.9" rx="1.6" fill="#1f6fd0"/>
        <rect x="347.8" y="269.2" width="14.4" height="56.8" rx="1.6" fill="#1d9e5f"/>
        <rect x="365.4" y="271.1" width="14.4" height="54.9" rx="1.6" fill="#1f6fd0"/>
        </g>
        <text x="120.0" y="335" text-anchor="middle" class="micro" font-size="5">Jan</text>
        <text x="168.8" y="335" text-anchor="middle" class="micro" font-size="5">Feb</text>
        <text x="217.6" y="335" text-anchor="middle" class="micro" font-size="5">Mar</text>
        <text x="266.4" y="335" text-anchor="middle" class="micro" font-size="5">Apr</text>
        <text x="315.2" y="335" text-anchor="middle" class="micro" font-size="5">May</text>
        <text x="364.0" y="335" text-anchor="middle" class="micro" font-size="5">Jun</text>
        <g filter="url(#smallShadow)"><rect x="317" y="230" width="44" height="33" rx="4" fill="#fff"/></g>
        <text x="323" y="238.5" font-size="5.3" font-weight="700" fill="#173957">Jun</text>
        <circle cx="324.5" cy="245.6" r="1.8" fill="#1d9e5f"/><text x="329" y="247.4" font-size="5.2" font-weight="500" fill="#1b3a57">₹4.51 Cr</text>
        <circle cx="324.5" cy="254.6" r="1.8" fill="#1f6fd0"/><text x="329" y="256.4" font-size="5.2" font-weight="500" fill="#1b3a57">₹4.36 Cr</text>
        <text x="65" y="358" class="micro" font-size="4.6">Illustrative dashboard with sample data, not client results. Figures exclude GST.</text>
        <g class="floatA" filter="url(#smallShadow)"><rect x="331" y="69" width="115" height="38" rx="8" fill="#0c3f95"/><circle cx="352" cy="88" r="12" fill="#fff"/><g fill="none" stroke="#1f6fd0" stroke-width="1.05" stroke-linejoin="round"><path d="M352 83.2l4.2 2.4v4.8l-4.2 2.4-4.2-2.4v-4.8z"/><path d="M347.8 85.6l4.2 2.4 4.2-2.4M352 88v4.8"/></g><text x="372" y="81" font-size="5.6" font-weight="700" fill="#ffffff">Inventory days</text><text x="372" y="98" font-size="13" font-weight="800" fill="#ffffff"><tspan class="counter" data-target="91" data-decimals="0">91</tspan></text></g>
        <g class="floatA" filter="url(#smallShadow)"><rect x="331" y="112" width="115" height="38" rx="8" fill="#fbe2bd"/><circle cx="352" cy="131" r="12" fill="#fff"/><rect x="347" y="127.4" width="10" height="7.2" rx="1.6" fill="#e68a1a"/><rect x="352.6" y="129.7" width="4.4" height="2.6" rx="1" fill="#fff"/><text x="372" y="124" font-size="5.6" font-weight="700" fill="#6b3d06">Collection days</text><text x="372" y="141" font-size="13" font-weight="800" fill="#4a2a05"><tspan class="counter" data-target="62" data-decimals="0">62</tspan></text></g>
        <g class="floatA" filter="url(#smallShadow)"><rect x="331" y="155" width="115" height="38" rx="8" fill="#dce9fb"/><circle cx="352" cy="174" r="12" fill="#fff"/><rect x="347" y="170.4" width="10" height="7.2" rx="1.6" fill="#1f6fd0"/><rect x="352.6" y="172.7" width="4.4" height="2.6" rx="1" fill="#fff"/><text x="372" y="167" font-size="5.6" font-weight="700" fill="#10233f">Payable days</text><text x="372" y="184" font-size="13" font-weight="800" fill="#10233f"><tspan class="counter" data-target="51" data-decimals="0">51</tspan></text></g>
        <text x="486" y="84" font-size="6.8" font-weight="700" fill="#8fc0f5">Monthly cash flow model</text>
        <text x="486" y="117" font-size="22.5" font-weight="700" fill="#ffffff">See your cash future,</text>
        <text x="486" y="146" font-size="22.5" font-weight="700" fill="#ffffff">month by month</text>
        <text x="486" y="171" font-size="6.9" font-weight="400" fill="#d2def0">Our 13-week and monthly cash flow models show where your</text>
        <text x="486" y="185.5" font-size="6.9" font-weight="400" fill="#d2def0">cash is going, and when a crunch is coming.</text>
        <rect x="486" y="200" width="295" height="145" rx="8" fill="#ffffff" fill-opacity=".05" stroke="#9cc3ee" stroke-opacity=".28" stroke-width=".7"/>
        <rect x="498" y="213" width="20" height="20" rx="4" fill="#1f9d55"/>
        <g fill="#ffffff"><rect x="503.6" y="223.4" width="2.3" height="3.6" rx=".5"/><rect x="506.85" y="221.1" width="2.3" height="5.9" rx=".5"/><rect x="510.1" y="218.6" width="2.3" height="8.4" rx=".5"/></g>
        <text x="525" y="219.2" font-size="6.5" font-weight="400" fill="#e8eef8">Receipts and payments forecasting with seasonal</text>
        <text x="525" y="232.2" font-size="6.5" font-weight="400" fill="#e8eef8">adjustments</text>
        <rect x="498" y="247" width="20" height="20" rx="4" fill="#f08c1a"/>
        <circle cx="508" cy="257" r="4.6" fill="none" stroke="#ffffff" stroke-width="1.2"/><path d="M508 254.6V257l1.8 1.3" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round"/>
        <text x="525" y="259.4" font-size="6.5" font-weight="400" fill="#e8eef8">Collection efficiency tracking and DSO trends</text>
        <rect x="498" y="281" width="20" height="20" rx="4" fill="#7b4fe0"/>
        <g stroke="#ffffff" stroke-width="1.1" stroke-linecap="round"><path d="M510.20 291.00L512.80 291.00"/><path d="M509.56 292.56L511.39 294.39"/><path d="M508.00 293.20L508.00 295.80"/><path d="M506.44 292.56L504.61 294.39"/><path d="M505.80 291.00L503.20 291.00"/><path d="M506.44 289.44L504.61 287.61"/><path d="M508.00 288.80L508.00 286.20"/><path d="M509.56 289.44L511.39 287.61"/></g><circle cx="508" cy="291" r="1.6" fill="#ffffff"/>
        <text x="525" y="287.2" font-size="6.5" font-weight="400" fill="#e8eef8">Overdraft drawdown planning and interest cost</text>
        <text x="525" y="300.2" font-size="6.5" font-weight="400" fill="#e8eef8">optimisation</text>
        <rect x="498" y="315" width="20" height="20" rx="4" fill="#1f6fd0"/>
        <path d="M504.6 320.4h4.4l2.4 2.4v6.8h-6.8z" fill="#fff"/>
        <text x="525" y="327.4" font-size="6.5" font-weight="400" fill="#e8eef8">Monthly MIS dashboards, refreshed on each close</text>
        <a href="#" aria-label="Learn more about the monthly cash flow model"><rect x="486" y="358" width="81" height="28" rx="5" fill="#ffffff"/><text x="526.5" y="375" text-anchor="middle" font-size="7" font-weight="700" fill="#10233f">Learn more</text></a>


      </svg>
    </div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body>
</html>
`,
  "working-capital": String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>CFO CRAFT — Working Capital Optimisation Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body { font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .stage { width: 800px; max-width: 100vw; margin: 0 auto; }
      svg { display: block; width: 100%; height: auto; overflow: hidden; }
      text { text-rendering: geometricPrecision; font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .title { font-weight: 700; fill: #10233f; }
      .semi { font-weight: 700; fill: #183a58; }
      .muted { font-weight: 500; fill: #5f7285; }
      .lab { fill: #1b3a57; }
      .micro { font-size: 4.8px; font-weight: 400; fill: #7a8896; }
      .tiny { font-size: 4.35px; font-weight: 400; fill: #7a8896; }
      .th text { font-size: 5.1px; font-weight: 500; fill: #5f7285; }
      .td text { font-size: 5.4px; font-weight: 500; fill: #1b3a57; }
      .counter { font-variant-numeric: tabular-nums; }
      .bar { transform-box: fill-box; transform-origin: bottom; }
      .barN { transform-box: fill-box; transform-origin: top; }
      @media (prefers-reduced-motion: reduce) {
        .bar, .barN, .spark, .floatA, .floatB { animation: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-label="CFO CRAFT working capital optimisation dashboard">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#073f91" />
            <stop offset=".50" stop-color="#063778" />
            <stop offset="1" stop-color="#082e65" />
          </linearGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="1" stop-color="#f9fbfd" />
          </linearGradient>
          <radialGradient id="orb" cx=".35" cy=".3" r=".8">
            <stop offset="0" stop-color="#2f78d8" stop-opacity=".75" />
            <stop offset="1" stop-color="#0a3f8f" stop-opacity=".15" />
          </radialGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#7fb4ff" stop-opacity=".7" />
            <stop offset=".6" stop-color="#e3b25a" stop-opacity=".85" />
            <stop offset="1" stop-color="#e3b25a" stop-opacity="0" />
          </linearGradient>
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#8fbaf0" fill-opacity=".45" />
          </pattern>
          <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#8fbaf0" stroke-opacity=".12" stroke-width=".7" />
          </pattern>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#03265c" flood-opacity=".26" />
          </filter>
          <filter id="smallShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0a315b" flood-opacity=".18" />
          </filter>
          <clipPath id="dashboardClip">
            <rect x="76" y="42" width="650" height="370" rx="14" />
          </clipPath>
        </defs>

        <!-- ===================== BACKGROUND ===================== -->
        <rect width="800" height="450" rx="23" fill="url(#bg)" />
        <circle cx="40" cy="60" r="45" fill="url(#orb)" opacity=".85" />
        <circle cx="25" cy="80" r="72" fill="none" stroke="#7fb4ff" stroke-opacity=".3" />
        <circle cx="30" cy="330" r="55" fill="url(#orb)" opacity=".6" />
        <circle cx="30" cy="330" r="60" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />
        <path d="M760 150C800 190 810 300 740 360" fill="none" stroke="#7fb4ff" stroke-opacity=".45" />
        <circle cx="800" cy="330" r="70" fill="url(#orb)" opacity=".45" />
        <rect x="10" y="185" width="32" height="36" fill="url(#dots)" />
        <rect x="388" y="4" width="36" height="22" fill="url(#dots)" />
        <rect x="758" y="258" width="30" height="36" fill="url(#dots)" />
        <rect x="64" y="28" width="674" height="394" rx="18" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />

        <!-- ===================== MAIN DASHBOARD ===================== -->
        <rect x="76" y="42" width="650" height="370" rx="14" fill="url(#paper)" filter="url(#shadow)" />

        <g clip-path="url(#dashboardClip)">
          <!-- HEADER -->
          <rect x="89" y="52" width="29" height="29" rx="6" fill="#eaf3ff" />
          <g transform="translate(103.5 66.5) scale(1.45) translate(-103.5 -66.5)"><g fill="#1f6fd0"><ellipse cx="103.5" cy="62.9" rx="4.4" ry="1.7"/><path d="M99.1 64.1c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/><path d="M99.1 67.7c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/></g></g>
          <text x="126" y="66" class="title" font-size="14.4">Working Capital Optimisation</text>
          <text x="126" y="77.5" class="muted" font-size="6.4">Unlock the cash trapped in your business</text>

          <rect x="497" y="48" width="107" height="20" rx="5" fill="#fff" stroke="#e7edf2" />
          <text x="504" y="60"  font-size="5.55" font-weight="600" fill="#33495d">Q1 FY27 (Apr–Jun 2026)</text>
          <path d="M594 57.5l1.8 1.8 1.8-1.8" fill="none" stroke="#83909d" stroke-width=".8" />
          <rect x="428" y="72" width="176" height="15" rx="4" fill="#f1f5fb" />
          <text x="516" y="81.5" text-anchor="middle" class="tiny">Illustrative dashboard with sample data, not client results</text>

          <!-- ================= KPI ROW ================= -->
          <rect x="91" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="97" y="99" width="23" height="23" rx="6" fill="#eaf3ff"/>
<g fill="none" stroke="#1f6fd0" stroke-width="1.05" stroke-linejoin="round"><path d="M108.5 105.7l4.2 2.4v4.8l-4.2 2.4-4.2-2.4v-4.8z"/><path d="M104.3 108.1l4.2 2.4 4.2-2.4M108.5 110.5v4.8"/></g>
<text x="127" y="107" class="muted lab" font-size="6.05">Inventory days (DIO)</text>
<text x="127" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="91" data-decimals="0">91</tspan> days</text>
<path d="M127 132.2h4.2l-2.1 3.4z" fill="#299d73"/>
<text x="133" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">4 days vs Mar</text>
<text x="127" y="144" class="micro">Mar 2026: 95 days</text>
<g class="sparkChart"><path d="M198 124C207.3 125 210.4 129.0 213.5 130.5S222.8 136 229 137V138.5H198z" fill="#e3f5ec"/><path d="M198 124C207.3 125 210.4 129.0 213.5 130.5S222.8 136 229 137" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="229" cy="137" r="1.6" fill="#2f9e6c"/></g>
          <rect x="247" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="253" y="99" width="23" height="23" rx="6" fill="#fff3df"/>
<path d="M261.1 105.9h4.4l2.4 2.4v6.8h-6.8z" fill="#eaa044"/><path d="M262.7 110.5h3.6M262.7 112.3h3.6" stroke="#fff" stroke-width=".6"/>
<text x="283" y="107" class="muted lab" font-size="6.05">Collection days (DSO)</text>
<text x="283" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="62" data-decimals="0">62</tspan> days</text>
<path d="M283 132.2h4.2l-2.1 3.4z" fill="#299d73"/>
<text x="289" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">8 days vs Mar</text>
<text x="283" y="144" class="micro">Mar 2026: 70 days</text>
<g class="sparkChart"><path d="M354 124C363.3 125 366.4 129.0 369.5 130.5S378.8 136 385 137V138.5H354z" fill="#e3f5ec"/><path d="M354 124C363.3 125 366.4 129.0 369.5 130.5S378.8 136 385 137" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="385" cy="137" r="1.6" fill="#2f9e6c"/></g>
          <rect x="403" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="409" y="99" width="23" height="23" rx="6" fill="#f1ecfe"/>
<g fill="#7a4fe0"><rect x="415.7" y="107.3" width="5.8" height="4.8" rx=".6"/><path d="M421.9 108.9h2l1.6 1.8v1.4h-3.6z"/><circle cx="417.7" cy="112.9" r="1.1"/><circle cx="423.1" cy="112.9" r="1.1"/></g>
<text x="439" y="107" class="muted lab" font-size="6.05">Payable days (DPO)</text>
<text x="439" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="51" data-decimals="0">51</tspan> days</text>
<path d="M439 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
<text x="445" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">4 days vs Mar</text>
<text x="439" y="144" class="micro">Mar 2026: 47 days</text>
<g class="sparkChart"><path d="M510 134C515 134 518 137 522 136S529 128 534 127S540 124 541 123V139H510z" fill="#e3f5ec"/><path d="M510 134C515 134 518 137 522 136S529 128 534 127S540 124 541 123" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="541" cy="123" r="1.6" fill="#2f9e6c"/></g>
          <rect x="559" y="93" width="153" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="565" y="99" width="23" height="23" rx="6" fill="#e7f7ef"/>
<text x="576.5" y="113.9" text-anchor="middle" font-size="9.6" font-weight="600" fill="#2e9e6e">₹</text>
<text x="595" y="107" class="muted lab" font-size="6.05">Net working capital</text>
<text x="595" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="12.5" data-decimals="1">12.5</tspan> Cr</text>
<path d="M595 132.2h4.2l-2.1 3.4z" fill="#299d73"/>
<text x="601" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">2.7% vs Mar</text>
<text x="595" y="144" class="micro">Mar 2026: ₹12.85 Cr</text>
<g class="sparkChart"><path d="M670 125C679.3 126 682.4 129.5 685.5 131.0S694.8 136 701 137V138.5H670z" fill="#e3f5ec"/><path d="M670 125C679.3 126 682.4 129.5 685.5 131.0S694.8 136 701 137" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="701" cy="137" r="1.6" fill="#2f9e6c"/></g>
          <!-- ================= CASH CYCLE BREAKDOWN ================= -->
          <rect x="90" y="157" width="234" height="143" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="98" y="172" class="title" font-size="8.05">Cash cycle breakdown</text>
          <text x="316" y="172" text-anchor="end" class="micro">month-end days</text>
          <circle cx="99" cy="183" r="2" fill="#1f5fd6"/><text x="103" y="184.7" class="micro" fill="#6f8094">DIO</text>
          <circle cx="120" cy="183" r="2" fill="#f59a3c"/><text x="124" y="184.7" class="micro" fill="#6f8094">DSO</text>
          <circle cx="145" cy="183" r="2" fill="#7048e0"/><text x="149" y="184.7" class="micro" fill="#6f8094">DPO (reduces cycle)</text>
          <circle cx="212" cy="183" r="2" fill="#1d9e5f"/><text x="216" y="184.7" class="micro" fill="#6f8094">Cash cycle</text>
          <line x1="116" y1="280.6" x2="316" y2="280.6" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="282.2" text-anchor="end" class="micro">-60</text>
          <line x1="116" y1="269.8" x2="316" y2="269.8" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="271.4" text-anchor="end" class="micro">-30</text>
          <line x1="116" y1="259.0" x2="316" y2="259.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="260.6" text-anchor="end" class="micro">0</text>
          <line x1="116" y1="248.2" x2="316" y2="248.2" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="249.8" text-anchor="end" class="micro">30</text>
          <line x1="116" y1="237.4" x2="316" y2="237.4" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="239.0" text-anchor="end" class="micro">60</text>
          <line x1="116" y1="226.6" x2="316" y2="226.6" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="228.2" text-anchor="end" class="micro">90</text>
          <line x1="116" y1="215.8" x2="316" y2="215.8" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="217.4" text-anchor="end" class="micro">120</text>
          <line x1="116" y1="205.0" x2="316" y2="205.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="206.6" text-anchor="end" class="micro">150</text>
          <line x1="116" y1="194.2" x2="316" y2="194.2" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="195.8" text-anchor="end" class="micro">180</text>
          <text transform="translate(101 232) rotate(-90)" text-anchor="middle" class="micro">Days</text>
          <g class="bar"><rect x="123" y="223.7" width="16" height="35.3" fill="#1f5fd6"/><path d="M123 223.7V198.3q0-1.6 1.6-1.6h12.8q1.6 0 1.6 1.6V223.7z" fill="#f59a3c"/></g>
          <g class="barN"><path d="M123 259V272.9q0 1.6 1.6 1.6h12.8q1.6 0 1.6-1.6V259z" fill="#7048e0"/></g>
          <g class="bar"><rect x="155.4" y="224.1" width="16" height="34.9" fill="#1f5fd6"/><path d="M155.4 224.1V199.8q0-1.6 1.6-1.6h12.8q1.6 0 1.6 1.6V224.1z" fill="#f59a3c"/></g>
          <g class="barN"><path d="M155.4 259V273.6q0 1.6 1.6 1.6h12.8q1.6 0 1.6-1.6V259z" fill="#7048e0"/></g>
          <g class="bar"><rect x="187.8" y="224.8" width="16" height="34.2" fill="#1f5fd6"/><path d="M187.8 224.8V201.2q0-1.6 1.6-1.6h12.8q1.6 0 1.6 1.6V224.8z" fill="#f59a3c"/></g>
          <g class="barN"><path d="M187.8 259V274.3q0 1.6 1.6 1.6h12.8q1.6 0 1.6-1.6V259z" fill="#7048e0"/></g>
          <g class="bar"><rect x="220.2" y="225.2" width="16" height="33.8" fill="#1f5fd6"/><path d="M220.2 225.2V202.6q0-1.6 1.6-1.6h12.8q1.6 0 1.6 1.6V225.2z" fill="#f59a3c"/></g>
          <g class="barN"><path d="M220.2 259V275.0q0 1.6 1.6 1.6h12.8q1.6 0 1.6-1.6V259z" fill="#7048e0"/></g>
          <g class="bar"><rect x="252.60000000000002" y="225.9" width="16" height="33.1" fill="#1f5fd6"/><path d="M252.60000000000002 225.9V204.4q0-1.6 1.6-1.6h12.8q1.6 0 1.6 1.6V225.9z" fill="#f59a3c"/></g>
          <g class="barN"><path d="M252.60000000000002 259V275.0q0 1.6 1.6 1.6h12.8q1.6 0 1.6-1.6V259z" fill="#7048e0"/></g>
          <g class="bar"><rect x="285" y="226.2" width="16" height="32.8" fill="#1f5fd6"/><path d="M285 226.2V205.5q0-1.6 1.6-1.6h12.8q1.6 0 1.6 1.6V226.2z" fill="#f59a3c"/></g>
          <g class="barN"><path d="M285 259V275.8q0 1.6 1.6 1.6h12.8q1.6 0 1.6-1.6V259z" fill="#7048e0"/></g>
          <g class="lineChart">
            <polyline points="131,212.2 163.4,214.4 195.8,216.5 228.2,218.7 260.6,220.5 293,222.3" fill="none" stroke="#1d9e5f" stroke-width="1"/>
            <circle cx="131" cy="212.2" r="1.8" fill="#fff" stroke="#1d9e5f" stroke-width=".9"/>
            <rect x="124.0" y="203.6" width="14" height="6.2" rx="3.1" fill="#fff" stroke="#d7eee2" stroke-width=".5"/>
            <text x="131" y="208.6" text-anchor="middle" font-size="4.8" font-weight="800" fill="#173957">130</text>
            <circle cx="163.4" cy="214.4" r="1.8" fill="#fff" stroke="#1d9e5f" stroke-width=".9"/>
            <rect x="156.4" y="205.8" width="14" height="6.2" rx="3.1" fill="#fff" stroke="#d7eee2" stroke-width=".5"/>
            <text x="163.4" y="210.8" text-anchor="middle" font-size="4.8" font-weight="800" fill="#173957">124</text>
            <circle cx="195.8" cy="216.5" r="1.8" fill="#fff" stroke="#1d9e5f" stroke-width=".9"/>
            <rect x="188.8" y="207.9" width="14" height="6.2" rx="3.1" fill="#fff" stroke="#d7eee2" stroke-width=".5"/>
            <text x="195.8" y="212.9" text-anchor="middle" font-size="4.8" font-weight="800" fill="#173957">118</text>
            <circle cx="228.2" cy="218.7" r="1.8" fill="#fff" stroke="#1d9e5f" stroke-width=".9"/>
            <rect x="221.2" y="210.1" width="14" height="6.2" rx="3.1" fill="#fff" stroke="#d7eee2" stroke-width=".5"/>
            <text x="228.2" y="215.1" text-anchor="middle" font-size="4.8" font-weight="800" fill="#173957">112</text>
            <circle cx="260.6" cy="220.5" r="1.8" fill="#fff" stroke="#1d9e5f" stroke-width=".9"/>
            <rect x="253.6" y="211.9" width="14" height="6.2" rx="3.1" fill="#fff" stroke="#d7eee2" stroke-width=".5"/>
            <text x="260.6" y="216.9" text-anchor="middle" font-size="4.8" font-weight="800" fill="#173957">107</text>
            <circle cx="293" cy="222.3" r="1.8" fill="#fff" stroke="#1d9e5f" stroke-width=".9"/>
            <rect x="286.0" y="213.7" width="14" height="6.2" rx="3.1" fill="#fff" stroke="#d7eee2" stroke-width=".5"/>
            <text x="293" y="218.7" text-anchor="middle" font-size="4.8" font-weight="800" fill="#173957">102</text>
          </g>
          <text x="131" y="291" text-anchor="middle" class="micro">Jan</text>
          <text x="163.4" y="291" text-anchor="middle" class="micro">Feb</text>
          <text x="195.8" y="291" text-anchor="middle" class="micro">Mar</text>
          <text x="228.2" y="291" text-anchor="middle" class="micro">Apr</text>
          <text x="260.6" y="291" text-anchor="middle" class="micro">May</text>
          <text x="293" y="291" text-anchor="middle" class="micro">Jun</text>
          <!-- ================= TRAPPED CASH ANALYSIS ================= -->
          <rect x="332" y="157" width="173" height="143" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="340" y="172" class="title" font-size="8.05">Trapped cash analysis</text>
          <text x="497" y="172" text-anchor="end" class="micro">30 Jun 2026</text>
          <rect x="340" y="188.0" width="20" height="20" rx="5" fill="#eaf3ff"/>
          <g fill="none" stroke="#1f6fd0" stroke-width="1.05" stroke-linejoin="round"><path d="M350 193.2l4.2 2.4v4.8l-4.2 2.4-4.2-2.4v-4.8z"/><path d="M345.8 195.6l4.2 2.4 4.2-2.4M350 198.0v4.8"/></g>
          <text x="366" y="187.5" font-size="5.2" font-weight="500" fill="#1b3a57">Inventory</text>
          <text x="366" y="200.2" class="title" font-size="9.4">₹<tspan class="counter" data-target="9.0" data-decimals="1">9.0</tspan> Cr</text>
          <text x="366" y="209.0" class="micro" font-size="4.6">Locked in stock</text>
          <text x="497" y="200.0" text-anchor="end" font-size="6.2" font-weight="700" fill="#173957">91 days</text>
          <line x1="340" y1="217.5" x2="497" y2="217.5" stroke="#edf1f4" stroke-width=".7"/>
          <rect x="340" y="226.5" width="20" height="20" rx="5" fill="#fff3df"/>
          <path d="M346.6 231.9h4.4l2.4 2.4v6.8h-6.8z" fill="#eaa044"/><path d="M348.2 236.5h3.6M348.2 238.3h3.6" stroke="#fff" stroke-width=".6"/>
          <text x="366" y="226.0" font-size="5.2" font-weight="500" fill="#1b3a57">Receivables</text>
          <text x="366" y="238.7" class="title" font-size="9.4">₹<tspan class="counter" data-target="8.5" data-decimals="1">8.5</tspan> Cr</text>
          <text x="366" y="247.5" class="micro" font-size="4.6">Owed by customers</text>
          <text x="497" y="238.5" text-anchor="end" font-size="6.2" font-weight="700" fill="#173957">62 days</text>
          <line x1="340" y1="256.0" x2="497" y2="256.0" stroke="#edf1f4" stroke-width=".7"/>
          <rect x="340" y="265.0" width="20" height="20" rx="5" fill="#f1ecfe"/>
          <g fill="#7a4fe0"><rect x="345.2" y="271.8" width="5.8" height="4.8" rx=".6"/><path d="M351.4 273.4h2l1.6 1.8v1.4h-3.6z"/><circle cx="347.2" cy="277.4" r="1.1"/><circle cx="352.6" cy="277.4" r="1.1"/></g>
          <text x="366" y="264.5" font-size="5.2" font-weight="500" fill="#1b3a57">Less: payables</text>
          <text x="366" y="277.2" class="title" font-size="9.4">(₹<tspan class="counter" data-target="5.0" data-decimals="1">5.0</tspan> Cr)</text>
          <text x="366" y="286.0" class="micro" font-size="4.6">Supplier credit</text>
          <text x="497" y="277.0" text-anchor="end" font-size="6.2" font-weight="700" fill="#173957">51 days</text>
          <!-- ================= ANALYSIS SCOPE ================= -->
          <rect x="514" y="157" width="191" height="143" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="521" y="172" class="title" font-size="8.05">Analysis scope</text>
          <circle cx="525" cy="185.0" r="3.2" fill="#1d9e5f"/><path d="M523.5 185.0l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="534" y="186.9" font-size="5.4" font-weight="500" fill="#1b3a57">Inventory ageing</text>
          <rect x="662" y="180.4" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="679.5" y="186.76" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="525" cy="199.6" r="3.2" fill="#1d9e5f"/><path d="M523.5 199.6l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="534" y="201.5" font-size="5.4" font-weight="500" fill="#1b3a57">Receivables ageing</text>
          <rect x="662" y="195.0" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="679.5" y="201.36" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="525" cy="214.2" r="3.2" fill="#1d9e5f"/><path d="M523.5 214.2l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="534" y="216.1" font-size="5.4" font-weight="500" fill="#1b3a57">Supplier terms review</text>
          <rect x="662" y="209.6" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="679.5" y="215.96" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="525" cy="228.8" r="3.2" fill="#1d9e5f"/><path d="M523.5 228.8l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="534" y="230.7" font-size="5.4" font-weight="500" fill="#1b3a57">Peer benchmarking</text>
          <rect x="662" y="224.20000000000002" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="679.5" y="230.56" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <rect x="522" y="241" width="175" height="34" rx="5" fill="#f3f7fc"/>
          <text x="526" y="251" class="micro">Formula</text>
          <text x="526" y="261" font-size="5.6" font-weight="700" fill="#173957">Cash cycle = DIO + DSO − DPO</text>
          <text x="526" y="270" class="micro">91 + 62 − 51 = 102 days</text>
          <!-- ================= RECOMMENDED ACTIONS ================= -->
          <rect x="170" y="307" width="457" height="84" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="178" y="321" class="title" font-size="8.05">Recommended actions</text>
          <text x="619" y="321" text-anchor="end" class="micro">estimated cash released</text>
          <rect x="178" y="329" width="105" height="45" rx="6" fill="#f3f7fc"/>
          <circle cx="186" cy="339.2" r="2.3" fill="#1f5fd6"/>
          <text x="193" y="341" font-size="5.5" font-weight="700" fill="#173957">Reduce inventory by 20%</text>
          <text x="193" y="355" font-size="8.4" font-weight="800" fill="#1d9e5f">₹<tspan class="counter" data-target="1.80" data-decimals="2">1.80</tspan> Cr</text>
          <text x="193" y="366" class="micro" font-size="4.7">Clear slow-moving SKUs.</text>
          <rect x="291" y="329" width="105" height="45" rx="6" fill="#f3f7fc"/>
          <circle cx="299" cy="339.2" r="2.3" fill="#f08c1a"/>
          <text x="306" y="341" font-size="5.5" font-weight="700" fill="#173957">Cut DSO by 15 days</text>
          <text x="306" y="355" font-size="8.4" font-weight="800" fill="#1d9e5f">₹<tspan class="counter" data-target="2.06" data-decimals="2">2.06</tspan> Cr</text>
          <text x="306" y="366" class="micro" font-size="4.7">Enforce credit policy.</text>
          <rect x="402" y="329" width="105" height="45" rx="6" fill="#f3f7fc"/>
          <circle cx="410" cy="339.2" r="2.3" fill="#7048e0"/>
          <text x="417" y="341" font-size="5.5" font-weight="700" fill="#173957">Extend DPO by 10 days</text>
          <text x="417" y="355" font-size="8.4" font-weight="800" fill="#1d9e5f">₹<tspan class="counter" data-target="0.99" data-decimals="2">0.99</tspan> Cr</text>
          <text x="417" y="366" class="micro" font-size="4.7">Renegotiate supplier terms.</text>
          <rect x="514" y="329" width="105" height="45" rx="6" fill="#f3f7fc"/>
          <circle cx="522" cy="339.2" r="2.3" fill="#1d9e5f"/>
          <text x="529" y="341" font-size="5.5" font-weight="700" fill="#173957">Total: cycle ~59 days</text>
          <text x="529" y="355" font-size="8.4" font-weight="800" fill="#1d9e5f">₹<tspan class="counter" data-target="4.85" data-decimals="2">4.85</tspan> Cr</text>
          <text x="529" y="366" class="micro" font-size="4.7">Down from 102 days.</text>
        </g>

        <!-- ================= FLOATING CARDS — OUTSIDE CLIP ON PURPOSE ================= -->
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="620" y="15" width="166" height="67" rx="11" fill="#f2fbf6"/>
        <circle cx="643" cy="38" r="12.5" fill="#dff3e8"/>
        <g fill="none" stroke="#1d9e5f" stroke-width="1.2" stroke-linecap="round"><path d="M647.2 36.8a4.4 4.4 0 0 0-8-1.4M638.8 39.2a4.4 4.4 0 0 0 8 1.4"/><path d="M638.8 33.8v1.6h1.6M647.2 42.2v-1.6h-1.6"/></g>
        <text x="663" y="31" font-size="6.2" font-weight="700" fill="#173957">Cash conversion cycle</text>
        <text x="663" y="49" font-size="16" font-weight="800" fill="#1d9e5f"><tspan class="counter" data-target="102" data-decimals="0">102</tspan> days</text>
        <text x="663" y="60" font-size="5.1" fill="#4d6275">DIO 91 + DSO 62 − DPO 51. Net</text>
        <text x="663" y="70" font-size="5.1" fill="#4d6275">working capital ₹12.5 Cr.</text>
        </g>
        <g class="floatB" filter="url(#smallShadow)">
        <rect x="12" y="359" width="150" height="67" rx="11" fill="#f1f6fe"/>
        <circle cx="35" cy="382" r="12.5" fill="#e1ecfb"/>
        <g fill="#1f6fd0"><rect x="30.6" y="382.4" width="2.3" height="3.6" rx=".5"/><rect x="33.85" y="380.1" width="2.3" height="5.9" rx=".5"/><rect x="37.1" y="377.6" width="2.3" height="8.4" rx=".5"/></g>
        <text x="55" y="375" font-size="6.2" font-weight="700" fill="#173957">Net working capital</text>
        <text x="55" y="395" font-size="16.5" font-weight="800" fill="#1f6fd0">₹<tspan class="counter" data-target="12.5" data-decimals="1">12.5</tspan> Cr</text>
        <text x="55" y="406" font-size="5.1" fill="#4d6275">▼ 2.7% vs Mar 2026, while</text>
        <text x="55" y="415.5" font-size="5.1" fill="#4d6275">revenue grew 12.6%.</text>
        </g>
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="642" y="359" width="146" height="67" rx="11" fill="#fff8ec"/>
        <circle cx="665" cy="381" r="12.5" fill="#fdeccf"/>
        <path d="M665 375.2a3.9 3.9 0 0 0-2.3 7.1v1.6h4.6v-1.6a3.9 3.9 0 0 0-2.3-7.1zM663.3 385.1h3.4v1.2h-3.4z" fill="#e68a1a"/>
        <text x="685" y="374" font-size="6.2" font-weight="700" fill="#173957">Potential cash unlock</text>
        <text x="685" y="394" font-size="16.5" font-weight="800" fill="#e68a1a">₹<tspan class="counter" data-target="4.85" data-decimals="2">4.85</tspan> Cr</text>
        <text x="685" y="406" font-size="5.1" fill="#4d6275">from inventory, collections</text>
        <text x="685" y="415.5" font-size="5.1" fill="#4d6275">and supplier terms.</text>
        </g>

      </svg>
    </div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        // Line charts: <g class="lineChart"> holding one polyline + its dots.
        // The line draws left to right; each dot appears as the line reaches it.
        const lines = Array.from(document.querySelectorAll(".lineChart")).map((g) => {
          const pl = g.querySelector("polyline");
          const xs = pl.getAttribute("points").trim().split(/\s+/).map((pt) => num(pt.split(",")[0], 0));
          const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
          const L = pl.getTotalLength ? pl.getTotalLength() : 1000;
          pl.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          const dots = Array.from(g.querySelectorAll("circle, text, rect")).map((c) => {
            const x = c.hasAttribute("cx") ? num(c.getAttribute("cx"), 0)
              : num(c.getAttribute("x"), 0) + (c.tagName === "rect" ? num(c.getAttribute("width"), 0) / 2 : 0);
            return { c, at: x1 > x0 ? (x - x0) / (x1 - x0) : 0 };
          });
          return { pl, L, dots };
        });

        // KPI sparklines: <g class="sparkChart"> with an area path, a line path and an end dot.
        // Line draws left to right, area fills behind it, dot lands at the end.
        const sparks = Array.from(document.querySelectorAll(".sparkChart")).map((g, i) => {
          const paths = Array.from(g.querySelectorAll("path"));
          const line = paths.find((p) => p.getAttribute("fill") === "none");
          const area = paths.find((p) => p !== line);
          const dot = g.querySelector("circle");
          const L = line.getTotalLength();
          line.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          let clip = null, bb = null;
          if (area) {
            bb = area.getBBox();
            const ns = "http://www.w3.org/2000/svg";
            const cp = document.createElementNS(ns, "clipPath");
            cp.setAttribute("id", "sparkClip" + i);
            clip = document.createElementNS(ns, "rect");
            clip.setAttribute("x", bb.x); clip.setAttribute("y", bb.y - 2);
            clip.setAttribute("height", bb.height + 4); clip.setAttribute("width", 0);
            cp.appendChild(clip); g.appendChild(cp);
            area.setAttribute("clip-path", "url(#sparkClip" + i + ")");
          }
          return { line, L, clip, bb, dot };
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          sparks.forEach((sp) => {
            sp.line.setAttribute("stroke-dashoffset", (sp.L * (1 - p)).toFixed(2));
            if (sp.clip) sp.clip.setAttribute("width", (sp.bb.width * p).toFixed(2));
            if (sp.dot) sp.dot.style.opacity = Math.max(0, Math.min(1, (p - 0.94) / 0.06)).toFixed(2);
          });
          lines.forEach((ln) => {
            ln.pl.setAttribute("stroke-dashoffset", (ln.L * (1 - p)).toFixed(2));
            ln.dots.forEach((d) => {
              d.c.style.opacity = Math.max(0, Math.min(1, (p - d.at) / 0.06 + 1)).toFixed(2);
            });
          });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body>
</html>
`,
  mis: String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>CFO CRAFT — MIS & Financial Reporting Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body { font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .stage { width: 800px; max-width: 100vw; margin: 0 auto; }
      svg { display: block; width: 100%; height: auto; overflow: hidden; }
      text { text-rendering: geometricPrecision; font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .title { font-weight: 700; fill: #10233f; }
      .semi { font-weight: 700; fill: #183a58; }
      .muted { font-weight: 500; fill: #5f7285; }
      .lab { fill: #1b3a57; }
      .micro { font-size: 4.8px; font-weight: 400; fill: #7a8896; }
      .tiny { font-size: 4.35px; font-weight: 400; fill: #7a8896; }
      .th text { font-size: 5.1px; font-weight: 500; fill: #5f7285; }
      .td text { font-size: 5.4px; font-weight: 500; fill: #1b3a57; }
      .counter { font-variant-numeric: tabular-nums; }
      .bar { transform-box: fill-box; transform-origin: bottom; }
      .barN { transform-box: fill-box; transform-origin: top; }
      @media (prefers-reduced-motion: reduce) {
        .bar, .barN, .spark, .floatA, .floatB { animation: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-label="CFO CRAFT MIS and financial reporting dashboard">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#073f91" />
            <stop offset=".50" stop-color="#063778" />
            <stop offset="1" stop-color="#082e65" />
          </linearGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="1" stop-color="#f9fbfd" />
          </linearGradient>
          <radialGradient id="orb" cx=".35" cy=".3" r=".8">
            <stop offset="0" stop-color="#2f78d8" stop-opacity=".75" />
            <stop offset="1" stop-color="#0a3f8f" stop-opacity=".15" />
          </radialGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#7fb4ff" stop-opacity=".7" />
            <stop offset=".6" stop-color="#e3b25a" stop-opacity=".85" />
            <stop offset="1" stop-color="#e3b25a" stop-opacity="0" />
          </linearGradient>
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#8fbaf0" fill-opacity=".45" />
          </pattern>
          <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#8fbaf0" stroke-opacity=".12" stroke-width=".7" />
          </pattern>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#03265c" flood-opacity=".26" />
          </filter>
          <filter id="smallShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0a315b" flood-opacity=".18" />
          </filter>
          <clipPath id="dashboardClip">
            <rect x="76" y="42" width="650" height="370" rx="14" />
          </clipPath>
        </defs>

        <!-- ===================== BACKGROUND ===================== -->
        <rect width="800" height="450" rx="23" fill="url(#bg)" />
        <circle cx="40" cy="30" r="60" fill="url(#orb)" opacity=".8" />
        <circle cx="30" cy="330" r="55" fill="none" stroke="#7fb4ff" stroke-opacity=".3" />
        <circle cx="10" cy="330" r="42" fill="url(#orb)" opacity=".6" />
        <circle cx="790" cy="330" r="75" fill="url(#orb)" opacity=".7" />
        <rect x="8" y="88" width="42" height="48" fill="url(#dots)" />
        <rect x="760" y="218" width="36" height="46" fill="url(#dots)" />
        <rect x="64" y="28" width="674" height="394" rx="18" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />

        <!-- ===================== MAIN DASHBOARD ===================== -->
        <rect x="76" y="42" width="650" height="370" rx="14" fill="url(#paper)" filter="url(#shadow)" />

        <g clip-path="url(#dashboardClip)">
          <!-- HEADER -->
          <rect x="89" y="52" width="29" height="29" rx="6" fill="#eaf3ff" />
          <g transform="translate(103.5 66.5) scale(1.45) translate(-103.5 -66.5)"><g fill="#1f6fd0"><rect x="99.1" y="66.9" width="2.3" height="3.6" rx=".5"/><rect x="102.35" y="64.6" width="2.3" height="5.9" rx=".5"/><rect x="105.6" y="62.1" width="2.3" height="8.4" rx=".5"/></g></g>
          <text x="126" y="66" class="title" font-size="14.4">MIS &amp; Financial Reporting</text>
          <text x="126" y="77.5" class="muted" font-size="6.4">Monthly financial insights for faster, better decisions</text>

          <rect x="497" y="48" width="107" height="20" rx="5" fill="#fff" stroke="#e7edf2" />
          <text x="504" y="60"  font-size="5.55" font-weight="600" fill="#33495d">Q1 FY27 (Apr–Jun 2026)</text>
          <path d="M594 57.5l1.8 1.8 1.8-1.8" fill="none" stroke="#83909d" stroke-width=".8" />
          <rect x="428" y="72" width="176" height="15" rx="4" fill="#f1f5fb" />
          <text x="516" y="81.5" text-anchor="middle" class="tiny">Illustrative dashboard with sample data, not client results</text>

          <!-- ================= KPI ROW ================= -->
          <rect x="91" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="97" y="99" width="23" height="23" rx="6" fill="#eaf3ff"/>
<g fill="#1f6fd0"><rect x="104.1" y="110.9" width="2.3" height="3.6" rx=".5"/><rect x="107.35" y="108.6" width="2.3" height="5.9" rx=".5"/><rect x="110.6" y="106.1" width="2.3" height="8.4" rx=".5"/></g>
<text x="127" y="107" class="muted lab" font-size="6.05">Total revenue</text>
<text x="127" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="12.5" data-decimals="1">12.5</tspan> Cr</text>
<path d="M127 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
<text x="133" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">12.6% QoQ</text>
<text x="127" y="144" class="micro">Q4 FY26: ₹11.1 Cr</text>
<g class="sparkChart"><path d="M198 137C209.2 136 214.0 131.5 217.84 130.0S225.2 124.5 230 123V138.5H198z" fill="#e3f5ec"/><path d="M198 137C209.2 136 214.0 131.5 217.84 130.0S225.2 124.5 230 123" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="230" cy="123" r="1.6" fill="#2f9e6c"/></g>
          <rect x="247" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="253" y="99" width="23" height="23" rx="6" fill="#e7f7ef"/>
<text x="264.5" y="113.8" text-anchor="middle" font-size="9.4" font-weight="800" fill="#2e9e6e">%</text>
<text x="283" y="107" class="muted lab" font-size="6.05">EBITDA</text>
<text x="283" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="1.80" data-decimals="2">1.80</tspan> Cr</text>
<path d="M283 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
<text x="289" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">25.1% QoQ</text>
<text x="283" y="144" class="micro">14.4% margin</text>
<g class="bar"><rect x="358.0" y="136" width="3.6" height="3" rx=".8" fill="#a8dcc1"/><rect x="363.2" y="133.5" width="3.6" height="5.5" rx=".8" fill="#86cfa9"/><rect x="368.4" y="131" width="3.6" height="8" rx=".8" fill="#5fbd8d"/><rect x="373.6" y="128.5" width="3.6" height="10.5" rx=".8" fill="#3faa77"/><rect x="378.8" y="126" width="3.6" height="13" rx=".8" fill="#2e9e6c"/><rect x="384.0" y="122.5" width="3.6" height="16.5" rx=".8" fill="#228a5c"/></g>
          <rect x="403" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="409" y="99" width="23" height="23" rx="6" fill="#f1ecfe"/>
<g fill="#7a4fe0"><ellipse cx="420.5" cy="106.9" rx="4.4" ry="1.7"/><path d="M416.1 108.1c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/><path d="M416.1 111.7c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/></g>
<text x="439" y="107" class="muted lab" font-size="6.05">Net profit</text>
<text x="439" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="0.94" data-decimals="2">0.94</tspan> Cr</text>
<path d="M439 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
<text x="445" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">36.2% QoQ</text>
<text x="439" y="144" class="micro">Q4 FY26: ₹0.69 Cr</text>
<g class="sparkChart"><path d="M514 137C524.85 136 529.5 131.5 533.22 130.0S540.35 124.5 545 123V138.5H514z" fill="#e3f5ec"/><path d="M514 137C524.85 136 529.5 131.5 533.22 130.0S540.35 124.5 545 123" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="545" cy="123" r="1.6" fill="#2f9e6c"/></g>
          <rect x="559" y="93" width="153" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="565" y="99" width="23" height="23" rx="6" fill="#eaf3ff"/>
<rect x="571.5" y="106.9" width="10" height="7.2" rx="1.6" fill="#1f6fd0"/><rect x="577.1" y="109.2" width="4.4" height="2.6" rx="1" fill="#fff"/>
<text x="595" y="107" class="muted lab" font-size="6.05">Cash and bank</text>
<text x="595" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="0.90" data-decimals="2">0.90</tspan> Cr</text>
<path d="M595 135.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
<text x="601" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">₹0.26 Cr vs Mar</text>
<text x="595" y="144" class="micro">Mar 2026: ₹0.64 Cr</text>
<g class="sparkChart"><path d="M670 137C680.85 136 685.5 131.5 689.22 130.0S696.35 124.5 701 123V138.5H670z" fill="#e3f5ec"/><path d="M670 137C680.85 136 685.5 131.5 689.22 130.0S696.35 124.5 701 123" fill="none" stroke="#2f9e6c" stroke-width="1.2" class="spark"/><circle cx="701" cy="123" r="1.6" fill="#2f9e6c"/></g>
          <!-- ================= P&L TREND ================= -->
          <rect x="90" y="158" width="213" height="137" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="98" y="173" class="title" font-size="8.05">P&amp;L trend</text>
          <circle cx="229" cy="171.3" r="2" fill="#1a5fd6"/><text x="233" y="173.0" class="micro" font-weight="600" fill="#6f8094">Revenue</text>
          <circle cx="271" cy="171.3" r="2" fill="#9cc3ee"/><text x="275" y="173.0" class="micro" font-weight="600" fill="#6f8094">EBITDA</text>
          <line x1="116" y1="268" x2="296" y2="268" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="269.6" text-anchor="end" class="micro">0</text>
          <line x1="116" y1="252" x2="296" y2="252" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="253.6" text-anchor="end" class="micro">1</text>
          <line x1="116" y1="236" x2="296" y2="236" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="237.6" text-anchor="end" class="micro">2</text>
          <line x1="116" y1="220" x2="296" y2="220" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="221.6" text-anchor="end" class="micro">3</text>
          <line x1="116" y1="204" x2="296" y2="204" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="205.6" text-anchor="end" class="micro">4</text>
          <line x1="116" y1="188" x2="296" y2="188" stroke="#eef1f4" stroke-width=".7"/>
          <text x="111" y="189.6" text-anchor="end" class="micro">5</text>
          <text transform="translate(101 228) rotate(-90)" text-anchor="middle" class="micro">₹ Cr</text>
          <g class="bar"><rect x="119.5" y="210.4" width="9" height="57.6" rx="1.2" fill="#1a5fd6"/><rect x="129.5" y="260.8" width="9" height="7.2" rx="1.2" fill="#9cc3ee"/><rect x="149.0" y="209.6" width="9" height="58.4" rx="1.2" fill="#1a5fd6"/><rect x="159.0" y="260.5" width="9" height="7.5" rx="1.2" fill="#9cc3ee"/><rect x="178.5" y="206.4" width="9" height="61.6" rx="1.2" fill="#1a5fd6"/><rect x="188.5" y="259.7" width="9" height="8.3" rx="1.2" fill="#9cc3ee"/><rect x="208.0" y="204.0" width="9" height="64.0" rx="1.2" fill="#1a5fd6"/><rect x="218.0" y="259.0" width="9" height="9.0" rx="1.2" fill="#9cc3ee"/><rect x="237.5" y="201.6" width="9" height="66.4" rx="1.2" fill="#1a5fd6"/><rect x="247.5" y="258.4" width="9" height="9.6" rx="1.2" fill="#9cc3ee"/><rect x="267.0" y="198.4" width="9" height="69.6" rx="1.2" fill="#1a5fd6"/><rect x="277.0" y="257.8" width="9" height="10.2" rx="1.2" fill="#9cc3ee"/></g>
          <text x="124" y="207.4" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">3.60</text>
          <text x="129" y="277" text-anchor="middle" class="micro">Jan</text>
          <text x="153.5" y="206.6" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">3.65</text>
          <text x="158.5" y="277" text-anchor="middle" class="micro">Feb</text>
          <text x="183" y="203.4" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">3.85</text>
          <text x="188" y="277" text-anchor="middle" class="micro">Mar</text>
          <text x="212.5" y="201.0" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">4.00</text>
          <text x="217.5" y="277" text-anchor="middle" class="micro">Apr</text>
          <text x="242" y="198.6" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">4.15</text>
          <text x="247" y="277" text-anchor="middle" class="micro">May</text>
          <text x="271.5" y="195.4" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">4.35</text>
          <text x="276.5" y="277" text-anchor="middle" class="micro">Jun</text>
          <!-- ================= BUDGET VS ACTUAL ================= -->
          <rect x="312" y="158" width="198" height="137" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="320" y="173" class="title" font-size="8.05">Budget vs actual</text>
          <text x="503" y="173" text-anchor="end" class="micro">Q1 FY27, ₹ Cr</text>
          <rect x="320" y="180" width="183" height="13.5" rx="2" fill="#f2f6fb"/>
          <g class="th"><text x="323" y="189">Metric</text><text x="427" y="189" text-anchor="end">Actual</text><text x="460" y="189" text-anchor="end">Budget</text><text x="500" y="189" text-anchor="end">Variance</text></g>
          <g class="td"><text x="323" y="203.0">Revenue</text><text x="427" y="203.0" text-anchor="end">12.50</text><text x="460" y="203.0" text-anchor="end">12.00</text></g>
          <text x="494" y="203.0" text-anchor="end" font-size="5.4" font-weight="700" fill="#299d73">+0.50</text>
          <path d="M495.5 202.6l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <line x1="320" y1="208.8" x2="503" y2="208.8" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="323" y="217.3">EBITDA</text><text x="427" y="217.3" text-anchor="end">1.80</text><text x="460" y="217.3" text-anchor="end">1.68</text></g>
          <text x="494" y="217.3" text-anchor="end" font-size="5.4" font-weight="700" fill="#299d73">+0.12</text>
          <path d="M495.5 216.9l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <line x1="320" y1="223.1" x2="503" y2="223.1" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="323" y="231.6">Net profit</text><text x="427" y="231.6" text-anchor="end">0.94</text><text x="460" y="231.6" text-anchor="end">0.88</text></g>
          <text x="494" y="231.6" text-anchor="end" font-size="5.4" font-weight="700" fill="#299d73">+0.06</text>
          <path d="M495.5 231.2l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <line x1="320" y1="237.4" x2="503" y2="237.4" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="323" y="245.9">Operating cash flow</text><text x="427" y="245.9" text-anchor="end">1.83</text><text x="460" y="245.9" text-anchor="end">2.00</text></g>
          <text x="494" y="245.9" text-anchor="end" font-size="5.4" font-weight="700" fill="#d93c3c">−0.17</text>
          <path d="M495.5 242.1h4.2l-2.1 3.4z" fill="#d93c3c"/>
          <line x1="320" y1="251.7" x2="503" y2="251.7" stroke="#edf1f4" stroke-width=".7"/>
          <text x="320" y="263" class="micro" font-size="4.6">Operating cash flow = EBITDA − tax + working-capital release.</text>
          <!-- ================= PLANT-WISE EBITDA ================= -->
          <rect x="519" y="158" width="191" height="137" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="527" y="173" class="title" font-size="8.05">Plant-wise EBITDA</text>
          <g transform="rotate(-90 561 215)">
          <circle cx="561" cy="215" r="28.5" fill="none" stroke="#0d1f4a" stroke-width="10.5" stroke-dasharray="97.89 81.18" stroke-dashoffset="0.00" class="circleBar"/>
          <circle cx="561" cy="215" r="28.5" fill="none" stroke="#1f5fd1" stroke-width="10.5" stroke-dasharray="58.49 120.58" stroke-dashoffset="-98.49" class="circleBar"/>
          <circle cx="561" cy="215" r="28.5" fill="none" stroke="#a9cdf2" stroke-width="10.5" stroke-dasharray="20.89 158.18" stroke-dashoffset="-157.58" class="circleBar"/>
          </g>
          <text x="561" y="216.2" text-anchor="middle" class="title" font-size="8.6">₹<tspan class="counter" data-target="1.80" data-decimals="2">1.80</tspan> Cr</text>
          <text x="561" y="223.6" text-anchor="middle" class="micro">EBITDA</text>
          <circle cx="605" cy="189.1" r="2.2" fill="#0d1f4a"/><text x="611" y="191.0" font-size="5.6" font-weight="500" fill="#1b3a57">Plant A</text>
          <text x="611" y="199.6" class="micro">₹0.99 Cr (55%)</text>
          <circle cx="605" cy="210.6" r="2.2" fill="#1f5fd1"/><text x="611" y="212.5" font-size="5.6" font-weight="500" fill="#1b3a57">Plant B</text>
          <text x="611" y="221.1" class="micro">₹0.59 Cr (33%)</text>
          <circle cx="605" cy="232.1" r="2.2" fill="#a9cdf2"/><text x="611" y="234.0" font-size="5.6" font-weight="500" fill="#1b3a57">Plant C</text>
          <text x="611" y="242.6" class="micro">₹0.22 Cr (12%)</text>
          <!-- ================= KEY BALANCE SHEET METRICS ================= -->
          <rect x="174" y="304" width="239" height="94" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="182" y="319" class="title" font-size="8.05">Key balance sheet metrics</text>
          <text x="405" y="319" text-anchor="end" class="micro">30 Jun 2026</text>
          <rect x="182" y="327" width="52" height="38" rx="5" fill="#f3f7fc"/>
          <text x="187" y="336.5" class="micro">Current ratio</text>
          <text x="187" y="349" class="title" font-size="9"><tspan class="counter" data-target="1.45" data-decimals="2">1.45</tspan></text>
          <path d="M187 359.2l2.1-3.4 2.1 3.4z" fill="#299d73"/>
          <text x="192.5" y="359.2" font-size="4.7" font-weight="700" fill="#299d73">0.05 vs Mar</text>
          <rect x="239" y="327" width="52" height="38" rx="5" fill="#f3f7fc"/>
          <text x="244" y="336.5" class="micro">Debt to equity</text>
          <text x="244" y="349" class="title" font-size="9"><tspan class="counter" data-target="0.60" data-decimals="2">0.60</tspan></text>
          <path d="M244 355.8h4.2l-2.1 3.4z" fill="#299d73"/>
          <text x="249.5" y="359.2" font-size="4.7" font-weight="700" fill="#299d73">0.04 vs Mar</text>
          <rect x="296" y="327" width="52" height="38" rx="5" fill="#f3f7fc"/>
          <text x="301" y="336.5" class="micro">Inventory days</text>
          <text x="301" y="349" class="title" font-size="9"><tspan class="counter" data-target="91" data-decimals="0">91</tspan></text>
          <path d="M301 355.8h4.2l-2.1 3.4z" fill="#299d73"/>
          <text x="306.5" y="359.2" font-size="4.7" font-weight="700" fill="#299d73">4 days</text>
          <rect x="353" y="327" width="52" height="38" rx="5" fill="#f3f7fc"/>
          <text x="358" y="336.5" class="micro">Debtor days</text>
          <text x="358" y="349" class="title" font-size="9"><tspan class="counter" data-target="62" data-decimals="0">62</tspan></text>
          <path d="M358 355.8h4.2l-2.1 3.4z" fill="#299d73"/>
          <text x="363.5" y="359.2" font-size="4.7" font-weight="700" fill="#299d73">8 days</text>
          <!-- ================= CASH FLOW TREND ================= -->
          <rect x="421" y="304" width="210" height="94" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="429" y="319" class="title" font-size="8.05">Cash flow trend</text>
          <text x="522" y="319" class="micro">₹ Cr</text>
          <circle cx="566" cy="317.3" r="2" fill="#1f63d6"/><text x="570" y="319.0" class="micro" font-weight="700" fill="#1f63d6">Inflow</text>
          <circle cx="596" cy="317.3" r="2" fill="#9cc3ee"/><text x="600" y="319.0" class="micro" font-weight="700" fill="#7aaee8">Outflow</text>
          <line x1="447" y1="372" x2="586" y2="372" stroke="#eef1f4" stroke-width=".7"/>
          <text x="441" y="373.6" text-anchor="end" class="micro">3</text>
          <line x1="447" y1="352" x2="586" y2="352" stroke="#eef1f4" stroke-width=".7"/>
          <text x="441" y="353.6" text-anchor="end" class="micro">4</text>
          <line x1="447" y1="332" x2="586" y2="332" stroke="#eef1f4" stroke-width=".7"/>
          <text x="441" y="333.6" text-anchor="end" class="micro">5</text>
          <g class="lineChart">
          <polyline points="456,360.4 480.2,359.0 504.4,352.4 528.6,350.0 552.8,349.6 577,344.8" fill="none" stroke="#a9cdf2" stroke-width="1.1"/>
          <circle cx="456" cy="360.4" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="480.2" cy="359.0" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="504.4" cy="352.4" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="528.6" cy="350.0" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="552.8" cy="349.6" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          <circle cx="577" cy="344.8" r="1.9" fill="#fff" stroke="#a9cdf2" stroke-width=".9"/>
          </g>
          <g class="lineChart">
          <polyline points="456,357.6 480.2,355.6 504.4,349.6 528.6,349.0 552.8,348.4 577,341.8" fill="none" stroke="#1f63d6" stroke-width="1.2"/>
          <circle cx="456" cy="357.6" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="480.2" cy="355.6" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="504.4" cy="349.6" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="528.6" cy="349.0" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="552.8" cy="348.4" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          <circle cx="577" cy="341.8" r="1.9" fill="#fff" stroke="#1f63d6" stroke-width=".9"/>
          </g>
          <text x="456" y="381" text-anchor="middle" class="micro">Jan</text>
          <text x="480.2" y="381" text-anchor="middle" class="micro">Feb</text>
          <text x="504.4" y="381" text-anchor="middle" class="micro">Mar</text>
          <text x="528.6" y="381" text-anchor="middle" class="micro">Apr</text>
          <text x="552.8" y="381" text-anchor="middle" class="micro">May</text>
          <text x="577" y="381" text-anchor="middle" class="micro">Jun</text>
        </g>

        <!-- ================= FLOATING CARDS — OUTSIDE CLIP ON PURPOSE ================= -->
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="621" y="12" width="165" height="75" rx="11" fill="#f2fbf6"/>
        <circle cx="644" cy="35" r="12.5" fill="#dff3e8"/>
        <path d="M644 29.2a3.9 3.9 0 0 0-2.3 7.1v1.6h4.6v-1.6a3.9 3.9 0 0 0-2.3-7.1zM642.3 39.1h3.4v1.2h-3.4z" fill="#1d9e5f"/>
        <text x="664" y="28" font-size="6.2" font-weight="700" fill="#173957">Key insight</text>
        <text x="664" y="46" font-size="16" font-weight="800" fill="#1d9e5f">+<tspan class="counter" data-target="1.4" data-decimals="1">1.4</tspan> pts</text>
        <text x="664" y="56.5" font-size="5.1" fill="#4d6275">EBITDA margin rose to 14.4% from</text>
        <text x="664" y="65.5" font-size="5.1" fill="#4d6275">13.0%, led by a 1.5-pt gain in gross</text>
        <text x="664" y="74.5" font-size="5.1" fill="#4d6275">margin.</text>
        </g>
        <g class="floatB" filter="url(#smallShadow)">
        <rect x="13" y="361" width="149" height="65" rx="11" fill="#f1f6fe"/>
        <circle cx="36" cy="383" r="12.5" fill="#e1ecfb"/>
        <g fill="#1f6fd0"><rect x="31.6" y="383.4" width="2.3" height="3.6" rx=".5"/><rect x="34.85" y="381.1" width="2.3" height="5.9" rx=".5"/><rect x="38.1" y="378.6" width="2.3" height="8.4" rx=".5"/></g>
        <text x="56" y="376" font-size="6.2" font-weight="700" fill="#173957">Budget performance</text>
        <text x="56" y="396" font-size="16.5" font-weight="800" fill="#1f6fd0">+₹<tspan class="counter" data-target="0.50" data-decimals="2">0.50</tspan> Cr</text>
        <text x="56" y="406.5" font-size="5.1" fill="#4d6275">revenue above budget for the</text>
        <text x="56" y="415.5" font-size="5.1" fill="#4d6275">quarter.</text>
        </g>
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="643" y="352" width="145" height="74" rx="11" fill="#fdf0f0"/>
        <circle cx="666" cy="375" r="12.5" fill="#fbe0e0"/>
        <circle cx="666" cy="375" r="5" fill="none" stroke="#d93c3c" stroke-width="1.1"/><circle cx="666" cy="375" r="2.7" fill="none" stroke="#d93c3c" stroke-width="1.1"/><circle cx="666" cy="375" r=".9" fill="#d93c3c"/>
        <text x="686" y="368" font-size="6.2" font-weight="700" fill="#173957">CFO insight</text>
        <text x="686" y="387" font-size="16" font-weight="800" fill="#d93c3c">−₹<tspan class="counter" data-target="0.17" data-decimals="2">0.17</tspan> Cr</text>
        <text x="686" y="397.5" font-size="5.1" fill="#4d6275">operating cash flow vs</text>
        <text x="686" y="406.5" font-size="5.1" fill="#4d6275">budget. Each 5 days of DSO</text>
        <text x="686" y="415.5" font-size="5.1" fill="#4d6275">frees about ₹0.69 Cr.</text>
        </g>

      </svg>
    </div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        // Line charts: <g class="lineChart"> holding one polyline + its dots.
        // The line draws left to right; each dot appears as the line reaches it.
        const lines = Array.from(document.querySelectorAll(".lineChart")).map((g) => {
          const pl = g.querySelector("polyline");
          const xs = pl.getAttribute("points").trim().split(/\s+/).map((pt) => num(pt.split(",")[0], 0));
          const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
          const L = pl.getTotalLength ? pl.getTotalLength() : 1000;
          pl.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          const dots = Array.from(g.querySelectorAll("circle")).map((c) => ({
            c, at: x1 > x0 ? (num(c.getAttribute("cx"), 0) - x0) / (x1 - x0) : 0
          }));
          return { pl, L, dots };
        });

        // KPI sparklines: <g class="sparkChart"> with an area path, a line path and an end dot.
        // Line draws left to right, area fills behind it, dot lands at the end.
        const sparks = Array.from(document.querySelectorAll(".sparkChart")).map((g, i) => {
          const paths = Array.from(g.querySelectorAll("path"));
          const line = paths.find((p) => p.getAttribute("fill") === "none");
          const area = paths.find((p) => p !== line);
          const dot = g.querySelector("circle");
          const L = line.getTotalLength();
          line.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          let clip = null, bb = null;
          if (area) {
            bb = area.getBBox();
            const ns = "http://www.w3.org/2000/svg";
            const cp = document.createElementNS(ns, "clipPath");
            cp.setAttribute("id", "sparkClip" + i);
            clip = document.createElementNS(ns, "rect");
            clip.setAttribute("x", bb.x); clip.setAttribute("y", bb.y - 2);
            clip.setAttribute("height", bb.height + 4); clip.setAttribute("width", 0);
            cp.appendChild(clip); g.appendChild(cp);
            area.setAttribute("clip-path", "url(#sparkClip" + i + ")");
          }
          return { line, L, clip, bb, dot };
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          sparks.forEach((sp) => {
            sp.line.setAttribute("stroke-dashoffset", (sp.L * (1 - p)).toFixed(2));
            if (sp.clip) sp.clip.setAttribute("width", (sp.bb.width * p).toFixed(2));
            if (sp.dot) sp.dot.style.opacity = Math.max(0, Math.min(1, (p - 0.94) / 0.06)).toFixed(2);
          });
          lines.forEach((ln) => {
            ln.pl.setAttribute("stroke-dashoffset", (ln.L * (1 - p)).toFixed(2));
            ln.dots.forEach((d) => {
              d.c.style.opacity = Math.max(0, Math.min(1, (p - d.at) / 0.06 + 1)).toFixed(2);
            });
          });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body>
</html>
`,
  tax: String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>CFO CRAFT — Tax & Compliance Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body { font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .stage { width: 800px; max-width: 100vw; margin: 0 auto; }
      svg { display: block; width: 100%; height: auto; overflow: hidden; }
      text { text-rendering: geometricPrecision; font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .title { font-weight: 700; fill: #10233f; }
      .semi { font-weight: 700; fill: #183a58; }
      .muted { font-weight: 500; fill: #5f7285; }
      .lab { fill: #1b3a57; }
      .micro { font-size: 4.8px; font-weight: 400; fill: #7a8896; }
      .tiny { font-size: 4.35px; font-weight: 400; fill: #7a8896; }
      .th text { font-size: 5.1px; font-weight: 500; fill: #5f7285; }
      .td text { font-size: 5.4px; font-weight: 500; fill: #1b3a57; }
      .counter { font-variant-numeric: tabular-nums; }
      .bar { transform-box: fill-box; transform-origin: bottom; }
      .barN { transform-box: fill-box; transform-origin: top; }
      @media (prefers-reduced-motion: reduce) {
        .bar, .barN, .spark, .floatA, .floatB, .circleBar { animation: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-label="CFO CRAFT tax and compliance dashboard">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#073f91" />
            <stop offset=".50" stop-color="#063778" />
            <stop offset="1" stop-color="#082e65" />
          </linearGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="1" stop-color="#f9fbfd" />
          </linearGradient>
          <radialGradient id="orb" cx=".35" cy=".3" r=".8">
            <stop offset="0" stop-color="#2f78d8" stop-opacity=".75" />
            <stop offset="1" stop-color="#0a3f8f" stop-opacity=".15" />
          </radialGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#7fb4ff" stop-opacity=".7" />
            <stop offset=".6" stop-color="#e3b25a" stop-opacity=".85" />
            <stop offset="1" stop-color="#e3b25a" stop-opacity="0" />
          </linearGradient>
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#8fbaf0" fill-opacity=".45" />
          </pattern>
          <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#8fbaf0" stroke-opacity=".12" stroke-width=".7" />
          </pattern>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#03265c" flood-opacity=".26" />
          </filter>
          <filter id="smallShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0a315b" flood-opacity=".18" />
          </filter>
          <clipPath id="dashboardClip">
            <rect x="76" y="42" width="650" height="370" rx="14" />
          </clipPath>
        </defs>

        <!-- ===================== BACKGROUND ===================== -->
        <rect width="800" height="450" rx="23" fill="url(#bg)" />
        <rect x="0" y="100" width="75" height="350" fill="url(#hatch)" />
        <rect x="725" y="0" width="75" height="300" fill="url(#hatch)" />
        <circle cx="100" cy="95" r="80" fill="none" stroke="url(#gold)" stroke-width=".9" />
        <circle cx="690" cy="380" r="95" fill="none" stroke="url(#gold)" stroke-width=".9" transform="rotate(180 690 380)" />
        <rect x="18" y="276" width="36" height="58" fill="url(#dots)" />
        <rect x="752" y="282" width="30" height="36" fill="url(#dots)" />
        <rect x="64" y="28" width="674" height="394" rx="18" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />

        <!-- ===================== MAIN DASHBOARD ===================== -->
        <rect x="76" y="42" width="650" height="370" rx="14" fill="url(#paper)" filter="url(#shadow)" />

        <g clip-path="url(#dashboardClip)">
          <!-- HEADER -->
          <rect x="89" y="52" width="29" height="29" rx="6" fill="#eaf3ff" />
          <g transform="translate(103.5 66.5) scale(1.45) translate(-103.5 -66.5)"><path d="M103.5 61.1l4.6 1.8v3.2c0 3.2-2 5.4-4.6 6.4-2.6-1-4.6-3.2-4.6-6.4v-3.2z" fill="#1f6fd0"/><path d="M101.5 66.7l1.4 1.4 2.8-2.8" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></g>
          <text x="126" y="66" class="title" font-size="14.4">Tax &amp; Compliance</text>
          <text x="126" y="77.5" class="muted" font-size="6.4">Stay compliant, reduce risk and plan your tax outgo</text>

          <rect x="519" y="48" width="85" height="20" rx="5" fill="#fff" stroke="#e7edf2" />
          <text x="557" y="60.2" text-anchor="middle" font-size="5.55" font-weight="600" fill="#33495d">As on 12 Jun 2026</text>
          <path d="M594 57.5l1.8 1.8 1.8-1.8" fill="none" stroke="#83909d" stroke-width=".8" />
          <rect x="428" y="72" width="176" height="15" rx="4" fill="#f1f5fb" stroke="#c9d6e6" stroke-dasharray="1.6 1.2" stroke-width=".6" />
          <text x="516" y="81.5" text-anchor="middle" class="tiny">Illustrative dashboard with sample data, not client results</text>

          <!-- ================= STATUTORY FILINGS STATUS ================= -->
          <rect x="90" y="91" width="298" height="149" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="98" y="107" class="title" font-size="7.4">Statutory filings status</text>
          <rect x="97" y="114" width="283" height="13" rx="2" fill="#f2f6fb"/>
          <g class="th" style="font-size:5.4px"><text x="100" y="122.6" style="font-size:5.4px">Filing</text><text x="221" y="122.6" style="font-size:5.4px">Frequency</text><text x="268" y="122.6" style="font-size:5.4px">Due date</text><text x="323" y="122.6" style="font-size:5.4px">Status</text></g>
          <g class="td"><text x="100" y="137.0" style="font-size:5.7px">GSTR-1 (May 2026)</text><text x="221" y="137.0" style="font-size:5.7px">Monthly</text><text x="268" y="137.0" style="font-size:5.7px">11 Jun 2026</text></g>
          <circle cx="326" cy="135.1" r="2.8" fill="#1d9e5f"/><path d="M324.5 135.1l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="332" y="137.0" font-size="5.8" font-weight="700" fill="#1d9e5f">Filed</text>
          <line x1="97" y1="142.3" x2="380" y2="142.3" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="100" y="151.4" style="font-size:5.7px">GSTR-3B (Apr 2026)</text><text x="221" y="151.4" style="font-size:5.7px">Monthly</text><text x="268" y="151.4" style="font-size:5.7px">20 May 2026</text></g>
          <circle cx="326" cy="149.5" r="2.8" fill="#1d9e5f"/><path d="M324.5 149.5l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="332" y="151.4" font-size="5.8" font-weight="700" fill="#1d9e5f">Filed</text>
          <line x1="97" y1="156.7" x2="380" y2="156.7" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="100" y="165.8" style="font-size:5.7px">TDS return Q4 FY26 (24Q/26Q)</text><text x="221" y="165.8" style="font-size:5.7px">Quarterly</text><text x="268" y="165.8" style="font-size:5.7px">31 May 2026</text></g>
          <circle cx="326" cy="163.9" r="2.8" fill="#1d9e5f"/><path d="M324.5 163.9l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="332" y="165.8" font-size="5.8" font-weight="700" fill="#1d9e5f">Filed</text>
          <line x1="97" y1="171.1" x2="380" y2="171.1" stroke="#edf1f4" stroke-width=".7"/>
          <g class="td"><text x="100" y="180.2" style="font-size:5.7px">Advance tax, 1st instalment</text><text x="221" y="180.2" style="font-size:5.7px">Quarterly</text><text x="268" y="180.2" style="font-size:5.7px">15 Jun 2026</text></g>
          <circle cx="326" cy="178.29999999999998" r="3.2" fill="#8a97a6"/><path d="M326 176.49999999999997V178.29999999999998l1.2.9" fill="none" stroke="#fff" stroke-width=".7" stroke-linecap="round"/>
          <text x="332" y="180.2" font-size="5.8" font-weight="700" fill="#6f7f90">Upcoming</text>
          <line x1="97" y1="185.5" x2="380" y2="185.5" stroke="#edf1f4" stroke-width=".7"/>
          <text x="98" y="197" class="micro" font-size="4.7">Due dates: CGST Rules 59 and 61. Q4 FY26 TDS under Income-tax Rules, 1962 (Rules 30, 31A); from 1</text>
          <text x="98" y="205" class="micro" font-size="4.7">Apr 2026 the Income-tax Act, 2025 applies. Check for any notified extension.</text>
          <!-- ================= UPCOMING COMPLIANCE DEADLINES ================= -->
          <rect x="397" y="91" width="314" height="149" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="404" y="107" class="title" font-size="7.4">Upcoming compliance deadlines</text>
          <text x="702" y="107" text-anchor="end" class="micro">as on 12 Jun 2026</text>
          <rect x="405" y="117.0" width="23" height="21" rx="4" fill="#eaf2fd"/>
          <text x="416.5" y="126.6" text-anchor="middle" font-size="7.6" font-weight="700" fill="#1f6fd0">15</text>
          <text x="416.5" y="134.0" text-anchor="middle" font-size="4.8" font-weight="500" fill="#1f6fd0">Jun</text>
          <text x="434" y="125.4" font-size="5.9" font-weight="700" fill="#173957">Advance tax – 1st instalment</text>
          <text x="434" y="133.6" class="micro" font-size="5">Tax Year 2026-27</text>
          <rect x="672" y="123.2" width="30" height="8.6" rx="2" fill="#fde7e7"/><text x="687.0" y="129.19" text-anchor="middle" font-size="4.7" font-weight="700" fill="#d93c3c">3 days left</text>
          <line x1="405" y1="141.7" x2="702" y2="141.7" stroke="#edf1f4" stroke-width=".7"/>
          <rect x="405" y="145.4" width="23" height="21" rx="4" fill="#eaf2fd"/>
          <text x="416.5" y="155.0" text-anchor="middle" font-size="7.6" font-weight="700" fill="#1f6fd0">20</text>
          <text x="416.5" y="162.4" text-anchor="middle" font-size="4.8" font-weight="500" fill="#1f6fd0">Jun</text>
          <text x="434" y="153.8" font-size="5.9" font-weight="700" fill="#173957">GSTR-3B (May 2026)</text>
          <text x="434" y="162.0" class="micro" font-size="5">Return &amp; payment</text>
          <rect x="672" y="151.6" width="30" height="8.6" rx="2" fill="#fff0d9"/><text x="687.0" y="157.59" text-anchor="middle" font-size="4.7" font-weight="700" fill="#d88a17">8 days left</text>
          <line x1="405" y1="170.1" x2="702" y2="170.1" stroke="#edf1f4" stroke-width=".7"/>
          <rect x="405" y="173.8" width="23" height="21" rx="4" fill="#eaf2fd"/>
          <text x="416.5" y="183.4" text-anchor="middle" font-size="7.6" font-weight="700" fill="#1f6fd0">7</text>
          <text x="416.5" y="190.8" text-anchor="middle" font-size="4.8" font-weight="500" fill="#1f6fd0">Jul</text>
          <text x="434" y="182.2" font-size="5.9" font-weight="700" fill="#173957">TDS deposit (Jun 2026)</text>
          <text x="434" y="190.4" class="micro" font-size="5">Challan</text>
          <rect x="670" y="180.0" width="32" height="8.6" rx="2" fill="#e4efff"/><text x="686.0" y="185.99" text-anchor="middle" font-size="4.7" font-weight="700" fill="#1f6fd0">25 days left</text>
          <line x1="405" y1="198.5" x2="702" y2="198.5" stroke="#edf1f4" stroke-width=".7"/>
          <rect x="405" y="202.2" width="23" height="21" rx="4" fill="#eaf2fd"/>
          <text x="416.5" y="211.8" text-anchor="middle" font-size="7.6" font-weight="700" fill="#1f6fd0">11</text>
          <text x="416.5" y="219.2" text-anchor="middle" font-size="4.8" font-weight="500" fill="#1f6fd0">Jul</text>
          <text x="434" y="210.6" font-size="5.9" font-weight="700" fill="#173957">GSTR-1 (Jun 2026)</text>
          <text x="434" y="218.8" class="micro" font-size="5">Outward supplies</text>
          <rect x="670" y="208.39999999999998" width="32" height="8.6" rx="2" fill="#e4efff"/><text x="686.0" y="214.39" text-anchor="middle" font-size="4.7" font-weight="700" fill="#1f6fd0">29 days left</text>
          <line x1="405" y1="226.9" x2="702" y2="226.9" stroke="#edf1f4" stroke-width=".7"/>
          <!-- ================= TAX PLANNING ================= -->
          <rect x="174" y="248" width="164" height="150" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="182" y="263" class="title" font-size="7.2">Tax planning</text>
          <text x="330" y="263" text-anchor="end" class="micro">FY 2026-27, illustrative</text>
          <text x="182" y="297" font-size="12.2" font-weight="800" fill="#1d9e5f">₹<tspan class="counter" data-target="19.0" data-decimals="1">19.0</tspan> L</text>
          <text x="182" y="308.0" class="micro" font-size="5.1" fill="#6f7f90">potential saving</text>
          <text x="182" y="316.6" class="micro" font-size="5.1" fill="#6f7f90">through eligible</text>
          <text x="182" y="325.2" class="micro" font-size="5.1" fill="#6f7f90">deductions and</text>
          <text x="182" y="333.8" class="micro" font-size="5.1" fill="#6f7f90">structuring</text>
          <line x1="262" y1="339" x2="332" y2="339" stroke="#eef1f4" stroke-width=".7"/>
          <text x="258" y="340.6" text-anchor="end" class="micro">0</text>
          <line x1="262" y1="319.0" x2="332" y2="319.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="258" y="320.6" text-anchor="end" class="micro">0.5</text>
          <line x1="262" y1="299" x2="332" y2="299" stroke="#eef1f4" stroke-width=".7"/>
          <text x="258" y="300.6" text-anchor="end" class="micro">1</text>
          <line x1="262" y1="279.0" x2="332" y2="279.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="258" y="280.6" text-anchor="end" class="micro">1.5</text>
          <g class="bar"><rect x="271" y="289.4" width="16" height="49.6" rx="1.6" fill="#a9cdf2"/></g>
          <text x="279" y="286.4" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">₹1.24 Cr</text>
          <text x="279" y="348" text-anchor="middle" class="micro" font-size="5">Projected</text>
          <g class="bar"><rect x="308" y="297.0" width="16" height="42.0" rx="1.6" fill="#1d9e5f"/></g>
          <text x="316" y="294.0" text-anchor="middle" font-size="4.9" font-weight="800" fill="#173957">₹1.05 Cr</text>
          <text x="316" y="348" text-anchor="middle" class="micro" font-size="5">Planned</text>
          <!-- ================= GST INPUT CREDIT RECONCILIATION ================= -->
          <rect x="347" y="248" width="159" height="150" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="355" y="263" class="title" font-size="7.2">GST input credit reconciliation</text>
          <g transform="rotate(-90 382 299)">
          <circle cx="382" cy="299" r="22" fill="none" stroke="#1d9e5f" class="circleBar" stroke-width="10" stroke-dasharray="135.05 3.18" stroke-dashoffset="0.00"/>
          <circle cx="382" cy="299" r="22" fill="none" stroke="#9cc3ee" class="circleBar" stroke-width="10" stroke-dasharray="1.94 136.29" stroke-dashoffset="-135.05"/>
          <circle cx="382" cy="299" r="22" fill="none" stroke="#d7e2ee" class="circleBar" stroke-width="10" stroke-dasharray="1.24 136.99" stroke-dashoffset="-136.99"/>
          </g>
          <text x="382" y="300" text-anchor="middle" font-size="7" font-weight="700" fill="#173957"><tspan class="counter" data-target="97.7" data-decimals="1">97.7</tspan>%</text>
          <text x="382" y="306.6" text-anchor="middle" class="micro" font-size="5">matched</text>
          <text x="416" y="285" font-size="5.5" font-weight="500" fill="#1b3a57">Matched</text><text x="498" y="285" text-anchor="end" font-size="5.5" font-weight="700" fill="#173957">₹42.8 L</text>
          <text x="416" y="296" font-size="5.5" font-weight="500" fill="#1b3a57">Mismatch</text><text x="498" y="296" text-anchor="end" font-size="5.5" font-weight="700" fill="#173957">₹0.6 L</text>
          <text x="416" y="307" font-size="5.5" font-weight="500" fill="#1b3a57">Under review</text><text x="498" y="307" text-anchor="end" font-size="5.5" font-weight="700" fill="#173957">₹0.4 L</text>
          <text x="416" y="318" class="micro" font-size="4.9">By value, vs GSTR-2B</text>
          <!-- ================= TDS COMPLIANCE ================= -->
          <rect x="514" y="248" width="118" height="150" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="522" y="263" class="title" font-size="7.2">TDS compliance</text>
          <text x="623" y="263" text-anchor="end" class="micro">₹ L</text>
          <circle cx="524" cy="275" r="2" fill="#1f63d6"/><text x="528" y="276.7" class="micro" font-size="5" fill="#5f7285">Deducted</text>
          <circle cx="564" cy="275" r="2" fill="#5b9be8"/><text x="568" y="276.7" class="micro" font-size="5" fill="#5f7285">Deposited on time</text>
          <line x1="540" y1="347.0" x2="624" y2="347.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="536" y="348.6" text-anchor="end" class="micro">0</text>
          <line x1="540" y1="317.0" x2="624" y2="317.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="536" y="318.6" text-anchor="end" class="micro">4</text>
          <line x1="540" y1="287.0" x2="624" y2="287.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="536" y="288.6" text-anchor="end" class="micro">8</text>
          <g class="bar"><rect x="541" y="300.5" width="5.2" height="46.5" rx="1" fill="#1f63d6"/><rect x="547.8" y="300.5" width="5.2" height="46.5" rx="1" fill="#5b9be8"/><rect x="558.3" y="302.0" width="5.2" height="45.0" rx="1" fill="#1f63d6"/><rect x="565.0999999999999" y="302.0" width="5.2" height="45.0" rx="1" fill="#5b9be8"/><rect x="575.6" y="293.8" width="5.2" height="53.2" rx="1" fill="#1f63d6"/><rect x="582.4" y="293.8" width="5.2" height="53.2" rx="1" fill="#5b9be8"/><rect x="592.9" y="299.0" width="5.2" height="48.0" rx="1" fill="#1f63d6"/><rect x="599.6999999999999" y="299.0" width="5.2" height="48.0" rx="1" fill="#5b9be8"/><rect x="610.2" y="297.5" width="5.2" height="49.5" rx="1" fill="#1f63d6"/><rect x="617.0" y="297.5" width="5.2" height="49.5" rx="1" fill="#5b9be8"/></g>
          <text x="547" y="357" text-anchor="middle" class="micro" font-size="5">Jan</text>
          <text x="564.3" y="357" text-anchor="middle" class="micro" font-size="5">Feb</text>
          <text x="581.6" y="357" text-anchor="middle" class="micro" font-size="5">Mar</text>
          <text x="598.9" y="357" text-anchor="middle" class="micro" font-size="5">Apr</text>
          <text x="616.2" y="357" text-anchor="middle" class="micro" font-size="5">May</text>
        </g>

        <!-- ================= FLOATING CARDS — OUTSIDE CLIP ON PURPOSE ================= -->
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="621" y="12" width="165" height="75" rx="11" fill="#f2fbf6"/>
        <circle cx="644" cy="35" r="12.5" fill="#dff3e8"/>
        <path d="M644 29.6l4.6 1.8v3.2c0 3.2-2 5.4-4.6 6.4-2.6-1-4.6-3.2-4.6-6.4v-3.2z" fill="#1d9e5f"/><path d="M642 35.2l1.4 1.4 2.8-2.8" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="664" y="28" font-size="6.2" font-weight="700" fill="#173957">Compliance health</text>
        <text x="664" y="46" font-size="16" font-weight="800" fill="#1d9e5f">Low risk</text>
        <text x="664" y="56.5" font-size="5.1" fill="#4d6275">No overdue filings or pending</text>
        <text x="664" y="65.5" font-size="5.1" fill="#4d6275">notices. ₹1.0 L of ITC under follow-</text>
        <text x="664" y="74.5" font-size="5.1" fill="#4d6275">up.</text>
        </g>
        <g class="floatB" filter="url(#smallShadow)">
        <rect x="12" y="361" width="149" height="65" rx="11" fill="#f1f6fe"/>
        <circle cx="35" cy="383" r="12.5" fill="#e1ecfb"/>
        <path d="M31.6 378.4h4.4l2.4 2.4v6.8h-6.8z" fill="#1f6fd0"/><path d="M33.2 383h3.6M33.2 384.8h3.6" stroke="#fff" stroke-width=".6"/>
        <text x="55" y="376" font-size="6.2" font-weight="700" fill="#173957">GST reconciliation</text>
        <text x="55" y="396" font-size="16.5" font-weight="800" fill="#1f6fd0"><tspan class="counter" data-target="97.7" data-decimals="1">97.7</tspan>%</text>
        <text x="55" y="406.5" font-size="5.1" fill="#4d6275">of input tax credit value</text>
        <text x="55" y="415.5" font-size="5.1" fill="#4d6275">matched with GSTR-2B.</text>
        </g>
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="643" y="352" width="145" height="74" rx="11" fill="#fff8ec"/>
        <circle cx="666" cy="374" r="12.5" fill="#fdeccf"/>
        <circle cx="666" cy="374" r="5" fill="none" stroke="#e68a1a" stroke-width="1.1"/><circle cx="666" cy="374" r="2.7" fill="none" stroke="#e68a1a" stroke-width="1.1"/><circle cx="666" cy="374" r=".9" fill="#e68a1a"/>
        <text x="686" y="367" font-size="6.2" font-weight="700" fill="#173957">Tax planning insight</text>
        <text x="686" y="387" font-size="16" font-weight="800" fill="#e68a1a">₹<tspan class="counter" data-target="19.0" data-decimals="1">19.0</tspan> L</text>
        <text x="686" y="397.5" font-size="5.1" fill="#4d6275">potential saving: ₹1.24 Cr</text>
        <text x="686" y="406.5" font-size="5.1" fill="#4d6275">projected outgo reduced to</text>
        <text x="686" y="415.5" font-size="5.1" fill="#4d6275">₹1.05 Cr.</text>
        </g>

      </svg>
    </div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body>
</html>
`,
  funding: String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>CFO CRAFT — Capital & Funding Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body { font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .stage { width: 800px; max-width: 100vw; margin: 0 auto; }
      svg { display: block; width: 100%; height: auto; overflow: hidden; }
      text { text-rendering: geometricPrecision; font-family: Poppins, Inter, Arial, Helvetica, sans-serif; }
      .title { font-weight: 700; fill: #10233f; }
      .semi { font-weight: 700; fill: #183a58; }
      .muted { font-weight: 500; fill: #5f7285; }
      .lab { fill: #1b3a57; }
      .micro { font-size: 4.8px; font-weight: 400; fill: #7a8896; }
      .tiny { font-size: 4.35px; font-weight: 400; fill: #7a8896; }
      .th text { font-size: 5.1px; font-weight: 500; fill: #5f7285; }
      .td text { font-size: 5.4px; font-weight: 500; fill: #1b3a57; }
      .counter { font-variant-numeric: tabular-nums; }
      .bar { transform-box: fill-box; transform-origin: bottom; }
      .barN { transform-box: fill-box; transform-origin: top; }
      @media (prefers-reduced-motion: reduce) {
        .bar, .barN, .spark, .floatA, .floatB { animation: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-label="CFO CRAFT capital and funding dashboard">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#073f91" />
            <stop offset=".50" stop-color="#063778" />
            <stop offset="1" stop-color="#082e65" />
          </linearGradient>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="1" stop-color="#f9fbfd" />
          </linearGradient>
          <radialGradient id="orb" cx=".35" cy=".3" r=".8">
            <stop offset="0" stop-color="#2f78d8" stop-opacity=".75" />
            <stop offset="1" stop-color="#0a3f8f" stop-opacity=".15" />
          </radialGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#7fb4ff" stop-opacity=".7" />
            <stop offset=".6" stop-color="#e3b25a" stop-opacity=".85" />
            <stop offset="1" stop-color="#e3b25a" stop-opacity="0" />
          </linearGradient>
          <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#8fbaf0" fill-opacity=".45" />
          </pattern>
          <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#8fbaf0" stroke-opacity=".12" stroke-width=".7" />
          </pattern>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#03265c" flood-opacity=".26" />
          </filter>
          <filter id="smallShadow" x="-20%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0a315b" flood-opacity=".18" />
          </filter>
          <clipPath id="dashboardClip">
            <rect x="76" y="42" width="650" height="370" rx="14" />
          </clipPath>
        </defs>

        <!-- ===================== BACKGROUND ===================== -->
        <rect width="800" height="450" rx="23" fill="url(#bg)" />
        <circle cx="10" cy="400" r="95" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />
        <circle cx="0" cy="400" r="80" fill="url(#orb)" opacity=".55" />
        <circle cx="800" cy="330" r="80" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />
        <circle cx="810" cy="340" r="68" fill="url(#orb)" opacity=".6" />
        <g stroke="#a8d0ff" stroke-opacity=".2"><path d="M0 130L90 40M0 180L60 120" /><path d="M740 40L800 -10" /></g>
        <rect x="30" y="68" width="30" height="54" fill="url(#dots)" />
        <rect x="755" y="178" width="36" height="36" fill="url(#dots)" />
        <rect x="64" y="28" width="674" height="394" rx="18" fill="none" stroke="#7fb4ff" stroke-opacity=".35" />

        <!-- ===================== MAIN DASHBOARD ===================== -->
        <rect x="76" y="42" width="650" height="370" rx="14" fill="url(#paper)" filter="url(#shadow)" />

        <g clip-path="url(#dashboardClip)">
          <!-- HEADER -->
          <rect x="89" y="52" width="29" height="29" rx="6" fill="#eaf3ff" />
          <g transform="translate(103.5 66.5) scale(1.45) translate(-103.5 -66.5)"><g fill="#1f6fd0"><path d="M103.5 61.3l5.4 2.8H98.1z"/><rect x="99.1" y="65.1" width="1.5" height="4.6"/><rect x="102.75" y="65.1" width="1.5" height="4.6"/><rect x="106.4" y="65.1" width="1.5" height="4.6"/><rect x="98.1" y="70.3" width="10.8" height="1.4"/></g></g>
          <text x="126" y="66" class="title" font-size="14.4">Capital &amp; Funding</text>
          <text x="126" y="77.5" class="muted" font-size="6.4">Plan, structure and secure the right capital for your next phase of growth</text>

          <rect x="497" y="48" width="107" height="20" rx="5" fill="#fff" stroke="#e7edf2" />
          <text x="504" y="60"  font-size="5.55" font-weight="600" fill="#33495d">Q1 FY27 (Apr–Jun 2026)</text>
          <path d="M594 57.5l1.8 1.8 1.8-1.8" fill="none" stroke="#83909d" stroke-width=".8" />
          <rect x="428" y="72" width="176" height="15" rx="4" fill="#f1f5fb" />
          <text x="516" y="81.5" text-anchor="middle" class="tiny">Illustrative dashboard with sample data, not client results</text>

          <!-- ================= KPI ROW ================= -->
          <rect x="91" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="97" y="99" width="23" height="23" rx="6" fill="#eaf3ff"/>
<g fill="#1f6fd0"><ellipse cx="108.5" cy="106.9" rx="4.4" ry="1.7"/><path d="M104.1 108.1c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/><path d="M104.1 111.7c0 1 2 1.8 4.4 1.8s4.4-.8 4.4-1.8v2.2c0 1-2 1.8-4.4 1.8s-4.4-.8-4.4-1.8z"/></g>
<text x="127" y="107" class="muted lab" font-size="6.05">Funding requirement</text>
<text x="127" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="4.5" data-decimals="1">4.5</tspan> Cr</text>
<text x="127" y="135.6" font-size="5.25" font-weight="700" fill="#4d6275">Next 12 months</text>
<text x="127" y="144" class="micro">Capex ₹2.5 Cr + expansion ₹2.0 Cr</text>

          <rect x="247" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="253" y="99" width="23" height="23" rx="6" fill="#fff3df"/>
<text x="264.5" y="113.9" text-anchor="middle" font-size="9.6" font-weight="600" fill="#eaa044">₹</text>
<text x="283" y="107" class="muted lab" font-size="6.05">Current debt</text>
<text x="283" y="123" class="title" font-size="14.2">₹<tspan class="counter" data-target="6.5" data-decimals="1">6.5</tspan> Cr</text>
<text x="283" y="135.6" font-size="5.25" font-weight="700" fill="#4d6275">OD ₹4.5 Cr + TL ₹2.0 Cr</text>
<text x="283" y="144" class="micro">As on 30 Jun 2026</text>

          <rect x="403" y="93" width="151" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="409" y="99" width="23" height="23" rx="6" fill="#e7f7ef"/>
<text x="420.5" y="113.8" text-anchor="middle" font-size="9.4" font-weight="800" fill="#2e9e6e">%</text>
<text x="439" y="107" class="muted lab" font-size="6.05">Blended interest cost</text>
<text x="439" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="11.8" data-decimals="1">11.8</tspan>%</text>
<text x="439" y="135.6" font-size="5.25" font-weight="700" fill="#4d6275">₹76.7 L a year</text>
<text x="439" y="144" class="micro">OD 12.0%, TL 11.35%</text>

          <rect x="559" y="93" width="153" height="58" rx="8" fill="#fff" stroke="#e4eaf0"/>
<rect x="565" y="99" width="23" height="23" rx="6" fill="#eaf3ff"/>
<g fill="#1f6fd0"><rect x="572.1" y="110.9" width="2.3" height="3.6" rx=".5"/><rect x="575.35" y="108.6" width="2.3" height="5.9" rx=".5"/><rect x="578.6" y="106.1" width="2.3" height="8.4" rx=".5"/></g>
<text x="595" y="107" class="muted lab" font-size="6.05">DSCR</text>
<text x="595" y="123" class="title" font-size="14.2"><tspan class="counter" data-target="1.71" data-decimals="2">1.71</tspan>x</text>
<text x="595" y="135.6" font-size="5.25" font-weight="700" fill="#299d73">Comfortable cover</text>
<text x="595" y="144" class="micro">On current debt service</text>

          <!-- ================= CURRENT VS PROPOSED FUNDING ================= -->
          <rect x="90" y="158" width="318" height="141" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="98" y="173" class="title" font-size="8.05">Current vs proposed funding structure</text>
          <text x="401" y="173" text-anchor="end" class="micro">12-month view</text>
          <rect x="98" y="182.5" width="29" height="9.5" rx="2.5" fill="#eef2f7"/><text x="112.5" y="189" text-anchor="middle" font-size="4.8" font-weight="600" fill="#5f7285">Current</text>
          <text x="98" y="203.0" font-size="5.3" font-weight="500" fill="#1b3a57">WC overdraft</text>
          <rect x="161" y="198.6" width="51" height="5.4" rx="2.7" fill="#eef3f9"/>
          <rect class="hBar" x="161" y="198.6" width="46.8" height="5.4" rx="2.7" fill="#0d1f4a"/>
          <text x="244" y="203.0" text-anchor="end" font-size="5.4" font-weight="700" fill="#173957">₹4.5 Cr</text>
          <text x="98" y="216.6" font-size="5.3" font-weight="500" fill="#1b3a57">Term loans</text>
          <rect x="161" y="212.2" width="51" height="5.4" rx="2.7" fill="#eef3f9"/>
          <rect class="hBar" x="161" y="212.2" width="20.8" height="5.4" rx="2.7" fill="#4f93e0"/>
          <text x="244" y="216.6" text-anchor="end" font-size="5.4" font-weight="700" fill="#173957">₹2.0 Cr</text>
          <text x="98" y="230.2" font-size="5.3" font-weight="500" fill="#1b3a57">New equity</text>
          <rect x="161" y="225.79999999999998" width="51" height="5.4" rx="2.7" fill="#eef3f9"/>
          <text x="244" y="230.2" text-anchor="end" font-size="5.4" font-weight="700" fill="#173957">₹0.0 Cr</text>
          <rect x="98" y="238" width="146" height="29" rx="5" fill="#f3f7fc"/>
          <text x="103" y="247" class="micro">Total funding</text>
          <text x="103" y="260" class="title" font-size="9">₹<tspan class="counter" data-target="6.5" data-decimals="1">6.5</tspan> Cr</text>
          <rect x="255" y="182.5" width="34" height="9.5" rx="2.5" fill="#e4efff"/><text x="272.0" y="189" text-anchor="middle" font-size="4.8" font-weight="600" fill="#1f6fd0">Proposed</text>
          <text x="255" y="203.0" font-size="5.3" font-weight="500" fill="#1b3a57">WC overdraft</text>
          <rect x="318" y="198.6" width="51" height="5.4" rx="2.7" fill="#eef3f9"/>
          <rect class="hBar" x="318" y="198.6" width="31.2" height="5.4" rx="2.7" fill="#0d1f4a"/>
          <text x="401" y="203.0" text-anchor="end" font-size="5.4" font-weight="700" fill="#173957">₹3.0 Cr</text>
          <text x="255" y="216.6" font-size="5.3" font-weight="500" fill="#1b3a57">Term loans</text>
          <rect x="318" y="212.2" width="51" height="5.4" rx="2.7" fill="#eef3f9"/>
          <rect class="hBar" x="318" y="212.2" width="46.8" height="5.4" rx="2.7" fill="#4f93e0"/>
          <text x="401" y="216.6" text-anchor="end" font-size="5.4" font-weight="700" fill="#173957">₹4.5 Cr</text>
          <text x="255" y="230.2" font-size="5.3" font-weight="500" fill="#1b3a57">New equity</text>
          <rect x="318" y="225.79999999999998" width="51" height="5.4" rx="2.7" fill="#eef3f9"/>
          <rect class="hBar" x="318" y="225.79999999999998" width="20.8" height="5.4" rx="2.7" fill="#9cc3ee"/>
          <text x="401" y="230.2" text-anchor="end" font-size="5.4" font-weight="700" fill="#173957">₹2.0 Cr</text>
          <rect x="255" y="238" width="146" height="29" rx="5" fill="#f3f7fc"/>
          <text x="260" y="247" class="micro">Total funding</text>
          <text x="260" y="260" class="title" font-size="9">₹<tspan class="counter" data-target="9.5" data-decimals="1">9.5</tspan> Cr</text>
          <text x="98" y="277" class="micro" font-size="4.6">₹6.5 Cr + ₹4.5 Cr new funding (TL ₹2.5 Cr, equity ₹2.0 Cr) − ₹1.5 Cr OD repaid from working-capital release</text>
          <text x="98" y="285.5" class="micro" font-size="4.6">= ₹9.5 Cr.</text>
          <!-- ================= INTEREST COST ================= -->
          <rect x="417" y="158" width="293" height="141" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="425" y="173" class="title" font-size="8.05">Interest cost</text>
          <text x="702" y="173" text-anchor="end" class="micro">₹ L a year</text>
          <line x1="444" y1="266.0" x2="585" y2="266.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="439" y="267.6" text-anchor="end" class="micro">0</text>
          <line x1="444" y1="246.5" x2="585" y2="246.5" stroke="#eef1f4" stroke-width=".7"/>
          <text x="439" y="248.1" text-anchor="end" class="micro">30</text>
          <line x1="444" y1="227.0" x2="585" y2="227.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="439" y="228.6" text-anchor="end" class="micro">60</text>
          <line x1="444" y1="207.5" x2="585" y2="207.5" stroke="#eef1f4" stroke-width=".7"/>
          <text x="439" y="209.1" text-anchor="end" class="micro">90</text>
          <line x1="444" y1="188.0" x2="585" y2="188.0" stroke="#eef1f4" stroke-width=".7"/>
          <text x="439" y="189.6" text-anchor="end" class="micro">120</text>
          <g class="bar"><rect x="457.5" y="216.1" width="15" height="49.9" rx="1.6" fill="#0d1f4a"/></g>
          <text x="465" y="213.1" text-anchor="middle" font-size="4.7" font-weight="800" fill="#173957">₹76.7 L</text>
          <text x="465" y="275" text-anchor="middle" class="micro">Current</text>
          <g class="bar"><rect x="505.5" y="198.3" width="15" height="67.7" rx="1.6" fill="#a9cdf2"/></g>
          <text x="513" y="195.3" text-anchor="middle" font-size="4.7" font-weight="800" fill="#173957">₹104.2 L</text>
          <text x="513" y="275" text-anchor="middle" class="micro">No WC release</text>
          <g class="bar"><rect x="553.5" y="210.0" width="15" height="56.0" rx="1.6" fill="#5b9be8"/></g>
          <text x="561" y="207.0" text-anchor="middle" font-size="4.7" font-weight="800" fill="#173957">₹86.2 L</text>
          <text x="561" y="275" text-anchor="middle" class="micro">With WC release</text>
          <text x="425" y="291" class="micro" font-size="4.4">New ₹2.5 Cr term loan at 11.0%; existing TL at 11.35%, OD at 12.0%.</text>
          <rect x="595" y="219" width="86" height="59" rx="6" fill="#eaf8f1"/>
          <text x="600" y="228" class="micro">Interest avoided</text>
          <text x="600" y="243" font-size="11" font-weight="800" fill="#1d9e5f">₹<tspan class="counter" data-target="18.0" data-decimals="1">18.0</tspan> L</text>
          <text x="600" y="254.0" class="micro" font-size="4.6">₹1.5 Cr OD repaid at 12.0%</text>
          <text x="600" y="262.6" class="micro" font-size="4.6">from released working</text>
          <text x="600" y="271.2" class="micro" font-size="4.6">capital</text>
          <!-- ================= FUNDING ALLOCATION ================= -->
          <rect x="174" y="308" width="234" height="93" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="182" y="322" class="title" font-size="8.05">Funding allocation</text>
          <g transform="rotate(-90 214 362)">
          <circle class="circleBar" cx="214" cy="362" r="24.8" fill="none" stroke="#0d1f4a" stroke-width="12" stroke-dasharray="86.04 69.79" stroke-dashoffset="0.00"/>
          <circle class="circleBar" cx="214" cy="362" r="24.8" fill="none" stroke="#5b9be8" stroke-width="12" stroke-dasharray="68.59 87.24" stroke-dashoffset="-86.64"/>
          </g>
          <text x="214" y="363.5" text-anchor="middle" class="title" font-size="7.6">₹<tspan class="counter" data-target="4.5" data-decimals="1">4.5</tspan> Cr</text>
          <text x="214" y="370.5" text-anchor="middle" class="micro">Total</text>
          <circle cx="255.5" cy="349" r="2.2" fill="#0d1f4a"/><text x="261" y="351" font-size="5.3" font-weight="500" fill="#1b3a57">Plant C modernisation (capex) <tspan font-weight="700" fill="#173957">₹2.5 Cr (56%)</tspan></text>
          <circle cx="255.5" cy="362.5" r="2.2" fill="#5b9be8"/><text x="261" y="364.5" font-size="5.3" font-weight="500" fill="#1b3a57">Market expansion <tspan font-weight="700" fill="#173957">₹2.0 Cr (44%)</tspan></text>
          <text x="253" y="376.5" class="micro">Sources: new term loan ₹2.5 Cr, equity ₹2.0 Cr</text>
          <!-- ================= BANK READINESS CHECKLIST ================= -->
          <rect x="417" y="308" width="214" height="93" rx="8" fill="#fff" stroke="#e4eaf0"/>
          <text x="425" y="322" class="title" font-size="8.05">Bank readiness checklist</text>
          <circle cx="429" cy="337.0" r="3.2" fill="#1d9e5f"/><path d="M427.5 337.0l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="437" y="338.9" font-size="5.4" font-weight="500" fill="#1b3a57">CMA data</text>
          <rect x="588" y="332.4" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="605.5" y="338.76" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="429" cy="351.6" r="3.2" fill="#1d9e5f"/><path d="M427.5 351.6l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="437" y="353.5" font-size="5.4" font-weight="500" fill="#1b3a57">Projected financials</text>
          <rect x="588" y="347.0" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="605.5" y="353.36" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="429" cy="366.2" r="3.2" fill="#1d9e5f"/><path d="M427.5 366.2l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="437" y="368.1" font-size="5.4" font-weight="500" fill="#1b3a57">Stock and book-debt statements</text>
          <rect x="588" y="361.59999999999997" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="605.5" y="367.96" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
          <circle cx="429" cy="380.8" r="3.2" fill="#1d9e5f"/><path d="M427.5 380.8l1.1 1.1 2-2.1" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="437" y="382.7" font-size="5.4" font-weight="500" fill="#1b3a57">Sanction terms review</text>
          <rect x="588" y="376.2" width="35" height="9.2" rx="2" fill="#e2f6ea"/><text x="605.5" y="382.56" text-anchor="middle" font-size="4.9" font-weight="700" fill="#1f9a5f">Complete</text>
        </g>

        <!-- ================= FLOATING CARDS — OUTSIDE CLIP ON PURPOSE ================= -->
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="621" y="12" width="165" height="66" rx="11" fill="#f2fbf6"/>
        <circle cx="644" cy="35" r="12.5" fill="#dff3e8"/>
        <path d="M644 29.2a3.9 3.9 0 0 0-2.3 7.1v1.6h4.6v-1.6a3.9 3.9 0 0 0-2.3-7.1zM642.3 39.1h3.4v1.2h-3.4z" fill="#1d9e5f"/>
        <text x="664" y="28" font-size="6.2" font-weight="700" fill="#173957">CFO insight</text>
        <text x="664" y="46" font-size="16" font-weight="800" fill="#1d9e5f">₹<tspan class="counter" data-target="18.0" data-decimals="1">18.0</tspan> L a year</text>
        <text x="664" y="57" font-size="5.1" fill="#4d6275">interest avoided by repaying ₹1.5 Cr</text>
        <text x="664" y="66" font-size="5.1" fill="#4d6275">of OD from working-capital release.</text>
        </g>
        <g class="floatB" filter="url(#smallShadow)">
        <rect x="13" y="361" width="149" height="66" rx="11" fill="#fff8ec"/>
        <circle cx="36" cy="383" r="12.5" fill="#fdeccf"/>
        <circle cx="36" cy="383" r="5" fill="none" stroke="#e68a1a" stroke-width="1.1"/><circle cx="36" cy="383" r="2.7" fill="none" stroke="#e68a1a" stroke-width="1.1"/><circle cx="36" cy="383" r=".9" fill="#e68a1a"/>
        <text x="56" y="376" font-size="6.2" font-weight="700" fill="#173957">Funding requirement</text>
        <text x="56" y="396" font-size="16.5" font-weight="800" fill="#e68a1a">₹<tspan class="counter" data-target="4.5" data-decimals="1">4.5</tspan> Cr</text>
        <text x="56" y="406.5" font-size="5.1" fill="#4d6275">for Plant C capex and market</text>
        <text x="56" y="415.5" font-size="5.1" fill="#4d6275">expansion over 12 months.</text>
        </g>
        <g class="floatA" filter="url(#smallShadow)">
        <rect x="643" y="361" width="145" height="66" rx="11" fill="#f1f6fe"/>
        <circle cx="666" cy="383" r="12.5" fill="#e1ecfb"/>
        <g fill="#1f6fd0"><path d="M666 377.8l5.4 2.8H660.6z"/><rect x="661.6" y="381.6" width="1.5" height="4.6"/><rect x="665.25" y="381.6" width="1.5" height="4.6"/><rect x="668.9" y="381.6" width="1.5" height="4.6"/><rect x="660.6" y="386.8" width="10.8" height="1.4"/></g>
        <text x="686" y="376" font-size="6.2" font-weight="700" fill="#173957">Bank readiness</text>
        <text x="686" y="396" font-size="16.5" font-weight="800" fill="#1f6fd0"><tspan class="counter" data-target="4" data-decimals="0">4</tspan> of 4</text>
        <text x="686" y="406.5" font-size="5.1" fill="#4d6275">documents ready for bank</text>
        <text x="686" y="415.5" font-size="5.1" fill="#4d6275">discussions.</text>
        </g>

      </svg>
    </div>
    <script>
      /*
        CFO CRAFT dashboard animation (shared by every dashboard file).
        Cycle: grow -> hold at real values -> ease back -> short rest -> repeat.
        - Markup always holds the FINAL values, so no-JS and reduced-motion users see correct data.
        - Donuts (.circleBar) sweep clockwise from 12 o'clock, segment after segment,
          keeping the original gaps and proportions from the markup.
        - Restarts from zero each time the dashboard scrolls into view; pauses when off-screen.
      */
      (function () {
        const RISE = 1600, HOLD = 3600, FALL = 1000, REST = 500;
        const CYCLE = RISE + HOLD + FALL + REST;
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
        const num = (v, d) => parseFloat(v === null || v === undefined || v === "" ? d : v);

        const counters = Array.from(document.querySelectorAll(".counter")).map((el) => ({
          el,
          target: num(el.dataset.target, 0),
          dec: num(el.dataset.decimals, 0)
        }));
        const bars = Array.from(document.querySelectorAll(".bar, .barN"));
        const hBars = Array.from(document.querySelectorAll(".hBar")).map((el) => ({
          el,
          w: num(el.getAttribute("width"), 0)
        }));

        // Group donut segments by their parent ring so each ring sweeps as one circle.
        const rings = new Map();
        document.querySelectorAll(".circleBar").forEach((c) => {
          const C = 2 * Math.PI * num(c.getAttribute("r"), 0);
          const len = num((c.getAttribute("stroke-dasharray") || "0").trim().split(/[\s,]+/)[0], 0);
          const start = -num(c.getAttribute("stroke-dashoffset"), 0);
          if (!rings.has(c.parentNode)) rings.set(c.parentNode, []);
          rings.get(c.parentNode).push({ c, C, len, start });
        });

        // Line charts: <g class="lineChart"> holding one polyline + its dots.
        // The line draws left to right; each dot appears as the line reaches it.
        const lines = Array.from(document.querySelectorAll(".lineChart")).map((g) => {
          const pl = g.querySelector("polyline");
          const xs = pl.getAttribute("points").trim().split(/\s+/).map((pt) => num(pt.split(",")[0], 0));
          const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
          const L = pl.getTotalLength ? pl.getTotalLength() : 1000;
          pl.setAttribute("stroke-dasharray", L.toFixed(2) + " " + L.toFixed(2));
          const dots = Array.from(g.querySelectorAll("circle")).map((c) => ({
            c, at: x1 > x0 ? (num(c.getAttribute("cx"), 0) - x0) / (x1 - x0) : 0
          }));
          return { pl, L, dots };
        });

        function fmt(v, d) {
          const s = Math.abs(v).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
          return (v < 0 && Number(s.replace(/,/g, "")) !== 0 ? "\u2212" : "") + s;
        }

        function progressAt(t) {
          const x = t % CYCLE;
          if (x < RISE) return ease(x / RISE);
          if (x < RISE + HOLD) return 1;
          if (x < RISE + HOLD + FALL) return 1 - ease((x - RISE - HOLD) / FALL);
          return 0;
        }

        function render(p) {
          counters.forEach((k) => { k.el.textContent = fmt(k.target * p, k.dec); });
          bars.forEach((b) => { b.style.transform = "scaleY(" + p + ")"; });
          hBars.forEach((h) => { h.el.setAttribute("width", (h.w * p).toFixed(2)); });
          lines.forEach((ln) => {
            ln.pl.setAttribute("stroke-dashoffset", (ln.L * (1 - p)).toFixed(2));
            ln.dots.forEach((d) => {
              d.c.style.opacity = Math.max(0, Math.min(1, (p - d.at) / 0.06 + 1)).toFixed(2);
            });
          });
          rings.forEach((segs) => {
            const sweep = p * segs[0].C;
            segs.forEach((s) => {
              const visible = Math.max(0, Math.min(s.len, sweep - s.start));
              s.c.setAttribute("stroke-dasharray", visible.toFixed(2) + " " + s.C.toFixed(2));
            });
          });
        }

        let raf = null, t0 = null;
        function frame(now) {
          if (t0 === null) t0 = now;
          render(progressAt(now - t0));
          raf = requestAnimationFrame(frame);
        }
        function play() { if (raf === null) { t0 = null; raf = requestAnimationFrame(frame); } }
        function stop() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

        render(0);
        const target = document.querySelector(".stage") || document.body;
        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? play() : stop()));
          }, { threshold: 0.25 }).observe(target);
        } else {
          play();
        }
      })();
    </script>
</body>
</html>
`,
};

function mountCfoCraftAnimatedDashboards() {
  const hosts = document.querySelectorAll(
    ".feature-dashboard-embed[data-dashboard]",
  );

  hosts.forEach((host) => {
    if (host.dataset.dashboardMounted === "true") return;

    const key = host.dataset.dashboard;
    const dashboardDocument = CFOCRAFT_DASHBOARD_DOCUMENTS[key];
    if (!dashboardDocument) return;

    const frame = document.createElement("iframe");
    frame.className = "feature-dashboard-frame";
    frame.title = host.dataset.dashboardTitle || "Animated CFO CRAFT dashboard";
    frame.loading = "lazy";
    frame.setAttribute("scrolling", "no");
    frame.setAttribute("tabindex", "-1");
    frame.setAttribute("aria-hidden", "true");
    frame.srcdoc = dashboardDocument;

    host.replaceChildren(frame);
    host.dataset.dashboardMounted = "true";
  });
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    mountCfoCraftAnimatedDashboards,
  );
} else {
  mountCfoCraftAnimatedDashboards();
}
