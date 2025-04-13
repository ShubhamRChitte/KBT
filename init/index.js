const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Menu = require("../models/menu.js");
const initdata = require("./data.js");

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

const initDB = async()=>{
    await Menu.deleteMany({});
    await Menu.insertMany(initdata.data);
    console.log("data was initialized!");
}

initDB();