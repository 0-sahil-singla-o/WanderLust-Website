const mongoose= require("mongoose");
const PassportLocalMongoose= require("passport-local-mongoose")


const UserSchema= new mongoose.Schema({
    name:{
         type:String,
         required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    googleId: {
        type: String, 
        unique: true,
        sparse: true 
    },

    avatar: {
        type: String
    },
    
})

UserSchema.plugin(PassportLocalMongoose , { usernameField: 'email' });

const User= mongoose.model("User",UserSchema);

module.exports= User;