const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

let responses = [
    "It is certain",
    "Without a doubt",
    "You may rely on it",
    "Yes definitely",
    "It is decidedly so",
    "As I see it, yes",
    "Most likely",
    "Yes",
    "Outlook Good",
    "Signs point to yes",
    "Reply hazy try again",
    "Better not tell you now",
    "Ask again later",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "Outlook not so good",
    "My sources say no",
    "Very doubtful",
    "My reply is no",
    "No way",
    "No",
    "LOL FUNNY",
    "Just shut your mouth."
];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['speak']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        let question = args.join(" ")
        let response = responses[Math.floor(Math.random()*responses.length)];

        let embed = new MessageEmbed()
        .setDescription('🎱 **8Ball**')
        .addField('Question', question, true)
        .addField('Response', response, true)
        .setFooter('The 8ball has spoken.')
        .setTimestamp();
        
        message.channel.send(embed);
    }
};