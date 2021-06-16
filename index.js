const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/shop", (req, res) => {
    res.render("shop");
});

app.get("/qr-scanner", (req, res) => {
    res.render("scanner");
});

app.post("/scan", (req, res) => {
    const qrcode = req.body.qrcode;
    res.render("scan", {qrcode: qrcode});
});

app.listen(port, () => console.log("Server at " + port))