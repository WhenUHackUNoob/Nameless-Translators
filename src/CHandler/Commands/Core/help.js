const { time } = require('console');
const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json');
const bot = require('../../../index');

module.exports = {
    name: 'help',
    description: 'Get information on all of the commands!',
    usage: `$phelp`,
    hidden: false,

	async run (msg, args, sender) {

        msg.channel.send("Command unavailable!")
	}
}