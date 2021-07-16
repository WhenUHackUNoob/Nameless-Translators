// Dependencies

const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const bot = require('../index');
const config = require('../config.json');

// Getting Command Categories

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
const categories = dirs('./src/CHandler/Commands');

// Collections

bot.commands = new Object();
bot.commands.info = new Discord.Collection();
bot.commands.categories = new Discord.Collection();

// Loading Commands

console.log("[".gray + "D".red + "]".gray + " Loading all commands.".white)

for (const category of categories) {

    if (category === "Owner" || config.modules[category] === true) {

        let commandList = [];
        const commands = fs.readdirSync(`./src/CHandler/Commands/${category}`).filter(file => file.endsWith('.js'));

        for (const file of commands) {
            try {
                let command = require(`./Commands/${category}/${file}`);
                command.category = category;
                bot.commands.info.set(command.name, command);
                commandList.push(command)
            } catch (e) {
                console.log(`Error while loading command ${file}:`.red);
                console.log(e);
            }
        }

        bot.commands.categories.set(category, commandList)

    }

}

console.log("[".gray + "D".red + "]".gray + " Loaded all commands.".white)

bot.on('message', async msg => {
    if ((!msg.guild) || msg.channel.type === 'dm') return;
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();
    command = bot.commands.info.get(command);

    if (command) {
        if (command.permission) {
            if(!(msg.member.hasPermission(command.permission))) {
                msg.channel.send(noPerms(msg.author));
                return;
            }
        }
        try {
            await command.run(msg, args, msg.author);
        } catch (e) {
            console.log(`We encountered an error while executing ${command.name}:`.red);
            console.log(e);

            msg.channel.send('An internal error occoured while executing your command. Please report to an admin.')
        }
    }
    
});

function noPerms(user) {
    const embed = new Discord.MessageEmbed()
        .setTitle(`No Permission`)
        .setColor("RED")
        .setDescription("You do not have the correct permissions to execute this command.") 
        .setFooter(`Requested by ${user.username}#${user.discriminator}`);
    return embed;
}