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
var url = "mongodb+srv://nishianand:lol1234@grass.cbgqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new WebAppStrategy({
    clientId: "c8f94fdd-fa43-4a92-8ea6-9e59d8c8c5ff",
    tenantId: "a8dd73d8-66f8-4305-8e3d-8b16ba8b1ece",
    secret: "ZDE0MThiYjgtNWE4NC00YTU5LTkzOTAtYzAyNjNiOTZlOGNj",
	oauthServerUrl: "https://eu-gb.appid.cloud.ibm.com/oauth/v4/a8dd73d8-66f8-4305-8e3d-8b16ba8b1ece",
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
}));

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




app.get("/shop", (req, res) => {
    res.render("shop");
});

app.get("/qr-scanner", (req, res) => {
    res.render("scanner");
});

app.post("/newReward", (req, res) => {
    res.render("profile", {qrcode: req.body.qrcode});
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.listen(port, () => console.log("Server at " + port))