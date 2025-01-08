const passport = require("passport");
const User= require("../../models/user");


const register= async function(req,res,next){
   try{
      let data= req.body;
      console.log(data)
      if(data.password!=data.confirmpassword){
        return res.status(500).send({status:false,message:{path:"register",msg:"confirmpassword is not equal to the password"}});  
      }

      let user= new User({
        name:data.name,
        email:data.email,
      })

      let registeredUser= await User.register(user,data.password);
      return res.status(200).send({status:true,message:"register successfull"});
   }catch(error){
      return res.status(500).send({status:false,message:{path:"register",msg:error}});
   }
}

const login= async function(req,res,next){
   try{
      console.log("hello")
      const count = req.session.count;
      passport.authenticate("local",(err,user,info)=>{
         if(err){
            return res.status(500).send({status:false,message:{path:"Strategyserver",msg:err.message}})
         }
         if(!user){
            return res.status(400).send({status:false,message:{path:"login",msg:info.name}})
         }
         req.login(user,(err)=>{
           
            if(err){
               return res.status(500).send({status:false,message:{path:"server",msg:err.message}})
            }
               req.session.count = count;
               return  res.status(200).send({status:true,message:"login succesful"})
         })
       
      })(req, res, next); // this is the middleware so we have to use this in the last..
   }catch(err){
      return res.status(500).send({status:false,message:{path:"Routeserver",msg:err.message}})
   }
}

const GoogleLogin= async function(req,res,next){
   try{
      const count = req.session.count;
      console.log("HELLO HEHE")
      passport.authenticate("google",(err,user,info)=>{
         if(err){
            return  res.status(500).send({status:false,message:{path:"server",msg:err.message}})
         } 
          if(!user){
            return res.status(400).send({status:false,message:{path:"login",msg:info.name}})
          }

          req.login(user,(err)=>{
            if(err){
               return res.status(500).send({status:false,message:{path:"server",msg:err.message}})
            }
            req.session.count = count;
            return res.redirect("https://wanderlust-website-1-3g7o.onrender.com/dashbord");
          })
      })(req, res, next); 
   }catch(err){
      return res.status(500).send({status:false,message:{path:"server",msg:err.message}})
   }
}

module.exports= {register,login,GoogleLogin};