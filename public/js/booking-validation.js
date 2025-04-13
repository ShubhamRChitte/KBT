/**
 * KBT Cafe Booking Validation
 * Handles validation of the booking form fields
 */

// Validation error messages
const ERROR_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  date: 'Please select a valid date',
  time: 'Please select a time slot',
  table: 'Please select a table',
  people: 'Please enter a valid number of people'
};

// Validation patterns
const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/
};

/**
 * Initialize form validation when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    setupFormValidation(bookingForm);
  }
});

/**
 * Set up form validation for the booking form
 * @param {HTMLFormElement} form - The booking form element
 */
function setupFormValidation(form) {
  // Add validation to individual fields
  addInputValidation(form.querySelector('#customer-name'), { required: true });
  addInputValidation(form.querySelector('#customer-email'), { 
    required: true, 
    pattern: PATTERNS.email,
    errorMessage: ERROR_MESSAGES.email
  });
  addInputValidation(form.querySelector('#customer-phone'), { 
    required: true, 
    pattern: PATTERNS.phone,
    errorMessage: ERROR_MESSAGES.phone
  });
  addInputValidation(form.querySelector('#booking-date'), { required: true });
  addInputValidation(form.querySelector('#booking-time'), { required: true });
  addInputValidation(form.querySelector('#people-count'), { 
    required: true,
    min: 1,
    max: 12,
    errorMessage: ERROR_MESSAGES.people
  });
  
  // Add validation for hidden table selection field
  const tableInput = form.querySelector('#selected-table-id');
  if (tableInput) {
    tableInput.setAttribute('data-error-message', ERROR_MESSAGES.table);
  }

  // Submit event handler
  form.addEventListener('submit', function(event) {
    // Prevent form submission if validation fails
    if (!validateForm(form)) {
      event.preventDefault();
      showValidationSummary(form);
    }
  });
}

/**
 * Add validation to an input field
 * @param {HTMLInputElement} input - The input element
 * @param {Object} options - Validation options
 */
function addInputValidation(input, options = {}) {
  if (!input) return;
  
  // Set validation attributes
  if (options.required) {
    input.setAttribute('required', 'required');
  }
  
  if (options.pattern) {
    input.setAttribute('data-pattern', options.pattern.toString());
  }
  
  if (options.min !== undefined) {
    input.setAttribute('min', options.min);
  }
  
  if (options.max !== undefined) {
    input.setAttribute('max', options.max);
  }
  
  // Set custom error message if provided
  if (options.errorMessage) {
    input.setAttribute('data-error-message', options.errorMessage);
  } else if (options.required) {
    input.setAttribute('data-error-message', ERROR_MESSAGES.required);
  }
  
  // Add blur event for immediate validation feedback
  input.addEventListener('blur', function() {
    validateField(input);
    updateFieldUI(input);
  });
  
  // Add input event for real-time validation
  input.addEventListener('input', function() {
    if (input.classList.contains('invalid')) {
      validateField(input);
      updateFieldUI(input);
    }
  });
}

/**
 * Validate a single form field
 * @param {HTMLInputElement} field - The field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
  if (!field) return true;
  
  // Skip disabled fields
  if (field.disabled) return true;
  
  // Get validation parameters
  const isRequired = field.hasAttribute('required');
  const patternStr = field.getAttribute('data-pattern');
  const pattern = patternStr ? new RegExp(patternStr.replace(/^\/|\/$/g, '')) : null;
  const min = field.hasAttribute('min') ? parseInt(field.getAttribute('min')) : undefined;
  const max = field.hasAttribute('max') ? parseInt(field.getAttribute('max')) : undefined;
  
  // Check if field is empty
  const isEmpty = !field.value.trim();
  
  // Required field check
  if (isRequired && isEmpty) {
    field.setAttribute('data-error', ERROR_MESSAGES.required);
    return false;
  }
  
  // Skip further validation if field is empty and not required
  if (isEmpty) return true;
  
  // Pattern validation
  if (pattern && !pattern.test(field.value)) {
    field.setAttribute('data-error', field.getAttribute('data-error-message') || 'Invalid format');
    return false;
  }
  
  // Min/Max validation for number inputs
  if (field.type === 'number') {
    const value = parseInt(field.value);
    
    if (min !== undefined && value < min) {
      field.setAttribute('data-error', `Value must be at least ${min}`);
      return false;
    }
    
    if (max !== undefined && value > max) {
      field.setAttribute('data-error', `Value must be at most ${max}`);
      return false;
    }
  }
  
  // Table selection validation
  if (field.id === 'selected-table-id' && !field.value) {
    field.setAttribute('data-error', ERROR_MESSAGES.table);
    return false;
  }
  
  // Field is valid
  field.removeAttribute('data-error');
  return true;
}

/**
 * Update field UI based on validation state
 * @param {HTMLInputElement} field - The field to update
 */
function updateFieldUI(field) {
  if (!field) return;
  
  const formGroup = field.closest('.form-group');
  if (!formGroup) return;
  
  const errorElement = formGroup.querySelector('.error-message');
  const hasError = field.hasAttribute('data-error');
  
  // Update field classes
  if (hasError) {
    field.classList.add('invalid');
    field.classList.remove('valid');
  } else {
    field.classList.remove('invalid');
    field.classList.add('valid');
  }
  
  // Display or hide error message
  if (hasError) {
    if (errorElement) {
      errorElement.textContent = field.getAttribute('data-error');
      errorElement.style.display = 'block';
    } else {
      const newError = document.createElement('div');
      newError.className = 'error-message';
      newError.textContent = field.getAttribute('data-error');
      formGroup.appendChild(newError);
    }
  } else if (errorElement) {
    errorElement.style.display = 'none';
  }
}

/**
 * Validate the entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
  if (!form) return false;
  
  // Get all form fields that need validation
  const fields = form.querySelectorAll('input, select, textarea');
  let isValid = true;
  
  // Validate each field
  fields.forEach(field => {
    // Skip irrelevant fields
    if (field.type === 'hidden' && field.id !== 'selected-table-id') return;
    
    const fieldValid = validateField(field);
    updateFieldUI(field);
    
    if (!fieldValid) {
      isValid = false;
    }
  });
  
  return isValid;
}

/**
 * Show validation summary at the top of the form
 * @param {HTMLFormElement} form - The form with validation errors
 */
function showValidationSummary(form) {
  if (!form) return;
  
  // Remove any existing summary
  const existingSummary = form.querySelector('.validation-summary');
  if (existingSummary) {
    existingSummary.remove();
  }
  
  // Get all invalid fields
  const invalidFields = form.querySelectorAll('[data-error]');
  if (invalidFields.length === 0) return;
  
  // Create summary element
  const summary = document.createElement('div');
  summary.className = 'validation-summary error';
  
  // Add heading
  const heading = document.createElement('h3');
  heading.textContent = 'Please correct the following errors:';
  summary.appendChild(heading);
  
  // Add error list
  const errorList = document.createElement('ul');
  invalidFields.forEach(field => {
    const item = document.createElement('li');
    
    // Try to get a user-friendly field name
    let fieldName = field.getAttribute('data-field-name') || 
                   field.getAttribute('placeholder') || 
                   field.name || 
                   '';
    
    // For table selection error, use a more descriptive message
    if (field.id === 'selected-table-id') {
      item.textContent = field.getAttribute('data-error');
    } else {
      item.textContent = `${fieldName}: ${field.getAttribute('data-error')}`;
    }
    
    errorList.appendChild(item);
    
    // Add click event to focus the field
    item.addEventListener('click', () => {
      field.focus();
    });
  });
  
  summary.appendChild(errorList);
  
  // Insert at the top of the form
  form.insertBefore(summary, form.firstChild);
  
  // Scroll to the top of the form
  summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Validate contact information (email and phone)
 * @param {string} email - Email address to validate
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether both email and phone are valid
 */
function validateContactInfo(email, phone) {
  const isEmailValid = PATTERNS.email.test(email);
  const isPhoneValid = PATTERNS.phone.test(phone);
  
  return isEmailValid && isPhoneValid;
} 