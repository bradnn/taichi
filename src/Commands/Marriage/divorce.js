const Command = require('../../structures/Command.js');
const { MessageEmbed, Collector } = require('discord.js');
const marriage = require('../../Schemas/marriage.js');
const { isUndefined } = require('util');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['unmarry']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, [target]) {
        const member = message.mentions.members.last() || message.guild.members.cache.get(target);


        const filter = (reaction, user) => {
            return user.id === member.id;
        };

        if (!member) {
            message.channel.send(`Please tag a user that you want to divorce!`);
        } else if (member.id === message.author.id) {
            message.channel.send(`You can't divorce yourself!`);
        } else {
            marriage.findOne({
                userID: message.author.id
            }, (err, marry) => {

                if (!marry) {
                    message.channel.send('You are not married!');
                } else {
                    if (marry.partner === member.id) {
                        let partnerEmbed = new MessageEmbed()
                            .setDescription(`Are you sure you want to divorce <@${marry.partner}>?`)
                            .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                            .setTimestamp();

                        message.channel.send(partnerEmbed).then(msg => {
                            msg.react('✅');
                            msg.react('❌');

                            const collector = msg.createReactionCollector(filter, { time: 15000 });

                            collector.on('collect', (reaction, user) => {
                                if (reaction.emoji.name === "✅") {
                                    marry.partner = undefined;
                                    marry.save();
                                    marriage.findOne({
                                        userID: member.id
                                    }, (err, divorced) => {
                                        divorced.partner = undefined;
                                        divorced.save();
                                    })
                                    let partnerEmbed = new MessageEmbed()
                                        .setDescription(`${message.author}, you just divorced ${member}!`)
                                        .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                        .setTimestamp();

                                    message.channel.send(partnerEmbed);
                                } else if (reaction.emoji.name === "❌") {
                                    
                                    msg.delete();
                                    collector.stop('DONE');
                                };
                            });

                            collector.on('end', collected => {
                                if (collected.size < 1) {
                                    let partnerEmbed = new MessageEmbed()
                                        .setDescription(`You didn't confirm or deny in time! Please try again.`)
                                        .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                        .setTimestamp();

                                    msg.edit(partnerEmbed)
                                }
                            });
                        })
                    } else {
                        let partnerEmbed = new MessageEmbed()
                            .setDescription(`You are not married to this user.`)
                            .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                            .setTimestamp();

                        message.channel.send(partnerEmbed)
                    }
                }

            });
        }


    }
};