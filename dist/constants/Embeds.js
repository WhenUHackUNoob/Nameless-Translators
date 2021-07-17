"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var Embeds = /** @class */ (function () {
    function Embeds() {
    }
    Embeds.success = function (content) {
        var embed = new discord_js_1.MessageEmbed();
        embed.setColor("#34f13a");
        embed.setDescription(content);
        return embed;
    };
    Embeds.warning = function (content) {
        var embed = new discord_js_1.MessageEmbed();
        embed.setColor("#ecfc00");
        embed.setDescription(content);
        return embed;
    };
    Embeds.error = function (content) {
        var embed = new discord_js_1.MessageEmbed();
        embed.setColor("#fc0000");
        embed.setDescription(content);
        return embed;
    };
    return Embeds;
}());
exports.default = Embeds;
