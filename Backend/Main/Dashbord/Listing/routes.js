const express= require("express");
const router= express.Router();
const {GetListing,GetIndividualListing,AddNewListing,Edit_Listing_Form,Edit,DeleteListing,CreateReview,DeleteReview,Logout}= require("./controller");
const upload= require("../../../middlewares/cloudinaryFile");
const isUserEqualReview= require("../../../middlewares/isUserEqualReview");

router.get("/",GetListing);

router.get("/logout",Logout);

router.get("/:id",GetIndividualListing)

router.post("/newlisting",upload.single("image"),AddNewListing);

router.get("/editlistingform/:id",Edit_Listing_Form);

router.put("/edit/:id",upload.single("image"),Edit);

router.delete("/delete/:id",DeleteListing);

router.post("/:id/review",CreateReview);

router.delete("/:id/review/:reviewId",isUserEqualReview,DeleteReview)



module.exports= router;