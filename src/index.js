// Require dependencies

const Discord = require("discord.js");
const config = require("./config.json");
require("colors");

// Create client

const bot = new Discord.Client();
module.exports = bot;

// Ready event
bot.on("ready", async () => {
    console.log("[".gray + "C".green + "] ".gray + `Client created. Username: ${bot.user.username}`)
    bot.user.setActivity("Loading...", {type: "WATCHING"})
    bot.user.setStatus("idle")

    require("./CHandler/handler")

    console.log("[".gray + "D".red + "] ".gray +"Bot has been started!")
})

bot.login(config.token)