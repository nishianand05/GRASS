var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	username: String,
    email: String,
	picture: String,

	rewards:[ {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reward"            
        }
    }]
	
});

module.exports = mongoose.model('User', userSchema);