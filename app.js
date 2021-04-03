//npm imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const methodOverride = require("method-override")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const expressSession = require("express-session")
const flash = require("connect-flash")

//config imports
try {
  var config = require('./config')
} catch (error) {
  //not working locally
}


//routes imports
const comicRoutes = require("./routes/comics")
const commentRoutes = require('./routes/comments')
const mainRoutes = require('./routes/main')
const authRoutes = require("./routes/auth")

//models imports
const Comic = require('./models/comic')
const Comment = require('./models/comment')
const User = require('./models/user')

//mongoose config
try {
  mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
} catch (error) {
  mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}

//bodyParser config
app.use(bodyParser.urlencoded({extended:true}));

//express config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json({
  type: ["application/json", "text/plain"]
}))

//expressSession config
app.use(expressSession({
  secret: process.env.ES_SECRET || config.expressSession.secret,
  resave: false,
  saveUninitialized: false
}))

//methodOverride config
app.use(methodOverride("_method"))

app.use(flash())

//passport config
app.use(passport.initialize())
app.use(passport.session()) //Allows persistent sessions
passport.serializeUser(User.serializeUser()) //What data should be stored in session
passport.deserializeUser(User.deserializeUser()) //Get the user data from the stored session
passport.use(new LocalStrategy(User.authenticate())) //Use the local strategy

//States config
app.use((req,res,next)=>{
  res.locals.user = req.user
  res.locals.errorMessage = req.flash("error")
  res.locals.successMessage = req.flash("success")
  next()
})

//routes config
app.use("/comics",comicRoutes)
app.use("/comics/:id/comments",commentRoutes)
app.use("/",mainRoutes)
app.use(authRoutes)

//start server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
