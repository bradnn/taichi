const mongoose = require('mongoose');

const lootboxSchema = mongoose.Schema({
    userID: String,
    legendary: Number,
    rare: Number,
    basic: Number
});

module.exports = mongoose.model("Lootboxes", lootboxSchema)