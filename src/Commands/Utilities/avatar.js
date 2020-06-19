const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['av', 'pfp']
        });
    }

    async run(message, [target]) {
        const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
        const embed = new MessageEmbed()
            .setDescription(`**__${member.user.username}__ Avatar**`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024}))
            .setColor('GREEN')
            .addField(`Link`, `[Click Here](${member.user.displayAvatarURL({ dynamic: true })})`);

        message.channel.send(embed);
    }
}