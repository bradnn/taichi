const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js')
const { hugFile } = require('../../assets/actiongif.json');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['bighug']
        });
    }

    async run(message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var hug = hugFile[Math.round(Math.random() * (hugFile.length -1))];

        var embed = new MessageEmbed()
        .setImage(hug);

        if(!recipient){
            const noUser = [`Do you need a friend?...`, `I'll give you a hug!`, `I'll hug you if noone else will`, `Hugging yourself...`];
            var noUserMessage = noUser[Math.round(Math.random() * (noUser.length -1))];
            embed.setAuthor(noUserMessage, message.author.avatarURL())
        }else if(message.mentions.users.first() === message.author || recipient === message.author.username){
            const hugSelf = [`Do you need a friend?...`, `You really just hugged yourself...`, `I mean I guess you can hug yourself...`, `Hugging yourself...`];
            var hugSelfMessage = hugSelf[Math.round(Math.random() * (hugSelf.length -1))];
            embed.setAuthor(hugSelfMessage, message.author.avatarURL())
        }else{

            if(message.mentions.users.first() != undefined){
                var recipient = message.mentions.users.first().username;
            }

            const hugOther = [`${message.author.username} gives ${recipient} a big hug!`, `${message.author.username} gives ${recipient} a hug`, `${message.author.username} hugs ${recipient}... that was cute`];
            var hugOtherMessage = hugOther[Math.round(Math.random() * (hugOther.length -1))];
            embed.setAuthor(hugOtherMessage, message.author.avatarURL())
        }

        message.channel.send(embed);
    }
}