const Command = require('../../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const addCoins = require('../../../Functions/addCoins.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['workhard']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args, client) {
        if(client.cooldowns.has(message.author.id)){
            message.channel.send('Please wait \`1 minute\` before working again.');
            return;
        }
        client.cooldowns.add(message.author.id);
        setTimeout(() => {
            client.cooldowns.delete(message.author.id);
        }, 60000);



        // -------------------------------------------------
        //                COMMAND HERE
        // -------------------------------------------------

        const workEmbed = new MessageEmbed()
        .setTitle(`${message.author.username}'s work`);

        if(Math.floor(Math.random() * 999) + 1 > 950){
            var amount = (Math.floor(Math.random()*600) +200 )* 2;
            const messages = [`Great work ${message.author.username}! You just earned yourself ${amount} coins.`, `That was amazing ${message.author.username}! For that you get ${amount} coins.`];
            let randomMsg = messages[Math.floor(Math.random()*messages.length)];
            addCoins(message.author.id, amount);

            workEmbed.setDescription(`${randomMsg}\n\n** \`LUCKY\` ** You got double coins!`);

        }else{
            var amount = Math.floor(Math.random()*600) +200;
            const messages = [`Great work ${message.author.username}! You just earned yourself ${amount} coins.`, `That was amazing ${message.author.username}! For that you get ${amount} coins.`];
            let randomMsg = messages[Math.floor(Math.random()*messages.length)];
            addCoins(message.author.id, amount);

            workEmbed.setDescription(`${randomMsg}`);
        }

        message.channel.send(workEmbed);
    }
};