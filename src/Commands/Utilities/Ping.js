const Command = require('../../structures/Command.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['pong']
        });
    }

    async run(message) {
        const pingMessage = await message.channel.send('Pinging...');

        const ping = pingMessage.createdTimestamp - message.createdTimestamp;
        
        pingMessage.edit(`🏓 **|** Bot Latency: \`${ping}ms\` API Latency: \`${Math.round(this.client.ws.ping)}ms\``);
    }
}