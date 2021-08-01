import { CommandInteraction, Message } from "discord.js";
import { client } from "../..";
import Embeds from "../../constants/Embeds";
import BaseCommand from "../../handlers/CommandHandler/BaseCommand";
import LanguageManager from '../../handlers/LanguageManager/LanguageManager';

export default class PingCommand extends BaseCommand {
	setup() {
		this.commandData = {
			name: 'ping',
			description: 'Get the current ping of the discord bot',
		}
	}

	async run (ctx: CommandInteraction) : Promise<any> {
		await ctx.reply('Pong!');
		const message = await ctx.fetchReply() as Message;
		const ping = message.createdTimestamp - ctx.createdTimestamp;

		const langKey = await LanguageManager.getString(ctx.user.id, 'general.ping', 'ping', `${ping}`, 'api', `${Math.round(client.ws.ping)}`)
		if (!langKey) return ctx.followUp('We encountered an error. Please try again.')

		await message.edit({ embeds: [ Embeds.success(langKey)] });
	}
}