const Command = require('../../structures/Command.js');
const { MessageEmbed, Client } = require('discord.js');
const shipSchema = require('../../Schemas/ship.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bradn:eorXgV34icTCFwWr@cluster0-d992c.azure.mongodb.net/taichi?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['thotrate']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        var firstArg = args[0];
        var secondArg = args[1];
        var firstid = "";
        var secondid = "";

        if (!firstArg) {
            message.channel.send('Please supply a user.');
            return;
        }
        if (!secondArg) {
            var secondArg = "<@" + message.author.id + ">"
            var firstid = firstArg.slice(3, -1);
            var secondid = message.author.id;


            shipSchema.findOne({
                first: firstid,
                second: secondid
            }, (err, ship) => {
                if (err) console.log(err);

                if (!ship) {
                    let rating = Math.floor(Math.random() * 99) + 1;
                    const newship = new shipSchema({
                        first: firstid,
                        second: secondid,
                        ship: rating
                    });

                    newship.save();
                    let shipEmbed = new MessageEmbed()
                        .setTitle('💞 Ship')
                        .addField(`🔽 First`, `${firstArg}`, true)
                        .addField(`Rating`, `${rating}/100`, true)
                        .addField(`🔼 Second`, `${secondArg}`, false);
                    message.channel.send(shipEmbed);
                } else {
                    if (ship.second !== secondid) {
                        let rating = Math.floor(Math.random() * 99) + 1;
                        const newship = new shipSchema({
                            first: firstid,
                            second: secondid,
                            ship: rating
                        });

                        newship.save();
                        let shipEmbed = new MessageEmbed()
                            .setTitle('💞 Ship')
                            .addField(`🔽 First`, `${firstArg}`, true)
                            .addField(`Rating`, `${rating}/100`, true)
                            .addField(`🔼 Second`, `${secondArg}`, false);
                        message.channel.send(shipEmbed);
                    } else {
                        let rating = ship.ship;
                        let shipEmbed = new MessageEmbed()
                            .setTitle('💞 Ship')
                            .addField(`🔽 First`, `${firstArg}`, true)
                            .addField(`Rating`, `${rating}/100`, true)
                            .addField(`🔼 Second`, `${secondArg}`, false);
                        message.channel.send(shipEmbed);
                    }
                }
            });

        } else {
            if (firstArg.startsWith('<@') && firstArg.endsWith('>')) {
                if (secondArg.startsWith('<@') && secondArg.endsWith('>')) {

                    

                    var firstid = firstArg.slice(3, -1);
                    var secondid = secondArg.slice(3, -1);


                    shipSchema.findOne({
                        first: firstid,
                        second: secondid
                    }, (err, ship) => {
                        if (err) console.log(err);

                        if (!ship) {
                            let rating = Math.floor(Math.random() * 99) + 1;
                            const newship = new shipSchema({
                                first: firstid,
                                second: secondid,
                                ship: rating
                            });

                            newship.save();
                            let shipEmbed = new MessageEmbed()
                                .setTitle('💞 Ship')
                                .addField(`🔽 First`, `${firstArg}`, true)
                                .addField(`Rating`, `${rating}/100`, true)
                                .addField(`🔼 Second`, `${secondArg}`, false);
                            message.channel.send(shipEmbed);
                        } else {
                            if (ship.second !== secondid) {
                                let rating = Math.floor(Math.random() * 99) + 1;
                                const newship = new shipSchema({
                                    first: firstid,
                                    second: secondid,
                                    ship: rating
                                });

                                newship.save();
                                let shipEmbed = new MessageEmbed()
                                    .setTitle('💞 Ship')
                                    .addField(`🔽 First`, `${firstArg}`, true)
                                    .addField(`Rating`, `${rating}/100`, true)
                                    .addField(`🔼 Second`, `${secondArg}`, false);
                                message.channel.send(shipEmbed);
                            } else {
                                let rating = ship.ship;
                                let shipEmbed = new MessageEmbed()
                                    .setTitle('💞 Ship')
                                    .addField(`🔽 First`, `${firstArg}`, true)
                                    .addField(`Rating`, `${rating}/100`, true)
                                    .addField(`🔼 Second`, `${secondArg}`, false);
                                message.channel.send(shipEmbed);
                            }
                        }
                    });
                } else {
                    message.channel.send(`Please tag this user. \`${secondArg}\``);
                }
            } else {
                message.channel.send(`Please tag this user. \`${firstArg}\``);
            }
        }

    }
};