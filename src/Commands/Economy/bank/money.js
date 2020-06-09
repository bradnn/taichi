const Command = require('../../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const money = require('../../../Schemas/money.js');
const mongoose = require('mongoose');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['balance', 'bal']
        });
    }
    // eslint-disable-next-line no-unused-vars
    async run(message, args, bot) {
        var member = message.mentions.users.first();
        if(member !== undefined){
            money.findOne({
                userID: member.id
            }, (err, moneys) => {
                if(err) console.log(err);
    
                let moneyEmbed = new MessageEmbed()
                    .setTitle(`${member.username}'s balance`);
    
                if(!moneys){
                    const newmoney = new money({
                        userID: member.id,
                        money: 0,
                        bank: 0
                    });
    
                    newmoney.save();
                    moneyEmbed.setDescription(`**Balance**: \`0\`\n**Bank**: \`0\``)
    
                    message.channel.send(moneyEmbed)
                }else{
                        moneyEmbed.setDescription(`**Balance**: \`${moneys.money}\`\n**Bank**: \`${moneys.bank}\``)
        
                        message.channel.send(moneyEmbed)
                }
            });
        }else if(args[0] === "top"){
            money.find({}).sort([['money', -1]]).exec(function(err, docs) {
                const topEmbed = new MessageEmbed()
                .setTitle(`Top Balances`)
                .setDescription(`🥇 <@${docs[0].userID}> **-** ${docs[0].money}\n🥈 <@${docs[1].userID}> **-** ${docs[1].money}\n🥉 <@${docs[2].userID}> **-** ${docs[2].money}\n**#4** <@${docs[3].userID}> **-** ${docs[3].money}\n**#5** <@${docs[4].userID}> **-** ${docs[4].money}`);

                message.channel.send(topEmbed);
            });
        }else{
            money.findOne({
                userID: message.author.id
            }, (err, moneys) => {
                if(err) console.log(err);
    
                let moneyEmbed = new MessageEmbed()
                    .setTitle(`${message.author.username}'s balance`);
    
                if(!moneys){
                    const newmoney = new money({
                        userID: message.author.id,
                        money: 0,
                        bank: 0
                    });
    
                    newmoney.save();
                    moneyEmbed.setDescription(`**Balance**: \`0\`\n**Bank**: \`0\``)
    
                    message.channel.send(moneyEmbed)
                }else{
                        moneyEmbed.setDescription(`**Balance**: \`${moneys.money}\`\n**Bank**: \`${moneys.bank}\``)
        
                        message.channel.send(moneyEmbed)
                }
            });
        }

        
    }
};