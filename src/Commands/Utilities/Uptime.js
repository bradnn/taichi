const Command = require('../../structures/Command.js');
const ms = require('ms');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['onlinetime']
        });
    }

    async run(message) {
        message.channel.send(`I have been online for \`${ms(this.client.uptime, { long: true })}\``)
    }
}