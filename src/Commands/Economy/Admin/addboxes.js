const Command = require('../../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bradn:eorXgV34icTCFwWr@cluster0-d992c.azure.mongodb.net/taichi?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
const lootboxes = require('../../../Schemas/lootbox.js');
const addBoxes = require('../../../Functions/addBoxes.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['addloots']
        });
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        mongoose.connect('mongodb+srv://bradn:eorXgV34icTCFwWr@cluster0-d992c.azure.mongodb.net/taichi?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });

        message.delete();

        let type = args[0];
        if(!message.author.id === '263789620007927813') return;
        let member = message.mentions.users.first();
        console.log(`added ${args[1]} ${type} boxes to ${member.username}`);
        message.channel.send(`added ${args[1]} ${type} boxes to ${member.username}`);
        if(!member === undefined){
            addBoxes(message.author.id, args[1], type);
        }else{
            addBoxes(member.id, args[1], type);
        }
    }
};