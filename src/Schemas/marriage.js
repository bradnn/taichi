const mongoose = require('mongoose');

const marrySchema = mongoose.Schema({
    userID: String,
    partner: String,
    children: Array
});

module.exports = mongoose.model("Marry", marrySchema)