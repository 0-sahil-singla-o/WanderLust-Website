const mongoose= require("mongoose");
const dotenv= require("dotenv").config()
const url= process.env.Atlas_URL
console.log(url)
const Connect= async function(req,res,next){
        await mongoose.connect(url);
        console.log("connected to the database");
}

module.exports= Connect;