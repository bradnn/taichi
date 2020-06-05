const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['penis']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        let size = Math.floor(Math.random()*14) + 1;
        let penis = '8' + Array(size).join('=') + 'D'
        
        message.channel.send(penis);
    }
};