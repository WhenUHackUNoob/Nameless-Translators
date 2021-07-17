import { Message } from "discord.js";
import { client } from "../..";
import Embeds from "../../constants/Embeds";
import BaseCommand from "../../handlers/CommandHandler/BaseCommand";

export default class PingCommand extends BaseCommand {
	setup() {
		this.name = "ping";
		this.command = "ping";
		this.description = "Show the bot its ping!"
		this.usage = "ping";
		this.category = "misc";
	}

	async run(_: string, _args: string[], msg: Message) {
		const message = await msg.channel.send('Pong!');
		const ping = message.createdTimestamp - msg.createdTimestamp;
		await message.edit({ embeds: [ Embeds.success(`🏓Latency is ${ping}ms. API Latency is ${Math.round(client.ws.ping)}ms`)] });
	}
}