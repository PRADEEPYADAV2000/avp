'use strict';

/**
 * AV Group Security - Forms Module
 * Handles quote form validation, phone input formatting, and simulated submission.
 */

const Forms = (() => {

  // ---------------------------------------------------------------------------
  // Validation rules
  // ---------------------------------------------------------------------------
  const RULES = {
    name: {
      required: true,
      minLength: 2,
      message: 'Please enter your name (at least 2 characters).',
    },
    phone: {
      required: true,
      pattern: /^[6-9]\d{9}$/,
      message: 'Please enter a valid 10-digit Indian mobile number.',
    },
    email: {
      required: false,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address.',
    },
    service: {
      required: false,
      message: '',
    },
  };

  // ---------------------------------------------------------------------------
  // Helper: show / clear field errors
  // ---------------------------------------------------------------------------
  const showFieldError = (input, message) => {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.add('has-error');
    input.classList.add('is-error');

    const errorEl = formGroup.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = '';
    }
  };

  const clearFieldError = (input) => {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('has-error');
    input.classList.remove('is-error');

    const errorEl = formGroup.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  };

  // ---------------------------------------------------------------------------
  // Validate a single field. Returns true if valid.
  // ---------------------------------------------------------------------------
  const validateField = (input) => {
    const name = input.getAttribute('name') || input.id;
    const rule = RULES[name];
    if (!rule) return true; // no rule = always valid

    const value = input.value.trim();

    // Required check
    if (rule.required && value.length === 0) {
      showFieldError(input, rule.message);
      return false;
    }

    // Min length check (only if value present)
    if (rule.minLength && value.length > 0 && value.length < rule.minLength) {
      showFieldError(input, rule.message);
      return false;
    }

    // Pattern check (only if value present, so optional fields skip when empty)
    if (rule.pattern && value.length > 0 && !rule.pattern.test(value)) {
      showFieldError(input, rule.message);
      return false;
    }

    clearFieldError(input);
    return true;
  };

  // ---------------------------------------------------------------------------
  // 2. Phone Input Formatting - digits only, max 10 chars
  // ---------------------------------------------------------------------------
  const initPhoneFormatting = (form) => {
    const phoneInput = form.querySelector('[name="phone"], #phone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', () => {
      // Strip anything that isn't a digit
      let digits = phoneInput.value.replace(/\D/g, '');
      // Limit to 10 digits
      if (digits.length > 10) {
        digits = digits.slice(0, 10);
      }
      phoneInput.value = digits;
    });

    // Block non-digit key presses (allow navigation/control keys)
    phoneInput.addEventListener('keydown', (e) => {
      const allowedKeys = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End',
      ];
      if (allowedKeys.includes(e.key)) return;
      // Allow Ctrl/Cmd + A, C, V, X
      if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) return;
      // Block non-digits
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });
  };

  // ---------------------------------------------------------------------------
  // 3. Real-time validation - clear errors on focus / input / change
  // ---------------------------------------------------------------------------
  const initRealtimeValidation = (form) => {
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach((input) => {
      // Clear error on focus
      input.addEventListener('focus', () => clearFieldError(input));

      // Clear error on input / change
      input.addEventListener('input', () => clearFieldError(input));
      input.addEventListener('change', () => clearFieldError(input));
    });
  };

  // ---------------------------------------------------------------------------
  // 1. Quote Form Validation & Simulated Submission
  // ---------------------------------------------------------------------------
  const initQuoteForm = () => {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    // Set up phone formatting and real-time validation
    initPhoneFormatting(form);
    initRealtimeValidation(form);

    const submitBtn = form.querySelector('[type="submit"], button:not([type="button"])');
    const successEl = document.querySelector('.form-success');
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields with known rules
      const fieldsToValidate = form.querySelectorAll(
        '[name="name"], [name="phone"], [name="email"], [name="service"], ' +
        '#name, #phone, #email, #service'
      );

      let isValid = true;
      let firstInvalid = null;

      fieldsToValidate.forEach((input) => {
        if (!validateField(input)) {
          isValid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (!isValid) {
        // Focus the first invalid field for accessibility
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // --- Valid submission → Send to WhatsApp ---
      const WHATSAPP_NUMBER = '918097649810';

      // Collect form values
      const name = (form.querySelector('[name="name"]') || {}).value || '';
      const phone = (form.querySelector('[name="phone"]') || {}).value || '';
      const email = (form.querySelector('[name="email"]') || {}).value || '';
      const service = (form.querySelector('[name="service"]') || {});
      const serviceName = service.options ? (service.options[service.selectedIndex] || {}).text || '' : service.value || '';
      const location = (form.querySelector('[name="location"]') || {}).value || '';
      const personnel = (form.querySelector('[name="personnel"]') || {}).value || '';
      const duration = (form.querySelector('[name="duration"]') || {});
      const durationName = duration.options ? (duration.options[duration.selectedIndex] || {}).text || '' : duration.value || '';
      const message = (form.querySelector('[name="message"]') || {}).value || '';

      // Build WhatsApp message
      let waMessage = `*New Enquiry from AV Group Website*\n\n`;
      waMessage += `*Name:* ${name}\n`;
      waMessage += `*Phone:* ${phone}\n`;
      if (email) waMessage += `*Email:* ${email}\n`;
      if (serviceName && serviceName !== 'Select a service') waMessage += `*Service Required:* ${serviceName}\n`;
      if (location) waMessage += `*Location:* ${location}\n`;
      if (personnel) waMessage += `*Personnel Needed:* ${personnel}\n`;
      if (durationName && durationName !== 'Select duration') waMessage += `*Duration:* ${durationName}\n`;
      if (message) waMessage += `\n*Message:*\n${message}\n`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

      // Show loading briefly, then redirect
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Opening WhatsApp...';
        submitBtn.classList.add('is-loading');
      }

      setTimeout(() => {
        // Open WhatsApp
        window.open(waUrl, '_blank');

        // Show success message
        form.style.display = 'none';
        if (successEl) {
          successEl.classList.add('is-visible');
        }

        // Reset after 6 seconds
        setTimeout(() => {
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.classList.remove('is-loading');
          }
          form.style.display = '';
          if (successEl) {
            successEl.classList.remove('is-visible');
          }
          form.querySelectorAll('.has-error').forEach((g) => g.classList.remove('has-error'));
          form.querySelectorAll('.is-error').forEach((i) => i.classList.remove('is-error'));
        }, 6000);
      }, 500);
    });
  };

  // ---------------------------------------------------------------------------
  // Public init
  // ---------------------------------------------------------------------------
  const init = () => {
    initQuoteForm();
  };

  return { init };
})();

// Allow standalone usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Forms;
}
