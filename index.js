const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

// connect the views path
app.set(path.join(__dirname,"views"));

// connect the public path
app.use(express.static(path.join(__dirname,"public")));

// convert to parase data
app.use(express.urlencoded({extended:true}));

// use for json data
app.use(express.json());

app.listen(port,()=>{
    console.log("port listening");
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

// quantity select

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newQty = req.body.qty;

    let item = items.find((i)=>id === i.id);
    item.qty=newQty;
    res.redirect("/kbt/bill");
})

app.get("/kbt/qty",(req,res)=>{
    res.render("item-qty.ejs",{items});
})

// bill 
app.get("/kbt/bill",(req,res)=>{
    res.render("bill.ejs");
})