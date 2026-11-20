'use strict';

/**
 * AV Group Security - Main Orchestrator
 * Initialises all modules and handles FAQ accordion, services toggle,
 * and testimonial touch-swipe.
 */

(() => {

  // ---------------------------------------------------------------------------
  // 1. FAQ Accordion
  // ---------------------------------------------------------------------------
  const initAccordion = () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length === 0) return;

    accordionItems.forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      const panel = item.querySelector('.accordion-panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all items first (only one open at a time)
        accordionItems.forEach((otherItem) => {
          if (otherItem === item) return;
          const otherPanel = otherItem.querySelector('.accordion-panel');
          const otherTrigger = otherItem.querySelector('.accordion-trigger');
          if (otherItem.classList.contains('is-open')) {
            otherItem.classList.remove('is-open');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = '0';
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0';
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });

      // Set initial state: if already marked open in HTML, expand it
      if (item.classList.contains('is-open')) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = '0';
      }
    });

    // Recalculate open panel heights on window resize (content may reflow)
    window.addEventListener('resize', () => {
      accordionItems.forEach((item) => {
        if (item.classList.contains('is-open')) {
          const panel = item.querySelector('.accordion-panel');
          if (panel) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        }
      });
    }, { passive: true });
  };

  // ---------------------------------------------------------------------------
  // 2. Services Toggle (homepage only)
  // ---------------------------------------------------------------------------
  const initServicesToggle = () => {
    const toggleBtn = document.getElementById('toggleServices') || document.querySelector('[data-toggle="services"]');
    if (!toggleBtn) return;

    const extraCards = document.querySelectorAll('[data-service-extra]');
    if (extraCards.length === 0) return;

    let isExpanded = false;

    // Ensure extra cards start hidden
    extraCards.forEach((card) => {
      card.style.display = 'none';
    });

    toggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;

      extraCards.forEach((card) => {
        card.style.display = isExpanded ? '' : 'none';
      });

      toggleBtn.textContent = isExpanded ? 'Show Less' : 'View All Services';
      toggleBtn.setAttribute('aria-expanded', String(isExpanded));
    });
  };

  // ---------------------------------------------------------------------------
  // 4. Testimonial Touch Swipe (mobile)
  // ---------------------------------------------------------------------------
  const initTestimonialSwipe = () => {
    const grid = document.querySelector('.testimonials__grid, .testimonial-grid');
    if (!grid) return;

    // Only enable on touch devices
    if (!('ontouchstart' in window)) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isSwiping = false;
    const SWIPE_THRESHOLD = 50; // minimum px for a swipe to register

    grid.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      isSwiping = true;
    }, { passive: true });

    grid.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;

      // If vertical movement is larger than horizontal, don't hijack scroll
      const deltaX = Math.abs(currentX - startX);
      const deltaY = Math.abs(e.touches[0].clientY - startY);
      if (deltaY > deltaX) {
        isSwiping = false;
      }
    }, { passive: true });

    grid.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;

      const deltaX = currentX - startX;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

      // Determine card width for scrolling one "page"
      const firstCard = grid.querySelector('.testimonial-card, .testimonials__card');
      const scrollAmount = firstCard
        ? firstCard.offsetWidth + parseInt(getComputedStyle(grid).gap || '0', 10)
        : grid.offsetWidth * 0.8;

      if (deltaX < 0) {
        // Swipe left -> scroll right
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        // Swipe right -> scroll left
        grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }, { passive: true });

    // Enable horizontal scroll with CSS
    grid.style.overflowX = 'auto';
    grid.style.scrollSnapType = 'x mandatory';
    grid.style.webkitOverflowScrolling = 'touch';

    // Apply scroll-snap to children
    const cards = grid.children;
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.scrollSnapAlign = 'start';
    }
  };

  // ---------------------------------------------------------------------------
  // 3. Initialize all modules on DOMContentLoaded
  // ---------------------------------------------------------------------------
  const initApp = () => {
    // Core modules (loaded via separate <script> tags)
    if (typeof Navigation !== 'undefined' && Navigation.init) {
      Navigation.init();
    }

    if (typeof Animations !== 'undefined' && Animations.init) {
      Animations.init();
    }

    if (typeof Forms !== 'undefined' && Forms.init) {
      Forms.init();
    }

    if (typeof Language !== 'undefined' && Language.init) {
      Language.init();
    }

    // Page-specific features
    initAccordion();
    initServicesToggle();
    initTestimonialSwipe();
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    // DOM already ready (script loaded with defer or at end of body)
    initApp();
  }

})();
