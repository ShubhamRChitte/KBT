/**
 * KBT Cafe Booking Summary
 * Handles updating the booking summary based on user selections
 */

// Base price for a standard table booking
const BASE_PRICE = 15.00;

// Premium options with their prices
const PREMIUM_OPTIONS = {
  'private-area': { price: 10.00, label: 'Private Area' },
  'window-seat': { price: 5.00, label: 'Window Seat' },
  'extended-time': { price: 8.00, label: 'Extended Time (+30 min)' }
};

// Keep track of booking details for summary
let bookingSummary = {
  table: null,
  date: null,
  time: null,
  people: 1,
  premiumOptions: [],
  totalPrice: BASE_PRICE
};

/**
 * Initialize the booking summary section
 */
document.addEventListener('DOMContentLoaded', function() {
  // Update summary when people count changes
  const peopleInput = document.getElementById('people-count');
  if (peopleInput) {
    peopleInput.addEventListener('change', function() {
      bookingSummary.people = parseInt(this.value) || 1;
      updateBookingSummary();
    });
  }

  // Set initial summary
  updateBookingSummary();
});

/**
 * Update the booking summary based on current selections
 */
function updateBookingSummary() {
  const summaryElement = document.getElementById('booking-summary');
  if (!summaryElement) return;
  
  // Get current selections
  bookingSummary.table = document.getElementById('selected-table-id')?.value || null;
  bookingSummary.tableName = document.getElementById('selected-table-name')?.value || 'No table selected';
  bookingSummary.date = document.getElementById('booking-date')?.value || null;
  bookingSummary.time = document.getElementById('booking-time')?.value || null;
  
  // Get premium options
  bookingSummary.premiumOptions = [];
  const premiumCheckboxes = document.querySelectorAll('.premium-option input[type="checkbox"]:checked');
  premiumCheckboxes.forEach(checkbox => {
    const optionId = checkbox.id;
    if (PREMIUM_OPTIONS[optionId]) {
      bookingSummary.premiumOptions.push(optionId);
    }
  });
  
  // Calculate total price
  calculateTotalPrice();
  
  // Format date for display
  let formattedDate = 'Not selected';
  if (bookingSummary.date) {
    const dateObj = new Date(bookingSummary.date);
    formattedDate = dateObj.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Create summary HTML
  let summaryHTML = `
    <div class="summary-item">
      <span class="summary-label">Table:</span>
      <span class="summary-value">${bookingSummary.tableName}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Date:</span>
      <span class="summary-value">${formattedDate}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Time:</span>
      <span class="summary-value">${bookingSummary.time || 'Not selected'}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">People:</span>
      <span class="summary-value">${bookingSummary.people}</span>
    </div>
  `;
  
  // Add premium options if selected
  if (bookingSummary.premiumOptions.length > 0) {
    summaryHTML += `<div class="summary-section premium-section">
      <h4>Premium Options</h4>`;
      
    bookingSummary.premiumOptions.forEach(option => {
      summaryHTML += `
        <div class="summary-item">
          <span class="summary-label">${PREMIUM_OPTIONS[option].label}:</span>
          <span class="summary-value">$${PREMIUM_OPTIONS[option].price.toFixed(2)}</span>
        </div>
      `;
    });
    
    summaryHTML += `</div>`;
  }
  
  // Add pricing info
  summaryHTML += `
    <div class="summary-section price-section">
      <div class="summary-item base-price">
        <span class="summary-label">Base Price:</span>
        <span class="summary-value">$${BASE_PRICE.toFixed(2)}</span>
      </div>
      <div class="summary-item total-price">
        <span class="summary-label">Total:</span>
        <span class="summary-value">$${bookingSummary.totalPrice.toFixed(2)}</span>
      </div>
    </div>
  `;
  
  // Update the summary element
  summaryElement.innerHTML = summaryHTML;
  
  // Update hidden fields for form submission
  updateHiddenFields();
  
  // Check if we can enable the booking button
  updateBookButton();
}

/**
 * Calculate the total price based on selections
 */
function calculateTotalPrice() {
  // Start with base price
  let total = BASE_PRICE;
  
  // Add premium options
  bookingSummary.premiumOptions.forEach(option => {
    if (PREMIUM_OPTIONS[option]) {
      total += PREMIUM_OPTIONS[option].price;
    }
  });
  
  // Multiply by number of people if applicable
  // Uncomment if price should scale with people count
  // total *= bookingSummary.people;
  
  bookingSummary.totalPrice = total;
}

/**
 * Update hidden fields for form submission
 */
function updateHiddenFields() {
  // Update hidden price field
  const priceInput = document.getElementById('total-price');
  if (priceInput) {
    priceInput.value = bookingSummary.totalPrice.toFixed(2);
  }
  
  // Update premium options field as JSON
  const premiumOptionsInput = document.getElementById('premium-options');
  if (premiumOptionsInput) {
    premiumOptionsInput.value = JSON.stringify(bookingSummary.premiumOptions);
  }
}

/**
 * Enable/disable book button based on required selections
 */
function updateBookButton() {
  const bookButton = document.querySelector('#booking-form button[type="submit"]');
  if (!bookButton) return;
  
  const isComplete = bookingSummary.table && bookingSummary.date && bookingSummary.time;
  
  if (isComplete) {
    bookButton.removeAttribute('disabled');
  } else {
    bookButton.setAttribute('disabled', 'disabled');
  }
}

/**
 * Update the booking summary with table selection
 * Called from kbtcafe.js when a table is selected
 */
function updateTableSelection(tableId, tableName) {
  const tableIdInput = document.getElementById('selected-table-id');
  const tableNameInput = document.getElementById('selected-table-name');
  
  if (tableIdInput) tableIdInput.value = tableId;
  if (tableNameInput) tableNameInput.value = tableName;
  
  updateBookingSummary();
} 