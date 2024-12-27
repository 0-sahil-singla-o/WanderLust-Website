const Review= require("../models/Reviews");

async function isUserEqualReview(req,res,next){
    let reviewId= req.params.reviewId;
    let review= await Review.findById(reviewId);
    console.log(review);
    let userId= req.user._id
    console.log(userId)
    console.log(review.author)
    if((userId=!(review.author))){
        return res.status(500).send({status:false,message:{path:"server",msg:"you have no permission to delete this review"}})
    }
    next()
}

module.exports= isUserEqualReview;