const mongoose= require("mongoose");
const Review= require("./Reviews");

const ListingSchema= new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,default:"https://static.vecteezy.com/system/resources/thumbnails/023/103/916/small_2x/not-available-rubber-stamp-seal-vector.jpg"},
    price:{type:Number,required:true},
    location:{type:String,required:true},
    country:{type:String,required:true},
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"Review"}],
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true});

ListingSchema.post("findOneAndDelete",async (listing)=>{
        if((listing.reviews.length)>0){
            await Review.deleteMany({_id:{$in:listing.reviews}})
        }
})

const Lisiting= mongoose.model("Listing",ListingSchema);

module.exports= Lisiting;