const Command = require('../../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const money = require('../../../Schemas/money.js');
const mongoose = require('mongoose');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['withd']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        var amount = parseInt(args[0]);

        if(!args[0]){
            message.channel.send(`Please provide a number.`);
        }else{
            money.findOne({
                userID: message.author.id
            }, (err, moneys) => {
                if (err) console.log(err);
    
                let moneyEmbed = new MessageEmbed()
                    .setTitle(`${message.author.username}'s bank`);
    
                if (!moneys) {
                    const newmoney = new money({
                        userID: message.author.id,
                        money: 0,
                        bank: 0
                    });
    
                    newmoney.save();
                    message.channel.send(`You don't have any money to withdraw!`)
                } else {
                    if(amount === "all"){
                        message.channel.send(`We withdrew \`${moneys.bank}\` from your bank!`);
                        moneys.money = moneys.money + moneys.bank;
                        moneys.bank = moneys.bank - moneys.bank;
                        moneys.save();
                    }else if(amount <= moneys.bank){

                        moneys.money = moneys.money + amount;
                        moneys.bank = moneys.bank - amount;
                        moneys.save();
                        message.channel.send(`We withdrew \`${amount}\` from your bank!`);

                    }else{
                        message.channel.send(`You don't have enough money`)
                    }
                }
            });
        }


    }
};