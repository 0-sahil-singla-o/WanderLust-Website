const isAuthenticated= async function (req,res,next){
    console.log(req.isAuthenticated())
   if(req.isAuthenticated()){
       return next();
   }
      return res.status(500).send({status:false,message:{path:"isAuthenticated",msg:"you are not authenticated"}})
}

module.exports=isAuthenticated