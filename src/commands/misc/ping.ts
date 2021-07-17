import { Message } from "discord.js";
import { client } from "../..";
import Embeds from "../../constants/Embeds";
import BaseCommand from "../../handlers/CommandHandler/BaseCommand";
import LanguageManager from '../../handlers/LanguageManager/LanguageManager';

export default class PingCommand extends BaseCommand {
	setup() {
		this.name = "ping";
		this.command = "ping";
		this.description = "Show the bot its ping!"
		this.usage = "ping";
		this.category = "misc";
	}

	async run (_: string, args: string[], msg: Message) : Promise<any> {
		const message = await msg.channel.send('Pong!');
		const ping = message.createdTimestamp - msg.createdTimestamp;

		const langKey = await LanguageManager.getString(msg.author.id, 'general.ping', 'ping', `${ping}`, 'api', `${Math.round(client.ws.ping)}`)
		if (!langKey) return msg.channel.send('We encountered an error. Please try again.')

		await message.edit({ embeds: [ Embeds.success(langKey)] });
	}
}