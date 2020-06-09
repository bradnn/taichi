const mongoose = require('mongoose');

const shipSchema = mongoose.Schema({
    first: String,
    second: String,
    ship: Number,
});

module.exports = mongoose.model("Ship", shipSchema)