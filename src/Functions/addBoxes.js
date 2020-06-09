const boxes = require('../Schemas/lootbox.js');
const mongoose = require('mongoose');
module.exports = function addCoins(userid, amount, type) {
    var amount = parseInt(amount);


    boxes.findOne({
        userID: userid
    }, (err, lootbox) => {
        if (err) console.log(err);

        if (!lootbox) {

            if(type === "legendary"){
                const newboxes = new boxes({
                    userID: userid,
                    legendary: amount,
                    rare: 0,
                    basic: 0
                });

                newboxes.save();
            }else if(type === "rare"){
                const newboxes = new boxes({
                    userID: userid,
                    legendary: 0,
                    rare: amount,
                    basic: 0
                });

                newboxes.save();

            }else{
                const newboxes = new boxes({
                    userID: userid,
                    legendary: 0,
                    rare: 0,
                    basic: amount
                });

                newboxes.save();

            }
        } else {

            if(type === "legendary"){
                lootbox.legendary = lootbox.legendary + amount;
            }else if(type === "rare"){
                lootbox.rare = lootbox.rare + amount;

            }else{
                lootbox.basic = lootbox.basic + amount;

            }
            lootbox.save();
        }
    });

}