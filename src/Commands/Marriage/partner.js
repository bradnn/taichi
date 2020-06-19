const Command = require('../../structures/Command.js');
const { MessageEmbed, Collector, Message } = require('discord.js');
const marriage = require('../../Schemas/marriage.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['mypartner']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, [target]) {
        const member = message.mentions.members.last() || message.guild.members.cache.get(target);

        if (member) {
            marriage.findOne({
                userID: member.id
            }, (err, marry) => {

                if(!marry){
    
                    let partnerEmbed = new MessageEmbed()
                    .setDescription(`${member} is not married!`)
                    .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true}))
                    .setTimestamp();

                    message.channel.send(partnerEmbed);
                }else{

                    if(marry.partner === undefined){
    
                        let partnerEmbed = new MessageEmbed()
                        .setDescription(`${member} is not married!`)
                        .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true}))
                        .setTimestamp();
    
                        message.channel.send(partnerEmbed);
                    }else{
                    let person1 = message.guild.members.cache.get(marry.userID);
                    let person2 = message.guild.members.cache.get(marry.partner);

                    let partnerEmbed = new MessageEmbed()
                    .setDescription(`${person1} is married to ${person2}.`)
                    .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true}))
                    .setTimestamp();

                    message.channel.send(partnerEmbed);
                    }
                    
                }

            });
        } else {
            marriage.findOne({
                userID: message.author.id
            }, (err, marry) => {

                if(!marry){
    
                    let partnerEmbed = new MessageEmbed()
                    .setDescription(`You are not married!`)
                    .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true}))
                    .setTimestamp();

                    message.channel.send(partnerEmbed);
                }else{

                    if(marry.partner === undefined){
    
                        let partnerEmbed = new MessageEmbed()
                        .setDescription(`You are not married!`)
                        .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true}))
                        .setTimestamp();
    
                        message.channel.send(partnerEmbed);
                    }else{
                        let person1 = message.guild.members.cache.get(marry.userID);
                        let person2 = message.guild.members.cache.get(marry.partner);
    
                        let partnerEmbed = new MessageEmbed()
                        .setDescription(`${person1} is married to ${person2}.`)
                        .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true}))
                        .setTimestamp();
    
                        message.channel.send(partnerEmbed);
                    }
                    
                }

            });
        }


    }
};