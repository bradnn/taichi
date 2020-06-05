const mongoose = require('mongoose');

const levelSchema = mongoose.Schema({
    userID: String,
    exp: Number
});

module.exports = mongoose.model("Level", levelSchema)