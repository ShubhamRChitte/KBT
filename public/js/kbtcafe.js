let count = 0;


// let addcart = document.querySelectorAll(".custom-card-btn");

// for(let btn of addcart){
//   btn.addEventListener("click",()=>{
//     count+=1;
//     console.log("Btn was click");
//     let noofitems = document.querySelectorAll(".noofitems");
//     noofitems[0].innerText=count;
//     console.log(noofitems[0].innerText);
//   })
// }



// checking the mob no is valid or not
const phoneInput = document.getElementById("phone");

if (phoneInput) {
  // Restrict input to 10 digits
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10); // Allow only digits and limit to 10 characters
  });

  const myreserv = document.getElementById("myreserv");
  if (myreserv) {
    myreserv.addEventListener("submit", function (event) {
    if (phoneInput.value.length !== 10) {
      alert("Please enter valid Mobile No");
      event.preventDefault(); // Prevent form submission if invalid
    }
  });

    // tell sure to booktable
    myreserv.addEventListener("submit", function (event) {
    const confirmBook = confirm("Are you sure you want to book the table?");
    if (!confirmBook) {
        event.preventDefault(); // Stop form submission if canceled
    }
  });
  }
}

// Enhanced Mobile Menu Toggle with better UX
document.addEventListener('DOMContentLoaded', function() {
  const menuOpenBtn = document.getElementById('menu-open-button');
  const menuCloseBtn = document.getElementById('menu-close-button');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('.responsive-header');

  if (menuOpenBtn && menuCloseBtn && navMenu) {
    // Add hamburger menu icon with animation
    menuOpenBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#f4ebd0; transition: transform 0.3s ease;">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
    
    // Add close icon with animation
    menuCloseBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#f4ebd0; transition: transform 0.3s ease;">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    
    // Initially hide menu button on desktop
    if (window.innerWidth > 768) {
      menuOpenBtn.style.display = 'none';
    } else {
      menuOpenBtn.style.display = 'block';
    }
    
    // Handle mobile menu toggle with improved animation
    menuOpenBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navMenu.classList.add('active');
      menuOpenBtn.style.display = 'none';
      menuCloseBtn.style.display = 'block';
      
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
      
      // Add subtle animation to menu items
      const menuItems = navMenu.querySelectorAll('.nav-item');
      menuItems.forEach((item, index) => {
        item.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
      });
      
      setTimeout(() => {
        menuItems.forEach(item => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      }, 50);
    });
    
    menuCloseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeMenu();
    });
    
    // Function to close menu
    function closeMenu() {
      navMenu.classList.remove('active');
      menuOpenBtn.style.display = 'block';
      menuCloseBtn.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          e.target !== menuOpenBtn &&
          !menuOpenBtn.contains(e.target) &&
          e.target !== menuCloseBtn &&
          !menuCloseBtn.contains(e.target)) {
        closeMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        menuOpenBtn.style.display = 'none';
        document.body.style.overflow = '';
      } else {
        if (!navMenu.classList.contains('active')) {
          menuOpenBtn.style.display = 'block';
        }
      }
    });
    
    // Add scroll behavior to shrink header on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        header.style.background = 'rgba(33, 33, 33, 0.95)';
        header.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      } else {
        header.style.background = 'var(--eerie-black-4)';
        header.style.boxShadow = 'none';
      }
      
      lastScrollTop = scrollTop;
    });
  }
});

// Add smooth scrolling for all in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Only apply to in-page links (not external links)
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        // Add offset for fixed header
        const headerHeight = document.querySelector('.responsive-header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Make all form submissions more mobile-friendly
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      // Blur active element to hide mobile keyboard
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  });
  
  // Format date inputs for better mobile compatibility
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    // Ensure date inputs have a default value if not set
    if (!input.value) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      input.value = `${yyyy}-${mm}-${dd}`;
    }
  });
  
  // Better form field focus handling for mobile
  const formFields = document.querySelectorAll('input, textarea, select');
  formFields.forEach(field => {
    field.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
});

/**
 * KBT Cafe Interactive Elements
 * Handles table selection, calendar booking, and pre-order functionality
 */

// Global variables for tracking state
let selectedTable = null;
let selectedDate = null;
const availabilityData = {}; // Will be populated with dummy data for demo

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeTableMap();
  initializeCalendar();
  initializeQuantityButtons();
  setupDateChangeListener();
  populateDummyAvailabilityData();
});

/**
 * Table Map Functionality
 */
function initializeTableMap() {
  const tables = document.querySelectorAll('.table');
  const tableIdInput = document.getElementById('selected-table-id');
  
  if (!tables.length || !tableIdInput) return;
  
  tables.forEach(table => {
    table.addEventListener('click', function() {
      // Remove selected class from all tables
      tables.forEach(t => t.classList.remove('selected'));
      
      // Add selected class to clicked table
      this.classList.add('selected');
      
      // Update hidden input with selected table ID
      selectedTable = this.getAttribute('data-table-id');
      tableIdInput.value = selectedTable;
      
      // Update displayed table info if element exists
      const tableInfoElement = document.getElementById('selected-table-info');
      if (tableInfoElement) {
        tableInfoElement.textContent = `Table #${selectedTable} (${this.getAttribute('data-seats')} seats)`;
      }
      
      // If we already have a date selected, update availability
      if (selectedDate) {
        updateCalendarAvailability(selectedDate);
      }
    });
  });
}

/**
 * Calendar Functionality
 */
function initializeCalendar() {
  const calendarGrid = document.querySelector('.calendar-grid');
  if (!calendarGrid) return;
  
  // Clear existing calendar if any
  calendarGrid.innerHTML = '';
  
  // Add the day headers
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'calendar-header';
    dayHeader.textContent = day;
    calendarGrid.appendChild(dayHeader);
  });
  
  // Get the current date
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Get the first day of the month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  
  // Get the last day of the month
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day empty';
    calendarGrid.appendChild(emptyDay);
  }
  
  // Add the days of the month
  for (let date = 1; date <= lastDate; date++) {
    const day = document.createElement('div');
    day.className = 'calendar-day';
    day.textContent = date;
    day.setAttribute('data-date', `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`);
    
    // Disable past dates
    const thisDate = new Date(currentYear, currentMonth, date);
    if (thisDate < today) {
      day.classList.add('fully-booked');
      day.setAttribute('data-available', 'false');
    } else {
      day.classList.add('available');
      day.setAttribute('data-available', 'true');
      day.addEventListener('click', function() {
        if (this.getAttribute('data-available') === 'true') {
          // Remove selected class from all days
          document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
          
          // Add selected class to clicked day
          this.classList.add('selected');
          
          // Update selected date
          selectedDate = this.getAttribute('data-date');
          
          // Update the hidden input for date if it exists
          const dateInput = document.getElementById('booking-date');
          if (dateInput) {
            dateInput.value = selectedDate;
          }
          
          // Update time slot availability based on selected date and table
          updateCalendarAvailability(selectedDate);
        }
      });
    }
    
    calendarGrid.appendChild(day);
  }
}

/**
 * Update calendar availability based on selected date and table
 */
function updateCalendarAvailability(date) {
  if (!date || !selectedTable) return;
  
  // In a real application, this would fetch data from the server
  // For demonstration, we'll use the dummy data
  
  const timeSlots = document.querySelectorAll('.time-slot');
  if (!timeSlots.length) return;
  
  // Check if we have availability data for this date and table
  const key = `${date}_${selectedTable}`;
  const availability = availabilityData[key] || [];
  
  timeSlots.forEach(slot => {
    const time = slot.getAttribute('data-time');
    const isAvailable = !availability.includes(time);
    
    // Update the time slot appearance
    if (isAvailable) {
      slot.classList.remove('fully-booked');
      slot.classList.add('available');
      slot.setAttribute('data-available', 'true');
    } else {
      slot.classList.remove('available');
      slot.classList.add('fully-booked');
      slot.setAttribute('data-available', 'false');
    }
  });
  
  // Update booking summary if it exists
  updateBookingSummary();
}

/**
 * Set up event listener for date changes
 */
function setupDateChangeListener() {
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    dateInput.addEventListener('change', function() {
      selectedDate = this.value;
      updateCalendarAvailability(selectedDate);
    });
  }
}

/**
 * Initialize quantity buttons for pre-ordering
 */
function initializeQuantityButtons() {
  const qtyButtons = document.querySelectorAll('.qty-btn');
  
  qtyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const input = this.parentElement.querySelector('.qty-input');
      const currentQty = parseInt(input.value);
      
      if (this.classList.contains('qty-minus') && currentQty > 0) {
        input.value = currentQty - 1;
      } else if (this.classList.contains('qty-plus')) {
        input.value = currentQty + 1;
      }
      
      // Update the hidden input for this item if it exists
      const itemId = this.closest('.pre-order-item').getAttribute('data-item-id');
      const hiddenInput = document.getElementById(`item-qty-${itemId}`);
      if (hiddenInput) {
        hiddenInput.value = input.value;
      }
      
      // Update booking summary if it exists
      updateBookingSummary();
    });
  });
}

/**
 * Update booking summary information
 */
function updateBookingSummary() {
  const summaryElement = document.getElementById('booking-summary');
  if (!summaryElement) return;
  
  let summaryText = '';
  
  // Add selected table info
  if (selectedTable) {
    const tableElement = document.querySelector(`.table[data-table-id="${selectedTable}"]`);
    const seats = tableElement ? tableElement.getAttribute('data-seats') : '';
    summaryText += `<p><strong>Table:</strong> #${selectedTable} (${seats} seats)</p>`;
  }
  
  // Add selected date info
  if (selectedDate) {
    const date = new Date(selectedDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
    summaryText += `<p><strong>Date:</strong> ${formattedDate}</p>`;
  }
  
  // Add selected time slot
  const selectedTimeSlot = document.querySelector('.time-slot.selected');
  if (selectedTimeSlot) {
    summaryText += `<p><strong>Time:</strong> ${selectedTimeSlot.textContent}</p>`;
  }
  
  // Add pre-ordered items
  const orderedItems = [];
  document.querySelectorAll('.pre-order-item').forEach(item => {
    const qty = parseInt(item.querySelector('.qty-input').value);
    if (qty > 0) {
      const name = item.querySelector('.item-name').textContent;
      const price = item.querySelector('.item-price').textContent;
      orderedItems.push({ name, price, qty });
    }
  });
  
  if (orderedItems.length > 0) {
    summaryText += '<p><strong>Pre-ordered Items:</strong></p><ul>';
    let total = 0;
    
    orderedItems.forEach(item => {
      const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      const subtotal = itemPrice * item.qty;
      total += subtotal;
      
      summaryText += `<li>${item.name} x ${item.qty} = $${subtotal.toFixed(2)}</li>`;
    });
    
    summaryText += `</ul><p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
  }
  
  // Update the summary element
  summaryElement.innerHTML = summaryText;
}

/**
 * Populate dummy availability data for demonstration
 */
function populateDummyAvailabilityData() {
  // Create some random unavailable time slots for the next few days
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    const dateStr = date.toISOString().split('T')[0];
    
    // Create unavailable times for each table
    for (let tableId = 1; tableId <= 10; tableId++) {
      const key = `${dateStr}_${tableId}`;
      
      // Random unavailable time slots
      const unavailableTimes = [];
      const numUnavailable = Math.floor(Math.random() * 5); // 0-4 unavailable time slots
      
      const allTimes = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
      
      for (let j = 0; j < numUnavailable; j++) {
        const randomIndex = Math.floor(Math.random() * allTimes.length);
        unavailableTimes.push(allTimes[randomIndex]);
        allTimes.splice(randomIndex, 1); // Remove the time so we don't pick it again
      }
      
      availabilityData[key] = unavailableTimes;
    }
  }
}
        