const Command = require('../../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const money = require('../../../Schemas/money.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bradn:eorXgV34icTCFwWr@cluster0-d992c.azure.mongodb.net/taichi?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
const addCoins = require('../../../Functions/addCoins.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['sendmoney']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        
        let member = message.mentions.users.first();
        let amount = parseInt(args[1]);

        if(member === undefined){
            message.channel.send(`Please provide a user.`);
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
                    message.channel.send(`You don't have any money to pay!`)
                } else {
                    if(amount <= moneys.money){

                        moneys.money = moneys.money - amount;
                        moneys.save();
                        addCoins(member.id, amount);
                        message.channel.send(`We sent \`${amount}\` to ${member}`);

                    }else{
                        message.channel.send(`You don't have enough money`)
                    }
                }
            });
        }


    }
};