const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    phone : {
        type : String,
        required:true
    },
    person : {
        type : Number,
        required : true
    },
    date :{
        type : Date,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    message : {
        type : String,
    }
});

const Reserv = mongoose.model("Reserv",reservSchema);



module.exports = Reserv;