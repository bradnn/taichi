const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['gayrate']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {

        if(!args){
            var user = message.author.username
        }else{
            var user = message.mentions.users.first();
            if(user === undefined){
                var user = args[0];
            }else{
                var user = user.username;
            }
        }
        let rating = Math.floor(Math.random()*99) + 1;

        let embed = new MessageEmbed()
        .setDescription('🌈 **How gay**')
        .addField('User', user, true)
        .addField('Rating', rating + '/100', true)
        .setTimestamp();

        if(rating > 70){
            embed.setFooter('Damn... you\'re pretty gay');
        }else if(rating < 20){
            embed.setFooter('You are very straight.');
        }else{
            embed.setFooter('The rating is facts. don\'t argue.');
        }
        
        message.channel.send(embed);
    }
};