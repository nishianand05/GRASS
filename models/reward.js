var mongoose = require("mongoose");

var rewardSchema = new mongoose.Schema({
    rewardName: String,
    rewardDes: String,
    points: Number
});

module.exports = mongoose.model('Reward', rewardSchema);