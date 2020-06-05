const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['flip']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        let side = Math.floor(Math.random()*2) + 1;

        if(side === 1){
            var result = "Heads";
        }else if(side === 2){
            var result = "Tails";
        }else{
            var result = "SUPER RARE THIRD SIDE";
        }
        
        message.channel.send(`You flipped a \`${result}\``);
    }
};