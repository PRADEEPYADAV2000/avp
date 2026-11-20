'use strict';

/**
 * AV Group Security - Navigation Module
 * Handles sticky header, mobile menu, active nav state, and smooth scrolling.
 */

const Navigation = (() => {

  // ---------------------------------------------------------------------------
  // Utility: simple scroll-event debounce using requestAnimationFrame
  // ---------------------------------------------------------------------------
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
  // 1. Sticky Header
  // ---------------------------------------------------------------------------
  const initStickyHeader = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    const SCROLL_THRESHOLD = 50;

    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', rafDebounce(handleScroll), { passive: true });
    // Run once on load in case the page is already scrolled
    handleScroll();
  };

  // ---------------------------------------------------------------------------
  // 2. Mobile Menu Toggle
  // ---------------------------------------------------------------------------
  const initMobileMenu = () => {
    const toggleBtn = document.querySelector('.header__menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!toggleBtn || !mobileNav) return;

    const openMenu = () => {
      toggleBtn.classList.add('is-active');
      mobileNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      toggleBtn.classList.remove('is-active');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    };

    const isMenuOpen = () => mobileNav.classList.contains('is-open');

    // Toggle on button click
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMenuOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when a mobile-nav link is clicked
    const navLinks = mobileNav.querySelectorAll('.mobile-nav__link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen()) {
        closeMenu();
        toggleBtn.focus(); // return focus to toggle for accessibility
      }
    });
  };

  // ---------------------------------------------------------------------------
  // 3. Active Nav State (homepage scroll-spy via IntersectionObserver)
  // ---------------------------------------------------------------------------
  const initActiveNavState = () => {
    // Only run scroll-spy on the homepage
    const isHomepage =
      window.location.pathname === '/' ||
      window.location.pathname.endsWith('/index.html') ||
      window.location.pathname.endsWith('/index.htm');

    if (!isHomepage) return; // inner pages rely on is-active set in HTML

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav-link, .mobile-nav__link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const setActiveLink = (sectionId) => {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${sectionId}`) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px', // account for fixed header
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  };

  // ---------------------------------------------------------------------------
  // 4. Smooth Scroll for Anchor Links
  // ---------------------------------------------------------------------------
  const initSmoothScroll = () => {
    const HEADER_OFFSET = 80;

    // Use event delegation on the document
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const targetPosition =
        targetEl.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, null, targetId);
      }
    });
  };

  // ---------------------------------------------------------------------------
  // Public init
  // ---------------------------------------------------------------------------
  const init = () => {
    initStickyHeader();
    initMobileMenu();
    initActiveNavState();
    initSmoothScroll();
  };

  return { init };
})();

// Allow standalone usage (if loaded without main.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}
