var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
	product: String,
    price: Number,
	productImage: String,
    productPageLink: String
});

module.exports = mongoose.model('Product', productSchema);