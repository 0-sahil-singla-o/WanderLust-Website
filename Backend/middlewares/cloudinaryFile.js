const dotenv= require("dotenv").config()
const cloudinary = require('cloudinary').v2;
const multer= require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Key,
    api_secret: process.env.Cloud_Secret,
  });

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req,file)=>{
      try{
        let name= req.body.title;
        let imageName= `${name}_${Date.now()}`
        console.log(imageName);
       return  {
        folder: 'Listing_Images', // Folder name in Cloudinary
        public_id: imageName,
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed file formats
      }
      }catch(error){
        console.log(error);
        return res.status(500).send({status:false,message:{path:"server",msg:"Server Error During Image Upload"}})
      }
       
    }
    ,
  });

const upload = multer({ storage });


module.exports= upload;