document.addEventListener('DOMContentLoaded', () => {

  /* ==============================
     NAVBAR
  ============================== */

  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ==============================
     REVEAL ON SCROLL
  ============================== */

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ==============================
     PARTICLES (Hero)
  ============================== */

  const heroCanvas = document.getElementById('particles');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resizeHeroCanvas() {
      heroCanvas.width = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = ['#4facfe', '#a855f7', '#22d3ee', '#ec4899'][Math.floor(Math.random() * 4)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > heroCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > heroCanvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function initParticles() {
      resizeHeroCanvas();
      const count = Math.min(Math.floor((heroCanvas.width * heroCanvas.height) / 8000), 60);
      particles = Array.from({ length: count }, () => new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      animFrame = requestAnimationFrame(animateParticles);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeHeroCanvas();
      }, 200);
    }, { passive: true });

    initParticles();
    animateParticles();
  }

  /* ==============================
     DEMO PARTICLES
  ============================== */

  const demoCanvas = document.getElementById('demo-particles');
  if (demoCanvas) {
    const demoCtx = demoCanvas.getContext('2d');
    let demoParticles = [];

    function resizeDemoCanvas() {
      const parent = demoCanvas.parentElement;
      demoCanvas.width = parent.offsetWidth;
      demoCanvas.height = parent.offsetHeight;
    }

    class DemoParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * demoCanvas.width;
        this.y = Math.random() * demoCanvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.hue = Math.random() * 60 + 200;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > demoCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > demoCanvas.height) this.speedY *= -1;
      }

      draw() {
        demoCtx.beginPath();
        demoCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        demoCtx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
        demoCtx.fill();
      }
    }

    function initDemoParticles() {
      resizeDemoCanvas();
      demoParticles = Array.from({ length: 20 }, () => new DemoParticle());
    }

    function animateDemoParticles() {
      demoCtx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);
      demoParticles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateDemoParticles);
    }

    window.addEventListener('resize', resizeDemoCanvas, { passive: true });
    initDemoParticles();
    animateDemoParticles();
  }

  /* ==============================
     PARALLAX ON SCROLL
  ============================== */

  const parallaxElements = document.querySelectorAll('.blob');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach((el, i) => {
      const speed = 0.05 + (i * 0.02);
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  /* ==============================
     COMPARISON TOGGLE
  ============================== */

  const toggleBtn = document.querySelector('.comparison-toggle');
  const comparisonBefore = document.querySelector('.comparison-before');
  const comparisonAfter = document.querySelector('.comparison-after');

  if (toggleBtn && comparisonBefore && comparisonAfter) {
    let isAfterVisible = false;

    toggleBtn.addEventListener('click', () => {
      isAfterVisible = !isAfterVisible;

      if (isAfterVisible) {
        comparisonBefore.style.opacity = '0.3';
        comparisonBefore.style.transform = 'scale(0.95)';
        comparisonAfter.style.opacity = '1';
        comparisonAfter.style.transform = 'scale(1)';
        toggleBtn.textContent = 'Réinitialiser';
      } else {
        comparisonBefore.style.opacity = '1';
        comparisonBefore.style.transform = 'scale(1)';
        comparisonAfter.style.opacity = '0.3';
        comparisonAfter.style.transform = 'scale(0.95)';
        toggleBtn.textContent = 'Animer';
      }
    });

    comparisonAfter.style.opacity = '0.3';
    comparisonAfter.style.transform = 'scale(0.95)';
    comparisonBefore.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    comparisonAfter.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }

  /* ==============================
     PARALLAX DEMO (mouse)
  ============================== */

  const parallaxDemo = document.querySelector('.animation-parallax-target');
  if (parallaxDemo) {
    const layers = parallaxDemo.querySelectorAll('.animation-parallax-layer');

    parallaxDemo.addEventListener('mousemove', (e) => {
      const rect = parallaxDemo.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 0.2;
        layer.style.transform = `translate(${x * 40 * depth}px, ${y * 40 * depth}px)`;
      });
    });

    parallaxDemo.addEventListener('mouseleave', () => {
      layers.forEach(layer => {
        layer.style.transform = 'translate(0, 0)';
        layer.style.transition = 'transform 0.4s ease';
      });
    });
  }

  /* ==============================
     COUNT UP ANIMATION (optional enhancement)
  ============================== */

  const style = document.createElement('style');
  style.textContent = `
    .comparison-before,
    .comparison-after {
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
  `;
  document.head.appendChild(style);
});
