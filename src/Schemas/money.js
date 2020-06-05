const mongoose = require('mongoose');

const moneySchema = mongoose.Schema({
    userID: String,
    money: Number,
    bank: Number
});

module.exports = mongoose.model("Money", moneySchema)