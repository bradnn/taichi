const { Client, Collection } = require('discord.js');
const Util = require('./Util.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bradn:eorXgV34icTCFwWr@cluster0-d992c.azure.mongodb.net/taichi?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
const addCoins = require('../Functions/addCoins.js');
const addBoxes = require('../Functions/addBoxes.js');

module.exports = class TaichiClient extends Client {
    constructor(options = {}) {
        super({
            disableMentions: 'everyone'
        });
        this.validate(options);

        this.cooldowns = new Set();

        this.commands = new Collection();

        this.aliases = new Collection();

        this.utils = new Util(this);

        this.once('ready', () => {
            console.log(`Logged in as ${this.user.username}!`);
        });

        this.on('message', async (message) => {
            const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
            const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);

            if (!message.guild || message.author.bot) return;

            if(Math.floor(Math.random()*999) + 1 > 980){
                if(Math.floor(Math.random()*999) + 1 > 999){
                    let coinamount = Math.floor(Math.random()*125) + 10;
    
                    addCoins(message.author.id, amount);
                    addBoxes(message.author.id, 1, "basic");
                    message.channel.send(`** \`LUCKY\` ** ${message.author.username} just found ${coinamount} coins and 1 basic lootbox while chatting!`);
                }else{
                let amount = Math.floor(Math.random()*125) + 10;

                addCoins(message.author.id, amount);
                message.channel.send(`** \`LUCKY\` ** ${message.author.username} just found ${amount} coins while chatting!`);
                }
            }

            if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\`.`);

            const prefix = message.content.match(mentionRegexPrefix) ?
                message.content.match(mentionRegexPrefix)[0] : this.prefix; // condition ? true : false

            if(!message.content.startsWith(prefix)) return;

            // eslint-disable-next-line no-unused-vars
            const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

            const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
            if(command) {
                command.run(message, args, this);
            }
        });
    }

    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Options should be a type of Object')

        if (!options.token) throw new Error('You must pass the token for the client.');
        this.token = options.token;

        if (!options.prefix) throw new Error('You must pass a prefix for the client.');

        if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of string.');
        this.prefix = options.prefix;
    }

    async start(token = this.token) {
        this.utils.loadCommands();
        super.login(token);
    }
};