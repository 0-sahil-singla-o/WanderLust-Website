const Data= require("./SampleData");
const Lisiting = require("../models/Listing");
const mongoose= require("mongoose")
const dotenv= require("dotenv").config()
const url= process.env.Atlas_URL;
console.log(url)
console.log(process.env.Cloud_Secret)
const Connect= async function(req,res,next){
    await mongoose.connect(url);
    console.log("connected to the database");
}
Connect()
const Initialize= async function(req,res,next){
    const newData=Data.map((listing)=>{return {...listing,owner:'6769155e040d7e505edbe263'}});
    await Lisiting.insertMany(newData);
    console.log("inserted");
}

Initialize();

