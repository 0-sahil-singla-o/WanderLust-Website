const mongoose= require("mongoose");
const Listing= require("../../../models/Listing");
const Review= require("../../../models/Reviews");

const GetListing= async function(req,res,next){
    try{

        let page= req.query.page;
        let search= req.query.search;
        console.log(search)
        if(search){
            console.log("error ese agge")
            let searchedListings= await Listing.find({title:{ $regex: search , $options: 'i'}}).skip((page-1)*12).limit(12)
            console.log(searchedListings);
            let totalPages= Math.ceil((searchedListings.length)/12);
            console.log(totalPages)
            return res.status(200).send({status:true,data:{searchedListings,totalPages}});
        }

        let alllistings= await Listing.find({});
        let listings= await Listing.find({}).skip((page-1)*12).limit(12);
        let totalPages= Math.ceil((alllistings.length)/12);
        console.log(listings);
        return res.status(200).send({status:true,data:{listings,totalPages}});
    }catch(error){
        return res.status(500).send({status:false,message:{path:"server",msg:"server error during GET Listings request"}});
    }
}

const GetIndividualListing= async function(req,res,next){
    try{
        let {id}= req.params;
        let currentUser= req.user;
        console.log(id);
        let listingData= await Listing.findOne({_id:id}).populate("owner")
        console.log(currentUser)
        let reviewsArray= await Review.find({_id:{$in:listingData.reviews}}).populate("author")
        console.log(reviewsArray)
        return res.status(200).send({status:true,data:{listingData,reviewsArray,currentUser}});
    }catch(error){
        return res.status(500).send({status:false,message:{path:"server",msg:"server error during GET individual Listing request"}});
    }
}

const AddNewListing= async function(req,res,next){
    try{
         let data= req.body;
         console.log(data);
         let image= req.file.path;
         console.log(image)
         let newListing= new Listing({
            title:data.title,
            description:data.description,
            image:image,
            price:data.price,
            country:data.country,
            location:data.location,
            owner:req.user._id
         })
         await newListing.save();
         req.flash("success","new listing is created sucessfully!");
         return res.status(200).send({status:true,message:"New Listing is created"});
    }catch(error){
        return res.status(500).send({status:false,message:{path:"server",msg:"server error during Add New Listing request",error}});
    }
}

const Edit_Listing_Form = async function(req,res,next){
    try{
        let id= req.params.id;
        let listingData = await Listing.findOne({_id:id});
        console.log(listingData)
        return  res.status(200).send({status:true,data:listingData});
    }catch(error){
        return res.status(500).send({status:false,message:{path:"server",msg:"server error during getting listing data for edit  request",error}});
    }
}

const Edit= async function(req,res,next){
    try{
        let data= req.body;
        let image= req.file.path;
        let {id}= req.params;
        await Listing.findByIdAndUpdate(id,{
            title:data.title,
            description:data.description,
            image:image,
            price:data.price,
            country:data.country,
            location:data.location
        })
        return res.status(200).send({status:true,message:"edit done"});
    }catch(error){
        return res.status(500).send({status:false,message:{path:"server",msg:"server error during edit listing request",error}});
    }
}


const DeleteListing= async function(req,res,next){
   try{
       let id= req.params.id;
       console.log(id);
       await Listing.findByIdAndDelete(id);
       return res.status(200).send({status:true,message:"deleted"});
   }catch(error){
    return res.status(500).send({status:false,message:{path:"server",msg:"server error during delete Listing request",error}});
}
}

const CreateReview= async function(req,res,next){
    try{
        let data= req.body;
        console.log(data);
        let listingId= req.params.id;
        console.log(listingId);
        let review= new Review({
            comment:data.comment,
            rating:data.rating,
            author:req.user._id
        })
        await review.save();
        await Listing.findByIdAndUpdate(listingId,{$push:{reviews:review}})

        return res.status(200).send({status:true,message:"review is saved"});
    }catch(err){
        return res.status(500).send({status:false,message:{path:"server",msg:"server error during Create Review Request",error:err}})
    }
}

const DeleteReview= async function(req,res,next){
    try{
        let reviewId= req.params.reviewId;
        let listingId= req.params.id;
        await Listing.findByIdAndUpdate(listingId,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        return res.status(200).send({status:true,message:"review is deleted"});
    }catch(err){
        return res.status(500).send({status:false,message:{path:"server",msg:"server error during Delete Review Request",error:err}})
    }
}

const Logout= async function(req,res,next){
    try{
       req.logout((err)=>{
           if(err){
              return res.status(400).send({stauts:"false",message:{path:"server",msg:err.message}})
           }
           return res.status(200).send({status:"true",messgae:"you are logged out"})
       })
    }catch(err){
        return res.status(500).send({status:false,message:{path:"server",msg:"server error during Logout request",error:err}})
    }
}

module.exports = {GetListing,GetIndividualListing,AddNewListing,Edit_Listing_Form,Edit,DeleteListing,CreateReview,DeleteReview,Logout}