import { Message, MessageEmbed, User } from "discord.js";
import { Model } from "sequelize/types";
import { client } from "..";

export default class Embeds {

	public static success(content: string) {
		const embed = new MessageEmbed();
		embed.setColor("#34f13a");
		embed.setDescription(content);
		return embed;
	}

	public static warning(content: string) {
		const embed = new MessageEmbed();
		embed.setColor("#ecfc00");
		embed.setDescription(content);
		return embed;
	}

	public static error(content: string) {
		const embed = new MessageEmbed();
		embed.setColor("#fc0000");
		embed.setDescription(content);
		return embed;
	}
}