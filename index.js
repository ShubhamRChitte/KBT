const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const methodOverride = require("method-override");

// connect the views path
app.set(path.join(__dirname,"views"));

// connect the public path
app.use(express.static(path.join(__dirname,"public")));

// convert to parase data
app.use(express.urlencoded({extended:true}));

// use for json data
app.use(express.json());

// Use method override for PUT, PATCH, DELETE requests
app.use(methodOverride("_method"));

app.listen(port,()=>{
    console.log("port listening on " + port);
})

let items = [
    
    {
        id:1,
        name:"Tea",
        price : 10,
        content:"Tea is the magic key to the vault where my brain is kept.",
        qty:1
    },
    {
        id:2,
        name: "Coffee",
        price : 20,
        content:"Behind every successful person is a substantial amount of coffee.",
        qty:1
    }    
]


// home of the website
app.get("/kbt",(req,res)=>{
    res.render("kbtcafe.ejs");
})

// Cart page - displays items in cart
app.get("/kbt/qty",(req,res)=>{
    res.render("item-qty.ejs", {items});
})

// Update quantity
app.patch("/kbt/:id",(req,res)=>{
    let {id} = req.params;
    let newQty = req.body.qty;

    let item = items.find((i) => i.id == id);
    if (item) {
        item.qty = newQty;
    }
    
    res.redirect("/kbt/bill");
})

// API endpoint to get menu items
app.get("/api/items", (req, res) => {
    res.json(items);
});

// bill 
app.get("/kbt/bill",(req,res)=>{
    res.render("bill.ejs");
})

// Default route redirect to kbt
app.get("/", (req, res) => {
    res.redirect("/kbt");
});