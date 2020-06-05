const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['boomerrate']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {

        if(!args) message.channel.send("Please give a user.");
        var user = message.mentions.users.first();
        if(user === undefined){
            var user = args[0];
        }else{
            var user = user.username;
        }
        let rating = Math.floor(Math.random()*99) + 1;

        let embed = new MessageEmbed()
        .setDescription('👴 **How much of a boomer**')
        .addField('User', user, true)
        .addField('Rating', rating + '/100', true)
        .setTimestamp();

        if(rating > 70){
            embed.setFooter('Damn ur old.');
        }else if(rating < 30){
            embed.setFooter('Congrats.');
        }else{
            embed.setFooter('wtf r u');
        }
        
        message.channel.send(embed);
    }
};