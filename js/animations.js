'use strict';

/**
 * AV Group Security - Animations Module
 * Handles scroll-reveal, back-to-top button, counter animations,
 * and respects prefers-reduced-motion.
 */

const Animations = (() => {

  // ---------------------------------------------------------------------------
  // Utility
  // ---------------------------------------------------------------------------
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rafDebounce = (fn) => {
    let ticking = false;
    return () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          fn();
          ticking = false;
        });
      }
    };
  };

  // ---------------------------------------------------------------------------
  // 1. Scroll Reveal
  // ---------------------------------------------------------------------------
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    // If user prefers reduced motion, make everything visible immediately
    if (prefersReducedMotion()) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // stop watching once revealed
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => revealObserver.observe(el));
  };

  // ---------------------------------------------------------------------------
  // 2. Back to Top Button
  // ---------------------------------------------------------------------------
  const initBackToTop = () => {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    const SHOW_THRESHOLD = 500;

    const toggleVisibility = () => {
      if (window.scrollY > SHOW_THRESHOLD) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', rafDebounce(toggleVisibility), { passive: true });
    // Run once on load
    toggleVisibility();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    });
  };

  // ---------------------------------------------------------------------------
  // 3. Counter Animation
  // ---------------------------------------------------------------------------
  const initCounterAnimation = () => {
    const statElements = document.querySelectorAll('[data-count]');
    if (statElements.length === 0) return;

    // If reduced motion, set final values immediately
    if (prefersReducedMotion()) {
      statElements.forEach((el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (!isNaN(target)) {
          el.textContent = formatNumber(target, el);
        }
      });
      return;
    }

    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;

      const duration = 2000; // ms
      const startTime = performance.now();
      const startValue = 0;

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out quad for a natural feel
        const eased = 1 - (1 - progress) * (1 - progress);
        const currentValue = Math.round(startValue + (target - startValue) * eased);

        el.textContent = formatNumber(currentValue, el);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statElements.forEach((el) => counterObserver.observe(el));
  };

  /**
   * Format the counter number. If the element has a data-count-suffix
   * (e.g., "+", "%", "K+"), append it.
   */
  const formatNumber = (value, el) => {
    const suffix = el.getAttribute('data-count-suffix') || '';
    return value.toLocaleString('en-IN') + suffix;
  };

  // ---------------------------------------------------------------------------
  // Public init
  // ---------------------------------------------------------------------------
  const init = () => {
    initScrollReveal();
    initBackToTop();
    initCounterAnimation();
  };

  return { init };
})();

// Allow standalone usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Animations;
}
