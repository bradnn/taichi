const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['thotrate']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {

        if(!args[0]) message.channel.send("Please give a user.");
        if(!args[1]){
            var first = message.author;
            var second = message.mentions.users.first();
            if(second === undefined){
                var user = args[0];
            }else{
                var user = user.username;
            }
            let rating = Math.floor(Math.random()*99) + 1;
    
            let embed = new MessageEmbed()
            .setDescription('❤️ **Ship**')
            .addField('First', first, true)
            .addField('Second', second, true)
            .setTimestamp();
    
            if(rating > 70){
                embed.setFooter('Very cute together...');
            }else if(rating < 20){
                embed.setFooter('Yeah might wanna stay away from eachother');
            }else{
                embed.setFooter('Might be good? idk...');
            }
            
            message.channel.send(embed);
        }else{
            var first = message.mentions.users.first();
            var second = message.mentions.users[1];
            if(first === undefined){
                var first = args[0];
            }else{
                var first = first.username;
            }
            if(second === undefined){
                var second = args[1];
            }else{
                var second = second.username
            }
            let rating = Math.floor(Math.random()*99) + 1;
    
            let embed = new MessageEmbed()
            .setDescription('❤️ **Ship**')
            .addField('First', first, true)
            .addField('Second', second, true)
            .setTimestamp();
    
            if(rating > 70){
                embed.setFooter('Very cute together...');
            }else if(rating < 20){
                embed.setFooter('Yeah might wanna stay away from eachother');
            }else{
                embed.setFooter('Might be good? idk...');
            }

            embed.addField(`Rating`, `${rating}/100`)
            
            message.channel.send(embed);
        }
    }
};