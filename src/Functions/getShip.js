const shipSchema = require('../Schemas/ship.js');
const mongoose = require('mongoose');
module.exports = function addCoins(firstid, secondid) {
     shipSchema.findOne({
         first: firstid,
         second: secondid
     }, (err, ship) => {
         if (err) console.log(err);

         if (!ship) {
            let rating = Math.floor(Math.random()*99) + 1;
            const newship = new shipSchema({
                first: firstid,
                second: secondid,
                ship: rating
            });

            newship.save();
        } else {
            if(ship.second !== secondid){
                let rating = Math.floor(Math.random()*99) + 1;
                const newship = new shipSchema({
                    first: firstid,
                    second: secondid,
                    ship: rating
                });
    
                newship.save();
            }else{
                let rating = ship.ship;
            }
        }
    });

}