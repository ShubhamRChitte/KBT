const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    description : String,
    image :{
        filename:String,
        url:String,
    },
    price:Number,
});

const Menu = mongoose.model("Menu",listingSchema);

module.exports = Menu;