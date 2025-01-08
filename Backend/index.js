const express= require("express");
const app= express();
const Connect= require("./helper/DataBaseConnect");
const mongoose= require("mongoose");
const cors= require("cors");
const dotenv= require("dotenv").config()
const session= require("express-session");
const MongoStore = require('connect-mongo');
const flash= require("connect-flash");
const passport= require("passport");
const DatabaseUrl= process.env.Atlas_URL;
const localStrategy= require("passport-local");
const GoogleStrategy= require("passport-google-oauth20");
const onabordingRouter= require("./Main/Onaboarding/routes");
const User= require("./models/user");
const isAuthenticated= require("./middlewares/isAuthenticated");
//access to the modules-->
const ListingRouter= require("./Main/Dashbord/Listing/routes");
// To connect to the database-->
Connect();

// middlewares for the http request parsing-->

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:false}));
 
app.set('trust proxy', 1)

const store= MongoStore.create({
  mongoUrl: DatabaseUrl,
  crypto:{
    secret: process.env.Secret
  },
  touchAfter: 24*3600
})

store.on("error",()=>{
  console.log("error in Session store",error);
})

const sessionOptions= {
    store,
    secret: process.env.Secret,
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000 ,// 7 days
        maxAge:  7*24*60*60*1000,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    }

}

// making session stateful protocol->
app.use(session(sessionOptions));

app.use(flash());

// initialize the passport to accept authentication requests.
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy({usernameField:"email"},User.authenticate())) // local strategy for the passport.js for authentication..
console.log( process.env.GOOGLE_CLIENT_ID)

passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://wanderlust-website-md7k.onrender.com/api/onabording/login/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Step 1: Check if a user with this Google ID already exists
        let user = await User.findOne({ googleId: profile.id });
  
        if (user) {
          // User already exists with this Google ID
          return done(null, user);
        }
  
        // Step 2: Check if a user with this email already exists
        user = await User.findOne({ email: profile.emails[0].value });
  
        if (user) {
          // User exists with the same email, update their googleId
          user.googleId = profile.id;
          user.authProvider = 'google';
          user.avatar = profile.photos[0]?.value || ''; // Update avatar if needed
          await user.save();
          return done(null, user);
        }
  
        // Step 3: If no user exists, create a new user
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0]?.value || '',
        });
  
        await newUser.save();
        return done(null, newUser);
      } catch (error) {   
        return done(error, null);
      }
    }
  ));

// it will add our User to the session and also deserialize it whenever user's session is completed or expired.
passport.serializeUser((user,done)=>{
    console.log("this working?????");
    console.log(req.session);
    done(null,user._id);
});

passport.deserializeUser(async (_id,done)=>{
      console.log(_id)
      const user= await User.findById(_id);
      done(null,user);
});

const corsOptions = {
    origin: 'https://wanderlust-website-1-3g7o.onrender.com', // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',         // Allow only GET and POST methods
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,// Specify allowed headers
};

app.use(cors(corsOptions));

app.get("/api",(req,res,next)=>{
    try{
        if(req.session.count){
            console.log(req.session)
            req.session.count++;
        }
        else{
            req.session.count=2;
        }
        console.log(res.getHeaders()); 
        return res.status(200).send({status:true,message:"everything works correct!!",data:req.session.count});
    }
    catch(error){
        return res.status(500).send({status:false,message:{path:"server",msg:"unknown server error-->",error}});
    }
})

app.use("/api/isAuthenticated",(req,res,next)=>{
    console.log(req.isAuthenticated())
    console.log("why is this working>")
    if(req.isAuthenticated()){
        
     return  res.status(200).send({status:true,message:"user is authenticated"})
    }
       return res.status(500).send({status:false,message:{path:"isAuthenticated",msg:"you are not authenticated"}})
})

app.use("/api/onabording",onabordingRouter);

app.use(isAuthenticated);

app.use("/api/dashbord",ListingRouter);



const port= 4000;
app.listen(port,()=>{
    console.log("server is started");
})