const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Passport } = require("passport");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const port = 3000;

var url = "mongodb+srv://nishianand:lol1234@grass.cbgqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url,{ useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require("express-session")({
	secret: "squad404",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})

app.get("/signup", function(req, res){
    res.render("signup");
});

app.post("/signup", function(req, res){

    var newUser = new User({username: req.body.username, email: req.body.email});
    
    User.register(newUser, req.body.password, function(err, user){

        if(err){
            console.log(err)
            return res.render("signup");
        }

        passport.authenticate("local")(req, res, function(){
            res.redirect("/shop");
        });

    });
});
app.get("/login", function(req, res){
    res.render("login");
})
app.post("/login", passport.authenticate("local", {
    successRedirect: '/shop',
    failureRedirect: '/shop'
}), function(req, res){

});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/shop")
})







app.get("/shop", (req, res) => {
    res.render("shop");
});

app.get("/qr-scanner", (req, res) => {
    res.render("scanner");
});

app.post("/newReward", (req, res) => {
    const qrcode = req.body.qrcode;
    res.render("profile", {qrcode: qrcode});
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.listen(port, () => console.log("Server at " + port))