const Command = require('../../structures/Command.js');
const { MessageEmbed, Collector } = require('discord.js');
const marriage = require('../../Schemas/marriage.js');
const { isUndefined } = require('util');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['marryme']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, [target]) {
        const member = message.mentions.members.last() || message.guild.members.cache.get(target);


        const filter = (reaction, user) => {
            return user.id === member.id;
        };

        if (!member) {
            message.channel.send(`Please tag a user that you want to marry!`);
        } else if(member.id === message.author.id){
            message.channel.send(`You can't marry yourself!`);
        } else {
            marriage.findOne({
                userID: message.author.id
            }, (err, marry) => {
                if (err) console.log(err);
                marriage.findOne({
                    userID: member.id
                }, (err, marry2) => {
                    if (err) console.log(err);



                    if (!marry) {
                        if (!marry2) {
                            let partnerEmbed = new MessageEmbed()
                                .setDescription(`${message.author} wants to marry you ${member}!`)
                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                .setTimestamp();

                            message.channel.send(partnerEmbed).then(msg => {

                                msg.react('✅');
                                msg.react('❌');

                                const collector = msg.createReactionCollector(filter, { time: 60000 });

                                collector.on('collect', (reaction, user) => {
                                    if (reaction.emoji.name === "✅") {
                                        let partnerEmbed = new MessageEmbed()
                                            .setDescription(`${member} said yes! congrats ${message.author}`)
                                            .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setTimestamp();

                                        message.channel.send(partnerEmbed);

                                        const newmarriage = new marriage({
                                            userID: message.author.id,
                                            partner: member.id
                                        });

                                        newmarriage.save();

                                        const newmarriage2 = new marriage({
                                            userID: member.id,
                                            partner: message.author.id
                                        });

                                        newmarriage2.save();
                                        collector.stop('DONE');
                                    } else if (reaction.emoji.name === "❌") {
                                        let partnerEmbed = new MessageEmbed()
                                            .setDescription(`They said no... Better luck next time ${message.author}!`)
                                            .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setTimestamp();

                                        message.channel.send(partnerEmbed);
                                        collector.stop('DONE');
                                    };
                                });

                                collector.on('end', collected => {
                                    if (collected.size < 1) {
                                        let partnerEmbed = new MessageEmbed()
                                            .setDescription(`They didn't even care to respond, might wanna move on.`)
                                            .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setTimestamp();

                                        message.channel.send(partnerEmbed);
                                    }
                                });

                            })
                        } else {
                            if (marry2.partner === undefined) {
                                let partnerEmbed = new MessageEmbed()
                                    .setDescription(`${message.author} wants to marry you ${member}!`)
                                    .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setTimestamp();
    
                                message.channel.send(partnerEmbed).then(msg => {


                                    msg.react('✅');
                                    msg.react('❌');

                                    const collector = msg.createReactionCollector(filter, { time: 60000 });

                                    collector.on('collect', (reaction, user) => {
                                        if (reaction.emoji.name === "✅") {
                                            let partnerEmbed = new MessageEmbed()
                                                .setDescription(`${member} said yes! congrats ${message.author}`)
                                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                                .setTimestamp();

                                            message.channel.send(partnerEmbed);

                                            const newmarriage = new marriage({
                                                userID: message.author.id,
                                                partner: member.id
                                            });

                                            newmarriage.save();


                                            marry2.partner = message.author.id;
                                            marry2.save();
                                            collector.stop('DONE');
                                        } else if (reaction.emoji.name === "❌") {
                                            let partnerEmbed = new MessageEmbed()
                                                .setDescription(`They said no... Better luck next time ${message.author}!`)
                                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                                .setTimestamp();

                                            message.channel.send(partnerEmbed);
                                            collector.stop('DONE');
                                        };
                                    });

                                    collector.on('end', collected => {
                                        if (collected.size < 1) {
                                            let partnerEmbed = new MessageEmbed()
                                                .setDescription(`They didn't even care to respond, might wanna move on.`)
                                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                                .setTimestamp();

                                            message.channel.send(partnerEmbed);
                                        }
                                    });
                                })
                            } else {
                                let partnerEmbed = new MessageEmbed()
                                    .setDescription(`${member} is already married!`)
                                    .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setTimestamp();

                                message.channel.send(partnerEmbed);
                            }
                        }
                    } else {
                        if (marry.partner === undefined) {
                            if (!marry2) {
                                let partnerEmbed = new MessageEmbed()
                                    .setDescription(`${message.author} wants to marry you ${member}!`)
                                    .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setTimestamp();
    
                                message.channel.send(partnerEmbed).then(msg => {




                                    msg.react('✅');
                                    msg.react('❌');

                                    const collector = msg.createReactionCollector(filter, { time: 60000 });

                                    collector.on('collect', (reaction, user) => {
                                        if (reaction.emoji.name === "✅") {
                                            let partnerEmbed = new MessageEmbed()
                                                .setDescription(`${member} said yes! congrats ${message.author}`)
                                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                                .setTimestamp();

                                            message.channel.send(partnerEmbed);

                                            marry.partner = member.id;
                                            marry.save();

                                            const newmarriage2 = new marriage({
                                                userID: member.id,
                                                partner: message.author.id
                                            });

                                            newmarriage2.save();
                                            collector.stop('DONE');
                                        } else if (reaction.emoji.name === "❌") {
                                            let partnerEmbed = new MessageEmbed()
                                                .setDescription(`They said no... Better luck next time ${message.author}!`)
                                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                                .setTimestamp();

                                            message.channel.send(partnerEmbed);
                                            collector.stop('DONE');
                                        };
                                    });

                                    collector.on('end', collected => {
                                        if (collected.size < 1) {
                                            let partnerEmbed = new MessageEmbed()
                                                .setDescription(`They didn't even care to respond, might wanna move on.`)
                                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                                .setTimestamp();

                                            message.channel.send(partnerEmbed);
                                        }
                                    });
                                })
                            } else if (marry2.partner === undefined) {
                                let partnerEmbed = new MessageEmbed()
                                    .setDescription(`${message.author} wants to marry you ${member}!`)
                                    .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setTimestamp();
    
                                message.channel.send(partnerEmbed).then(msg => {



                                    msg.react('✅');
                                    msg.react('❌');

                                    const collector = msg.createReactionCollector(filter, { time: 60000 });

                                    collector.on('collect', (reaction, user) => {
                                        if (reaction.emoji.name === "✅") {
                                            let partnerEmbed = new MessageEmbed()
                                                .setDescription(`${member} said yes! congrats ${message.author}`)
                                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                                .setTimestamp();

                                            message.channel.send(partnerEmbed);

                                            marry.partner = member.id;
                                            marry.save();

                                            marry2.partner = message.author.id;
                                            marry2.save();
                                            collector.stop('DONE');
                                        } else if (reaction.emoji.name === "❌") {
                                            let partnerEmbed = new MessageEmbed()
                                                .setDescription(`They said no... Better luck next time ${message.author}!`)
                                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                                .setTimestamp();

                                            message.channel.send(partnerEmbed);
                                            collector.stop('DONE');
                                        };
                                    });

                                    collector.on('end', collected => {
                                        if (collected.size < 1) {
                                            let partnerEmbed = new MessageEmbed()
                                                .setDescription(`They didn't even care to respond, might wanna move on.`)
                                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                                .setTimestamp();

                                            message.channel.send(partnerEmbed);
                                        }
                                    });
                                })
                            } else {
                                let partnerEmbed = new MessageEmbed()
                                    .setDescription(`${member} is already married!`)
                                    .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setTimestamp();

                                message.channel.send(partnerEmbed);
                            }
                        } else {
                            let partnerEmbed = new MessageEmbed()
                                .setDescription(`You are already married!`)
                                .setFooter(`t!help for more info!`, message.author.displayAvatarURL({ dynamic: true }))
                                .setTimestamp();

                            message.channel.send(partnerEmbed);
                        }
                    }






                });
            });
        }


    }
};