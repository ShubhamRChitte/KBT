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

        