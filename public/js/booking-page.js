/**
 * KBT Cafe Booking Page
 * Handles booking form submission, validation, and notifications
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize main booking page elements
  initializeBookingForm();
  initializeTimeSlots();
  initializePremiumOptions();
  initializeNotificationOptions();
  setupFormValidation();
});

/**
 * Set up the booking form and submission handling
 */
function initializeBookingForm() {
  const bookingForm = document.getElementById('booking-form');
  if (!bookingForm) return;
  
  bookingForm.addEventListener('submit', function(e) {
    // First check if a table, date and time are selected
    const tableInput = document.getElementById('selected-table-id');
    const dateInput = document.getElementById('booking-date');
    const timeInput = document.querySelector('.time-slot.selected');
    
    if (!tableInput || !tableInput.value) {
      e.preventDefault();
      showError('Please select a table from the map');
      return;
    }
    
    if (!dateInput || !dateInput.value) {
      e.preventDefault();
      showError('Please select a booking date');
      return;
    }
    
    if (!timeInput) {
      e.preventDefault();
      showError('Please select a time slot');
      return;
    }
    
    // Additional validation can be added here
    if (!validateContactInfo()) {
      e.preventDefault();
      return;
    }
    
    // If everything is valid, show a loading indicator
    document.querySelector('.booking-confirmation').classList.add('loading');
    
    // In a real application, we would submit the form to the server
    // For demonstration, we'll show a success message after a delay
    if (window.location.href.includes('demo-mode')) {
      e.preventDefault();
      setTimeout(() => {
        document.querySelector('.booking-confirmation').classList.remove('loading');
        showBookingSuccess();
      }, 1500);
    }
  });
}

/**
 * Initialize time slot selection
 */
function initializeTimeSlots() {
  const timeSlots = document.querySelectorAll('.time-slot');
  const timeInput = document.getElementById('booking-time');
  
  if (!timeSlots.length || !timeInput) return;
  
  timeSlots.forEach(slot => {
    slot.addEventListener('click', function() {
      if (this.getAttribute('data-available') === 'true') {
        // Remove selected class from all time slots
        timeSlots.forEach(s => s.classList.remove('selected'));
        
        // Add selected class to clicked time slot
        this.classList.add('selected');
        
        // Update hidden input with selected time
        timeInput.value = this.getAttribute('data-time');
        
        // Update booking summary
        updateBookingSummary();
      }
    });
  });
}

/**
 * Initialize premium booking options with price calculation
 */
function initializePremiumOptions() {
  const premiumOptions = document.querySelectorAll('.premium-option input[type="checkbox"]');
  
  premiumOptions.forEach(option => {
    option.addEventListener('change', function() {
      // Update the booking summary
      updateBookingSummary();
    });
  });
}

/**
 * Initialize notification options
 */
function initializeNotificationOptions() {
  const notificationOptions = document.querySelectorAll('.notification-option input[type="checkbox"]');
  const phoneField = document.getElementById('phone');
  
  notificationOptions.forEach(option => {
    option.addEventListener('change', function() {
      // If SMS notification is enabled, make phone field required
      if (this.id === 'sms-notification' && this.checked) {
        phoneField.setAttribute('required', true);
        phoneField.parentElement.classList.add('required');
      } else if (this.id === 'sms-notification') {
        phoneField.removeAttribute('required');
        phoneField.parentElement.classList.remove('required');
      }
    });
  });
}

/**
 * Set up form validation for required fields
 */
function setupFormValidation() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  
  if (nameInput) {
    nameInput.addEventListener('blur', function() {
      validateField(this, value => value.trim().length >= 3, 'Please enter a valid name (at least 3 characters)');
    });
  }
  
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      validateField(this, value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Please enter a valid email address');
    });
  }
  
  if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
      // Only validate if it's required or has a value
      if (this.hasAttribute('required') || this.value.trim().length > 0) {
        validateField(this, value => /^\+?[\d\s()-]{10,15}$/.test(value), 'Please enter a valid phone number');
      }
    });
  }
}

/**
 * Validate a field with a custom validator function
 */
function validateField(field, validatorFn, errorMessage) {
  const value = field.value;
  const errorElement = field.parentElement.querySelector('.error-message');
  
  if (!validatorFn(value)) {
    field.classList.add('error');
    
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    } else {
      const newError = document.createElement('div');
      newError.className = 'error-message';
      newError.textContent = errorMessage;
      field.parentElement.appendChild(newError);
    }
    
    return false;
  } else {
    field.classList.remove('error');
    
    if (errorElement) {
      errorElement.style.display = 'none';
    }
    
    return true;
  }
}

/**
 * Validate all contact information fields
 */
function validateContactInfo() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  
  let isValid = true;
  
  if (nameInput) {
    isValid = validateField(
      nameInput, 
      value => value.trim().length >= 3, 
      'Please enter a valid name (at least 3 characters)'
    ) && isValid;
  }
  
  if (emailInput) {
    isValid = validateField(
      emailInput, 
      value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 
      'Please enter a valid email address'
    ) && isValid;
  }
  
  if (phoneInput && (phoneInput.hasAttribute('required') || phoneInput.value.trim().length > 0)) {
    isValid = validateField(
      phoneInput, 
      value => /^\+?[\d\s()-]{10,15}$/.test(value), 
      'Please enter a valid phone number'
    ) && isValid;
  }
  
  return isValid;
}

/**
 * Show a general error message
 */
function showError(message) {
  const errorContainer = document.querySelector('.error-container');
  
  if (!errorContainer) {
    // Create error container if it doesn't exist
    const newError = document.createElement('div');
    newError.className = 'error-container';
    newError.innerHTML = `<div class="error-message">${message}</div>`;
    
    const form = document.getElementById('booking-form');
    if (form) {
      form.prepend(newError);
    } else {
      document.querySelector('.booking-section').prepend(newError);
    }
  } else {
    errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
    errorContainer.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
      errorContainer.style.display = 'none';
    }, 5000);
  }
  
  // Scroll to error
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Show booking success message
 */
function showBookingSuccess() {
  const bookingForm = document.getElementById('booking-form');
  const bookingConfirmation = document.querySelector('.booking-confirmation');
  
  if (!bookingForm || !bookingConfirmation) return;
  
  // Hide the form
  bookingForm.style.display = 'none';
  
  // Show confirmation
  bookingConfirmation.innerHTML = `
    <div class="success-message">
      <h3>Booking Confirmed!</h3>
      <p>Thank you for your reservation at KBT Cafe.</p>
      <p>A confirmation has been sent to your email.</p>
      <div class="confirmation-details">
        ${document.getElementById('booking-summary').innerHTML}
      </div>
      <button class="btn btn-primary" onclick="window.location.href='/'">Return Home</button>
    </div>
  `;
  
  bookingConfirmation.style.display = 'block';
  
  // Scroll to confirmation
  bookingConfirmation.scrollIntoView({
    behavior: 'smooth'
  });
} 