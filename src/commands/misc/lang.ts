import { CommandInteraction, Message, MessageActionRow, MessageSelectMenu } from "discord.js";
import BaseCommand from "../../handlers/CommandHandler/BaseCommand";
import LanguageModel from "../../db/model/LanguageModel";
import LanguageManager from "../../handlers/LanguageManager/LanguageManager";
import Embeds from "../../constants/Embeds";

export default class PingCommand extends BaseCommand {
	setup() {
		this.commandData = {
			name: 'lang',
			description: 'Change your language for the bot.'
		}
	}

	async run (ctx: CommandInteraction) : Promise<any> {
		await ctx.deferReply();
		
		const embed = Embeds.success((await LanguageManager.getString(ctx.user.id, 'lang.select_language'))!);

		const language_info = await LanguageModel.findOne({ where: { userID: ctx.user.id }});
		const current_language = String(language_info?.get('language'));
		const available_languages = Object.keys(LanguageManager.languageMap)

		
		const row = new MessageActionRow();
		row.addComponents(
			new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder(current_language)
				.addOptions(available_languages.map(c => { return { label: c, description: `Select ${c} as your language`, value: c } }))
		);

		ctx.editReply({ embeds: [ embed ], components: [ row ]});

		// New language selection
		const filter = (i: any) => {
			i.deferUpdate();
			return i.user.id === ctx.user.id;
		};
		
		const response = await ctx.channel?.awaitMessageComponent({
			filter,
			componentType: 'SELECT_MENU',
			time: 60 * 1000
		});

		if (!response) return;

		const language = (LanguageManager.languageMap as any)[response.values[0]];
		await LanguageModel.update({ language }, { where: { userID: ctx.user.id }});

		const langKey = await LanguageManager.getString(ctx.user.id, 'lang.changed_language', 'language', response.values[0]);
		if (!langKey) return ctx.editReply('Something went wrong.');

		const embed2 = Embeds.success(langKey);
		ctx.editReply({ embeds: [ embed2 ], components: [] });
	}
}