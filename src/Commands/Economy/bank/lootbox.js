const Command = require('../../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const addCoins = require('../../../Functions/addCoins.js');
const lootboxes = require('../../../Schemas/lootbox.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bradn:eorXgV34icTCFwWr@cluster0-d992c.azure.mongodb.net/taichi?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['lootboxes', 'lb']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {

        lootboxes.findOne({
            userID: message.author.id
        }, (err, boxes) => {
            if(err) console.log(err);

            let boxesEmbed = new MessageEmbed()
                .setTitle(`${message.author.username}'s lootboxes`)
                .setFooter('t!lootbox open <Crate Type>');

            if(!boxes){

                if(args[0] === "open") message.channel.send(`You dont have any boxes to open!`);
                boxesEmbed.setDescription(`**Legendary**: \`0\`\n**Rare**: \`0\`\n**Basic**: \`0\``);

                message.channel.send(boxesEmbed)
            }else{
                if(args[0] === "open"){
                    let type = args[1].toLowerCase();
                    if(type === "legendary"){
                        if(boxes.legendary > 0){
                            boxes.legendary = boxes.legendary - 1;
                            boxes.save();
                            let amount = Math.floor(Math.random()*3000) + 2000;
                            addCoins(message.author.id, amount);
                            message.channel.send(`You have opened a \`${type}\` crate and got \`$${amount}\`!`)
                        }else{
                            message.channel.send(`You don't have anymore crates!`)
                        }
                    }else if(type === "rare"){
                        if(boxes.rare > 0){
                            boxes.rare = boxes.rare - 1;
                            boxes.save();
                            let amount = Math.floor(Math.random()*500) + 1000;
                            addCoins(message.author.id, amount);
                            message.channel.send(`You have opened a \`${type}\` crate and got \`$${amount}\`!`)

                        }else{
                            message.channel.send(`You don't have enough crates!`)
                        }
                    }else if(type === "basic"){
                        if(boxes.basic > 0){
                            boxes.basic = boxes.basic - 1;
                            boxes.save();
                            let amount = Math.floor(Math.random()*250) + 100;
                            addCoins(message.author.id, amount);
                            message.channel.send(`You have opened a \`${type}\` crate and got \`$${amount}\`!`)
                        }else{
                            message.channel.send(`You don't have enough crates!`)
                        }
                    }else{
                        message.channel.send(`Please provide a valid crate type.`)
                    }
                }else{
                    boxesEmbed.setDescription(`**Legendary**: \`${boxes.legendary}\`\n**Rare**: \`${boxes.rare}\`\n**Basic**: \`${boxes.basic}\``);
    
                    message.channel.send(boxesEmbed)
                }
            }
        });
    }
};