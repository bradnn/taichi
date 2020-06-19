const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js')
const { kissFile } = require('../../assets/actiongif.json');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['kisses']
        });
    }

    async run(message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var kiss = kissFile[Math.round(Math.random() * (kissFile.length -1))];

        var embed = new MessageEmbed()
        .setImage(kiss);

        if(!recipient){
            const noUser = [`Do you need a friend?...`, `I'll give you a kiss!`, `I'll kiss you if noone else will`, `Kissing yourself...`];
            var noUserMessage = noUser[Math.round(Math.random() * (noUser.length -1))];
            embed.setAuthor(noUserMessage, message.author.avatarURL())
        }else if(message.mentions.users.first() === message.author || recipient === message.author.username){
            const kissSelf = [`Do you need a friend?...`, `You really just kissed yourself...`, `How did you manage to kiss yourself..`, `Kissing yourself...`];
            var kissSelfMessage = kissSelf[Math.round(Math.random() * (kissSelf.length -1))];
            embed.setAuthor(kissSelfMessage, message.author.avatarURL())
        }else{

            if(message.mentions.users.first() != undefined){
                var recipient = message.mentions.users.first().username;
            }

            const kissOther = [`${message.author.username} gives ${recipient} a kiss!`, `${message.author.username} gives ${recipient} a kiss`, `${message.author.username} kisses ${recipient}... that was cute`];
            var kissOtherMessage = kissOther[Math.round(Math.random() * (kissOther.length -1))];
            embed.setAuthor(kissOtherMessage, message.author.avatarURL())
        }

        message.channel.send(embed);
    }
}