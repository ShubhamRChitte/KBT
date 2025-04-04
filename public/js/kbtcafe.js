let count = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form#addcart').forEach((form) => {
        form.addEventListener('submit', function (event) {
            count+=1;    
            let noofitems = document.querySelector(".noofitems");
            noofitems.innerText=count;        
        });
    });
});


// checking the mob no is valid or not
const phoneInput = document.getElementById("phone");

  // Restrict input to 10 digits
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10); // Allow only digits and limit to 10 characters
  });

  document.getElementById("myreserv").addEventListener("submit", function (event) {
    if (phoneInput.value.length !== 10) {
      alert("Please enter valid Mobile No");
      event.preventDefault(); // Prevent form submission if invalid
    }
  });


//   tell sure to booktable

document.getElementById("myreserv").addEventListener("submit", function (event) {
    const confirmBook = confirm("Are you sure you want to book the table?");
    if (!confirmBook) {
        event.preventDefault(); // Stop form submission if canceled
    }
  });

        