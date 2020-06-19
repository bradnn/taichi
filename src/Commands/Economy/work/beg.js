const Command = require('../../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const addCoins = require('../../../Functions/addCoins.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['begpls']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args, client) {
        if(client.cooldowns.has(message.author.id)){
            message.channel.send('Please wait \`5 minutes\` before begging again.');
            return;
        }
        client.cooldowns.add(message.author.id);
        setTimeout(() => {
            client.cooldowns.delete(message.author.id);
        }, 300000);



        // -------------------------------------------------
        //                COMMAND HERE
        // -------------------------------------------------

        const workEmbed = new MessageEmbed()
        .setTitle(`${message.author.username}'s work`);

        if(Math.floor(Math.random() * 999) + 1 > 950){
            var amount = (Math.floor(Math.random()*50) +20 )* 2;
            const messages = [`They felt bad and gave ${message.author.username} ${amount} coins!`, `You got lucky, ${message.author.username}! A random person gave you ${amount} coins.`];
            let randomMsg = messages[Math.floor(Math.random()*messages.length)];
            addCoins(message.author.id, amount);

            workEmbed.setDescription(`${randomMsg}\n** \`LUCKY\` ** You got double coins!`);

        }else{
            var amount = (Math.floor(Math.random()*50) +20 );
            const messages = [`They felt bad and gave ${message.author.username} ${amount} coins!`, `You got lucky, ${message.author.username}! A random person gave you ${amount} coins.`];
            let randomMsg = messages[Math.floor(Math.random()*messages.length)];
            addCoins(message.author.id, amount);

            workEmbed.setDescription(`${randomMsg}`);
        }

        message.channel.send(workEmbed);
    }
};