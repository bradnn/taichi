const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../../config.json');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['support']
        });
    }

    async run(message) {
        const helpEmbed = new MessageEmbed()
        .setTitle('Commands')
        .addField(`Economy`, `**${prefix}deposit** Deposit money to your bank\n**${prefix}lootbox** Open and view lootboxes\n**${prefix}money** View your balance\n**${prefix}withdraw** Withdraw money from your bank`)
        .addField(`Fun`, `**${prefix}8ball** Ask the magic 8ball a question\n**${prefix}boomer** See someones boomer rate\n**${prefix}clap** Sassy.\n**${prefix}coinflip** Flip a coin\n**${prefix}howgay** See how gay someone is\n**${prefix}howsimp** See how much of a simp someone is\n**${prefix}howthot** See how much of a thot someone is\n**${prefix}penissize** See how big someones penis is\n**${prefix}ship** Ship 2 people ** \`WIP\` **`)
        .addField(`Utilities`, `**${prefix}help** Displays this message\n**${prefix}ping** Shows the bots ping\n**${prefix}say** Make the bot say something.\n**${prefix}uptime** Shows the bot uptime`);

        message.channel.send(helpEmbed);
    }
}