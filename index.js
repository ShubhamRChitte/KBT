const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = 3000;
const methodOverride = require("method-override");
const session = require("express-session");


app.use(methodOverride("_method"));

// connect the views path
app.set("views",path.join(__dirname,"views"));
app.set('view engine', 'ejs');


// connect the public path
app.use(express.static(path.join(__dirname,"public")));

// convert to parase data
app.use(express.urlencoded({extended:true}));

// use for json data
app.use(express.json());


// mongoose connecting
const Reserv = require("./models/table_reserv.js");
const mongoURL = "mongodb://127.0.0.1:27017/kbtcafe";

main().then((res)=>{
    console.log("connected DB");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(mongoURL);   
}


app.listen(port,()=>{
    console.log("port listening");
})

// Set up session
// app.use(
//     session({
//       secret: "your_secret_key",
//       resave: false,
//       saveUninitialized: true,
//     })
//   );
  
  // Middleware to pass cart count to all EJS files
  

// app.use((req, res, next) => {
//     res.locals.cartCount = req.session.cart ? req.session.cart.length : 0;
//     next();
//   });

// cart increase value
// let count =0;
// let btns = document.querySelectorAll("menu-order");

// for(let btn of btns){
//     btn.addEventListener("click",()=>{
//         count +=1;
//     })
// }
let items = [
    
    {
        id:1,
        name:"Tea",
        price : 10,
        content:"Tea is the magic key to the vault where my brain is kept.",
        qty:1,
        src:"/images/tea-removebg-preview.png"
    },
    {
        id:2,
        name: "Coffee",
        price : 20,
        content:"Behind every successful person is a substantial amount of coffee.",
        qty:1,
        src:"/images/co.png"
    },
    {
        id:3,
        name:"Maggi",
        price : 25,
        content:"Maggi – because good things come in two minutes Maggi.",
        qty:1,
        src:"/images/maggi-removebg-preview.png"
    }, 
    {
        id:4,
        name:"Fries",
        price : 50,
        content:"Fries are crispy bites of happiness that make every moment better.",
        qty:1,
        src:"/images/french-fry-removebg-preview.png"
    }, 
    {
        id:5,
        name:"Vada Pav",
        price : 20,
        content:"Spicy, crispy, and oh-so-satisfying — that’s Vada Pav for you!",
        qty:1,
        src:"/images/vp.png"
    }, 
    {
        id:6,
        name:"Bun Maska",
        price : 49,
        content:"Bun Maska — spreading happiness, one bite at a time.",
        qty:1,
        src:"/images/bun.png"
    }


]

// initialize data
const reservations = [
    { name: "John Doe", message: "Veg", phone: "9876543210", person: "4", date: "2025-04-10", time: "19:30" },
    {  name: "Alice Smith", message: "Non-Veg", phone: "8765432109", person: "2", date: "2025-04-11", time: "18:45" },
    {  name: "Bob Johnson", message: "Veg", phone: "7654321098", person: "3", date: "2025-04-12", time: "20:00" },
    {  name: "Emily Brown", message: "Non-Veg", phone: "6543210987", person: "5", date: "2025-04-13", time: "19:00" },
    {  name: "Michael Lee", message: "Veg", phone: "5432109876", person: "2", date: "2025-04-14", time: "21:15" },
    {  name: "Sophia Wilson", message: "Non-Veg", phone: "4321098765", person: "6", date: "2025-04-15", time: "18:30" },
    {  name: "Daniel Martinez", message: "Veg", phone: "3210987654", person: "3", date: "2025-04-16", time: "20:45" },
    {  name: "Olivia Taylor", message: "Non-Veg", phone: "2109876543", person: "4", date: "2025-04-17", time: "19:15" },
    {  name: "James Anderson", message: "Veg", phone: "1098765432", person: "2", date: "2025-04-18", time: "21:00" },
    {  name: "Emma Thomas", message: "Non-Veg", phone: "0987654321", person: "5", date: "2025-04-19", time: "18:00" }
  ];
  
// Reserv.insertMany(reservations);


let select_itm = [];

// home of the website
app.get("/kbt",(req,res)=>{
    res.render("kbtcafe.ejs");
})


// about
app.get("/kbt/about",(req,res)=>{
    res.render("about.ejs");
})

// menu
app.get("/kbt/menu",(req,res)=>{
    res.render("menu.ejs");
})

// contact
app.get("/kbt/contact",(req,res)=>{
    res.render("contact.ejs");
})




// quantity select

app.get("/kbt/itm-qty",(req,res)=>{
    res.render("item-qty.ejs",{select_itm});
})

// item.js select quantity 
app.patch("/kbt/:id",(req,res)=>{
    let {id}= req.params;
    let {qty}=req.body;
    let item = select_itm.find((i)=>id == i.id);
    item.qty=qty;
    console.log(item);
})

//select item
app.get("/kbt/:id/itm",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let item = items.find((i)=>id == i.id);
    if(!(item.id in select_itm)){
        select_itm.push(item);
    }
    
    // console.log(select_itm);
    // res.render("item-qty.ejs",{select_itm});
    // res.redirect("/kbt");

    // const { id } = req.params;
    // if (!req.session.cart) req.session.cart = [];
    
    // req.session.cart.push(id);
    
    // res.redirect("back"); // Refresh page
})

// bill 
app.get("/kbt/bill",(req,res)=>{
    let it_count=0;
    let t_price =0;
    for(let i =0;i<select_itm.length;i++){
       it_count += parseInt(select_itm[i].qty);
       t_price += select_itm[i].price*parseInt(select_itm[i].qty);
    }
    const now = new Date();
    const date = now.toLocaleDateString(); 
    const time = now.toLocaleTimeString(); 

    res.render("bill.ejs",{select_itm,it_count,t_price,date,time});
})


app.post("/add-to-cart/:id", (req, res) => {
    const { id } = req.params;
    if (!req.session.cart) req.session.cart = [];
    
    req.session.cart.push(id);
    
    res.redirect("back"); // Refresh page
});

// 



// reserving the table
app.post("/kbt",async(req,res)=>{
    let custom_reserv = new Reserv(req.body.custom);
    await custom_reserv.save();
    res.redirect("/kbt");
})


// view all reservations
app.get("/kbt/reserv_all",async(req,res)=>{
    let reserv = await Reserv.find({});
    res.render("reserv_all.ejs",{reserv});
})

// delete the reservation
app.delete("/kbt/:id/reserv",async(req,res)=>{
    let {id} = req.params;
    await Reserv.findByIdAndDelete(id);
    res.redirect("/kbt/reserv_all");
});

// edit the reservation
app.get("/kbt/:id/reserv_edit",async(req,res)=>{
    let {id} = req.params;
    let reserv = await Reserv.findById(id);
    res.render("reserv_edit.ejs",{reserv});
});

app.patch("/kbt/:id/edit",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    res.redirect("/kbt/reserv_all")

});

