const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['clapmessage']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        let ClapMessage = args.join(" 👏 ")
        
        message.channel.send(ClapMessage);
    }
};