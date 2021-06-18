const dotenv = require('dotenv');
dotenv.config();

// Require

const express = require('express'); 	
const app = express();
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');							
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;	

const User = require("./models/user.js");

// Default port
const port = 3000;

// MongoDB
var url = process.env.DB_URL;
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url,{ useNewUrlParser: true });
mongoose.set('useFindAndModify', false);


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Authentications

app.use(session({
	secret: '123456',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new WebAppStrategy({
    clientId: process.env.CLIENT_ID,
    tenantId: process.env.TENANT_ID,
    secret: process.env.SECRET,
	oauthServerUrl: process.env.OAUTH_SERVER_URL,
	redirectUri: "http://localhost:3000/appid/callback"
}));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
    // console.log(req.user.name)
	next();
})



// Routes


app.get('/appid/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: '/shop',
	forceLogin: true
}), function(req, res){
    console.log(req);
});

app.get('/appid/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME));


app.get('/appid/logout', function(req, res){
	WebAppStrategy.logout(req);
	res.redirect('/shop');
});


// Make sure only requests from an authenticated browser session can reach /api
app.use('/api', (req, res, next) => {
	if (req.user){
		next();
	} else {
		res.status(401).send("Unauthorized");
	}
});

// The /api/user API used to retrieve name of a currently logged in user
app.get('/api/user', (req, res) => {
	res.json({
		user: {
			name: req.user.name,
            email: req.user.email,
            picture: req.user.picture,

		}
	});
});


app.get("/", (req, res) => {
    res.redirect("/shop");
});

app.get("/shop", (req, res) => {
    res.render("shop");
});

app.get("/qr-scanner", (req, res) => {
    res.render("scanner");
});

app.post("/newReward/profile", (req, res) => {
    res.render("profile", {qrcode: req.body.qrcode});
});

app.get("/profile", (req, res) => {
    res.render("profile", {qrcode: undefined});
});

app.listen(process.env.PORT || port, () => console.log("Server running"))