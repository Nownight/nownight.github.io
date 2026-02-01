/**
 * Apple Premium Interactions
 * Smooth scroll reveals, parallax effects, and refined micro-interactions
 * Inspired by apple.com's interaction design
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. SCROLL REVEAL - Smooth Apple-style content entry
  // --------------------------------------------------------------------------

  function initScrollReveal() {
    const revealElements = [
      ...document.querySelectorAll('#recent-posts > .recent-post-item'),
      ...document.querySelectorAll('#aside-content .card-widget'),
      ...document.querySelectorAll('.aside-list-item'),
    ];

    if (!revealElements.length) return;

    // Add reveal class
    revealElements.forEach((el) => {
      el.classList.add('apple-reveal');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay for a staggered feel
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    // Assign staggered delays
    const postItems = document.querySelectorAll(
      '#recent-posts > .recent-post-item'
    );
    postItems.forEach((item, i) => {
      item.dataset.revealDelay = i * 100;
    });

    const sideWidgets = document.querySelectorAll(
      '#aside-content .card-widget'
    );
    sideWidgets.forEach((item, i) => {
      item.dataset.revealDelay = i * 80;
    });

    revealElements.forEach((el) => observer.observe(el));
  }

  // --------------------------------------------------------------------------
  // 2. PARALLAX HERO - Subtle depth effect on header
  // --------------------------------------------------------------------------

  function initParallax() {
    const header = document.getElementById('page-header');
    if (!header || !header.classList.contains('full_page')) return;

    let ticking = false;

    function updateParallax() {
      const scrollY = window.pageYOffset;
      const headerHeight = header.offsetHeight;

      if (scrollY <= headerHeight) {
        const progress = scrollY / headerHeight;

        // Parallax background - moves slower
        header.style.backgroundPositionY = scrollY * 0.4 + 'px';

        // Fade out site info
        const siteInfo = document.getElementById('site-info');
        if (siteInfo) {
          const opacity = Math.max(0, 1 - progress * 1.5);
          const translateY = scrollY * 0.25;
          siteInfo.style.opacity = opacity;
          siteInfo.style.transform = `translateY(${translateY}px)`;
        }

        // Fade out scroll indicator
        const scrollDown = document.getElementById('scroll-down');
        if (scrollDown) {
          scrollDown.style.opacity = Math.max(0, 1 - progress * 3);
        }
      }

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // --------------------------------------------------------------------------
  // 3. SMART NAVBAR - Hide on scroll down, show on scroll up with glass
  // --------------------------------------------------------------------------

  function initSmartNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastScrollY = 0;
    let ticking = false;
    const threshold = 80;

    function updateNav() {
      const scrollY = window.pageYOffset;
      const headerHeight =
        document.getElementById('page-header')?.offsetHeight || 0;

      // Only apply smart behavior after scrolling past header
      if (scrollY > headerHeight) {
        if (scrollY > lastScrollY && scrollY - lastScrollY > 5) {
          // Scrolling down - hide
          nav.style.transform = 'translateY(-100%)';
          nav.style.opacity = '0';
        } else if (lastScrollY - scrollY > 5) {
          // Scrolling up - show with glass
          nav.style.transform = 'translateY(0)';
          nav.style.opacity = '1';
        }
      } else {
        nav.style.transform = 'translateY(0)';
        nav.style.opacity = '1';
      }

      lastScrollY = scrollY;
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          requestAnimationFrame(updateNav);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // --------------------------------------------------------------------------
  // 4. SMOOTH LINK TRANSITIONS - Apple-style page feel
  // --------------------------------------------------------------------------

  function initSmoothLinks() {
    const internalLinks = document.querySelectorAll(
      'a[href^="/"], a[href^="./"]'
    );

    internalLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip anchors and special links
        if (
          href.startsWith('#') ||
          href.startsWith('javascript') ||
          this.target === '_blank'
        )
          return;

        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(-8px)';
        document.body.style.transition =
          'opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';

        setTimeout(() => {
          window.location.href = href;
        }, 280);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. HOVER MICRO-INTERACTIONS - Refined
  // --------------------------------------------------------------------------

  function initMicroInteractions() {
    // Card tilt on mouse move (subtle 3D)
    const cards = document.querySelectorAll('#recent-posts > .recent-post-item');

    cards.forEach((card) => {
      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Very subtle tilt - Apple-like
        const rotateX = y * -3;
        const rotateY = x * 3;

        this.style.transform = `translateY(-4px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.transition =
          'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
      });

      card.addEventListener('mouseenter', function () {
        this.style.transition = 'transform 0.1s ease-out';
      });
    });

    // Button press effect
    const buttons = document.querySelectorAll(
      '#card-info-btn, #rightside button, .glow-button'
    );
    buttons.forEach((btn) => {
      btn.addEventListener('mousedown', function () {
        this.style.transform = 'scale(0.96)';
        this.style.transition = 'transform 0.1s ease';
      });

      btn.addEventListener('mouseup', function () {
        this.style.transform = '';
        this.style.transition =
          'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });

      btn.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. SCROLL PROGRESS INDICATOR
  // --------------------------------------------------------------------------

  function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'apple-scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 2px;
      background: linear-gradient(90deg, #0071e3, #2997ff);
      z-index: 9999;
      transition: width 0.1s linear;
      pointer-events: none;
    `;
    document.body.appendChild(progressBar);

    let ticking = false;

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          requestAnimationFrame(function () {
            const scrollTop = window.pageYOffset;
            const docHeight =
              document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // --------------------------------------------------------------------------
  // 7. SMOOTH SCROLL TO ANCHOR
  // --------------------------------------------------------------------------

  function initSmoothAnchor() {
    const scrollDown = document.querySelector('#scroll-down');
    if (scrollDown) {
      scrollDown.addEventListener('click', function (e) {
        e.preventDefault();
        const header = document.getElementById('page-header');
        if (header) {
          const target = header.offsetHeight;
          window.scrollTo({
            top: target,
            behavior: 'smooth',
          });
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 8. DARK MODE TRANSITION - Smooth
  // --------------------------------------------------------------------------

  function initDarkModeTransition() {
    const darkBtn = document.getElementById('darkmode');
    if (!darkBtn) return;

    darkBtn.addEventListener('click', function () {
      // Add transition to everything
      document.documentElement.style.transition =
        'background-color 0.4s ease, color 0.4s ease';
      document.body.style.transition =
        'background-color 0.4s ease, color 0.4s ease';

      // Remove transition after animation completes
      setTimeout(() => {
        document.documentElement.style.transition = '';
        document.body.style.transition = '';
      }, 500);
    });
  }

  // --------------------------------------------------------------------------
  // 9. IMAGE LAZY REVEAL - Smooth entry when images load
  // --------------------------------------------------------------------------

  function initImageReveal() {
    const images = document.querySelectorAll(
      '.recent-post-item img, .post_cover img'
    );

    images.forEach((img) => {
      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        img.addEventListener('load', function () {
          this.style.opacity = '1';
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------

  function init() {
    initScrollReveal();
    initParallax();
    initSmartNav();
    initSmoothLinks();
    initMicroInteractions();
    initScrollProgress();
    initSmoothAnchor();
    initDarkModeTransition();
    initImageReveal();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
