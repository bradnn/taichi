const money = require('../Schemas/money.js');
const mongoose = require('mongoose');
module.exports = function addCoins(userid, amount) {

    money.findOne({
        userID: userid
    }, (err, moneys) => {
        if (err) console.log(err);

        if (!moneys) {
            const newmoney = new money({
                userID: userid,
                money: amount,
                bank: 0
            });

            newmoney.save();
        } else {
            moneys.money = moneys.money + amount;
            moneys.save();
        }
    });

}