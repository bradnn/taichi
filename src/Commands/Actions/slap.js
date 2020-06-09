const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js')
const { slapFile } = require('../../assets/actiongif.json');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['hardslap']
        });
    }

    async run(message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var slap = slapFile[Math.round(Math.random() * (slapFile.length -1))];

        var embed = new MessageEmbed()
        .setImage(slap);

        if(!recipient){
            const noUser = [`Why are you hitting yourself?`, `Weak.`, `That mustve hurt`, `Do it again I dare you.`];
            var noUserMessage = noUser[Math.round(Math.random() * (noUser.length -1))];
            embed.setAuthor(noUserMessage, message.author.avatarURL())
        }else if(message.mentions.users.first() === message.author || recipient === message.author.username){
            const slapSelf = [`Why are you hitting yourself?`, `Weak.`, `That mustve hurt`, `Do it again I dare you.`];
            var slapSelfMessage = slapSelf[Math.round(Math.random() * (slapSelf.length -1))];
            embed.setAuthor(slapSelfMessage, message.author.avatarURL())
        }else{

            if(message.mentions.users.first() != undefined){
                var recipient = message.mentions.users.first().username;
            }

            const slapOther = [`${message.author.username} slaps ${recipient}. Ouch.`, `${message.author.username} slaps ${recipient}. That must've hurt`, `${message.author.username} slaps ${recipient} lightly, try harder next time`];
            var slapOtherMessage = slapOther[Math.round(Math.random() * (slapOther.length -1))];
            embed.setAuthor(slapOtherMessage, message.author.avatarURL())
        }

        message.channel.send(embed);
    }
}