const Command = require('../../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Money = require('../../../Schemas/money.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['fiftyfifty']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args, client) {
        if(client.cooldowns.has(message.author.id)){
            message.channel.send('Please wait \`3 seconds\` before gambling again.');
            return;
        }
        client.cooldowns.add(message.author.id);
        setTimeout(() => {
            client.cooldowns.delete(message.author.id);
        }, 3000);

        Money.findOne({
            userID: message.author.id
        }, (err, money) => {
            if(err) console.log(err);

            if(!money){
                message.channel.send(`You have no money to gamble with!`);
            }else{
                let amount = parseInt(args[0]);

                if(!isNaN(amount)){
                    if (amount > money.money){
                        message.channel.send(`You don't have enough money for this`);
                    }else{
                        if(Math.floor(Math.random() * 99) + 1 > 50){
                            money.money = money.money + amount;
                            money.save();

                            message.channel.send(`You doubled your money! You now have $${money.money}!`);
                        }else{
                            money.money = money.money - amount;
                            money.save();

                            message.channel.send(`You lost $${amount}! Better luck next time.`);
                        }
                    }
                }else{
                    message.channel.send(`Please provide a valid number.`);
                }


            }


        });

    }
};