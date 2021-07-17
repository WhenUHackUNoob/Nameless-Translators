import { Message } from "discord.js";
import { client } from "../..";
import Embeds from "../../constants/Embeds";
import BaseCommand from "../../handlers/CommandHandler/BaseCommand";

export default class PingCommand extends BaseCommand {
	setup() {
		this.name = "lang";
		this.command = "lang";
		this.description = "Select your language!"
		this.usage = "lang <language>";
		this.category = "misc";
	}

	async run(_: string, _args: string[], msg: Message) {
		msg.channel.send(`Waiting for Supernoober100 to do his magic`)
	}
}