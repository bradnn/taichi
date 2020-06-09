const Command = require('../../../structures/Command.js');
const { mongo } = require('../../../../config.json');
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['dep']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        var amount = args[0];

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
                    message.channel.send(`You don't have any money to deposit!`)
                } else {
                    if(amount === "all"){
                        message.channel.send(`We deposited \`${moneys.money}\` to your bank!`);
                        moneys.bank = moneys.bank + moneys.money;
                        moneys.money = moneys.money - moneys.money
                        moneys.save();
                    }else if(amount <= moneys.money){

                        moneys.money = moneys.money - amount;
                        moneys.bank = moneys.bank + amount;
                        moneys.save();
                        message.channel.send(`We deposited \`${amount}\` to your bank!`);

                    }else{
                        message.channel.send(`You don't have enough money`)
                    }
                }
            });
        }


    }
};