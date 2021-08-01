import { CommandInteraction, Message } from "discord.js";
import BaseCommand from "../../handlers/CommandHandler/BaseCommand";
import LanguageModel from "../../db/model/LanguageModel";
import LanguageManager from "../../handlers/LanguageManager/LanguageManager";
import Embeds from "../../constants/Embeds";

export default class PingCommand extends BaseCommand {
	setup() {
		this.commandData = {
			name: 'lang',
			description: 'Change your language for the bot.',
			options: [
				{
					name: 'lang',
					description: 'The language you want to choose',
					type: 'STRING'
				}
			]
		}
	}

	async run (ctx: CommandInteraction) : Promise<any> {
		if (!ctx.options.get('lang')) {
			const language_info = await LanguageModel.findOne({ where: { userID: ctx.user.id }});
			const current_language = language_info?.get('language') as string;
			const langKey = await LanguageManager.getString(ctx.user.id, 'lang.current_language', 'language', current_language);
			if(!langKey) return ctx.reply('We encountered an error. Please try again.');

			const embed = Embeds.success(langKey);
			return ctx.reply({ embeds: [ embed ] });
		}

		// New language selection
		
		const available_languages = Object.keys(LanguageManager.languageMap).map(c => c.toLowerCase());
		const { value: language } = ctx.options.get('lang')!;
		if (!available_languages.includes(language as string)) {
			const langKey = await LanguageManager.getString(ctx.user.id, "lang.invalid_language", 'languages', Object.keys(LanguageManager.languageMap).map(c => `\`${c}\``).join(', '));
			if (!langKey) return ctx.reply('Something went wrong.');
			
			const embed = Embeds.error(langKey);
			return ctx.reply({embeds: [ embed ]})
		}

		// Get the language code
		let translatedLang: string;
		for (const lang of Object.keys(LanguageManager.languageMap)) {
			if (lang.toLowerCase() == language) {
				translatedLang = lang;
				//@ts-ignore
				const lang_key = LanguageManager.languageMap[lang];
				await LanguageModel.update({ language: lang_key }, { where: { userID: ctx.user.id }});
			}
		}

		const langKey = await LanguageManager.getString(ctx.user.id, 'lang.changed_language', 'language', translatedLang!);
		if (!langKey) return ctx.reply('Something went wrong.');

		const embed = Embeds.success(langKey);
		ctx.reply({ embeds: [ embed ]});
	}
}