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
const Menu = require("./models/menu.js");
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


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

app.use((req, res, next) => {
    res.locals.cartCount = req.session.cart ? req.session.cart.length : 0;
    next();
  });


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


// let select_itm = [];
let select_itm = new Set();



// home of the website
app.get("/kbt",async(req,res)=>{
    let items = await Menu.find({});
    res.render("kbtcafe.ejs",{items});
});


// about
app.get("/kbt/about",(req,res)=>{
    res.render("about.ejs");
});

// menu
app.get("/kbt/menu",async(req,res)=>{
   res.render("menu.ejs");
});

// view all menu
app.get("/kbt/all_menu",async(req,res)=>{
    let items = await Menu.find({});
    res.render("all.ejs",{items});
});

// contact
app.get("/kbt/contact",(req,res)=>{
    res.render("contact.ejs");
});




// quantity select

app.get("/kbt/itm-qty",(req,res)=>{
    // const result = [...select_itm].map(item => JSON.parse(item));
    res.render("item-qty.ejs",{result: req.session.cart});
})

//select item
// app.get("/kbt/:id/itm",async(req,res)=>{
//     const referer = req.get("Referer");
//     let {id} = req.params; 
//     let item = await Menu.findById(id);
//     console.log(item);
//     select_itm.add(JSON.stringify(item));
//     if (!req.session.cart) req.session.cart = [];
//     res.send(String(req.session.cart.length));
// })




app.post("/kbt/:id/itm", async (req, res) => {
    const { id } = req.params;
    const item = await Menu.findById(id);
  
    if (!req.session.cart) req.session.cart = [];
  
    const exists = req.session.cart.some(i => i._id === item._id.toString());
    if (!exists) {
      req.session.cart.push({
        _id: item._id.toString(),
        title: item.title,
        price: item.price,
        image: item.image
      });
    }
    console.log(req.session.cart);
    res.send(String(req.session.cart.length)); // Return count as plain text
  });
  

//bill
app.post("/kbt/bill", async (req, res) => {
    const selectedItems = req.body.items; // key: itemId, value: quantity
    const itemIds = Object.keys(selectedItems).filter(id => parseInt(selectedItems[id]) > 0);

    // Fetch full item details
    const items = await Menu.find({ _id: { $in: itemIds } });
  
    // Prepare bill data
    const billItems = items.map(item => {
      const qty = parseInt(selectedItems[item._id]);
      return {
        title: item.title,
        price: item.price,
        quantity: qty,
        total: item.price * qty
      };
    });
  
    const grandTotal = billItems.reduce((sum, item) => sum + item.total,0);
    const itemTotal = billItems.reduce((sum, item) => sum + item.quantity,0);
    const now = new Date();
    const date = now.toLocaleDateString(); 
    const time = now.toLocaleTimeString(); 
  
    res.render("bill.ejs", { billItems, grandTotal,date,time,itemTotal });
  });


// remove the item
app.get("/kbt/:id/remove",async(req,res)=>{
    let {id} = req.params;
    // let item = await Menu.findById(id);
    // select_itm.delete(JSON.stringify(item));

    req.session.cart = req.session.cart.filter(item => item._id !== id);
    res.redirect("/kbt/itm-qty");
})

// show item
app.get("/kbt/:id/show",async(req,res)=>{
    let {id} = req.params;
    let item = await Menu.findById(id);
    res.render("item_show.ejs",{item});
})
  

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

// update reservation
app.patch("/kbt/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let result = await Reserv.findByIdAndUpdate(id,req.body.reserv);
    res.redirect("/kbt/reserv_all")
});

// show reservation
app.get("/kbt/show-reserv/:id",async(req,res)=>{
    let {id} = req.params;
    let reserv = await Reserv.findById(id);
    res.render("reserv_show.ejs",{reserv});
});

// back button
app.get("/kbt/back",(req,res)=>{
    res.redirect("/kbt/itm-qty");
});


// item-edit
app.get("/kbt/:id/item-edit",async(req,res)=>{
    let item = await Menu.findById(req.params.id);
    res.render("item_edit.ejs",{item});
})

app.patch("/kbt/:id/item-edit",async(req,res)=>{
    await Menu.findByIdAndUpdate(req.params.id,req.body.items);
    res.redirect(`/kbt/${req.params.id}/show`);
})  


// payment
app.get("/kbt/payment",async(req,res)=>{
    res.render("payment.ejs");
})

// complete / end
app.get("/kbt/complete",async(req,res)=>{
    req.session.cart = [];
    res.redirect("/kbt");
})