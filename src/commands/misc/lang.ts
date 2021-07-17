import { Message } from "discord.js";
import BaseCommand from "../../handlers/CommandHandler/BaseCommand";
import LanguageModel from "../../db/model/LanguageModel";
import LanguageManager from "../../handlers/LanguageManager/LanguageManager";
import Embeds from "../../constants/Embeds";

export default class PingCommand extends BaseCommand {
	setup() {
		this.name = "lang";
		this.command = "lang";
		this.description = "Select your language!"
		this.usage = "lang <language>";
		this.category = "misc";
	}

	async run (_: string, args: string[], msg: Message) : Promise<any> {
		if (!args[0]) {
			const language_info = await LanguageModel.findOne({ where: { userID: msg.author.id }});
			const current_language = language_info?.get('language') as string;
			const langKey = await LanguageManager.getString(msg.author.id, 'lang.current_language', '<language>', current_language);
			if(!langKey) return msg.channel.send('We encountered an error. Please try again.');

			const embed = Embeds.success(langKey);
			return msg.channel.send({ embeds: [ embed ] });
		}

		// New language selection
		
		const available_languages = Object.keys(LanguageManager.languageMap).map(c => c.toLowerCase());
		const language = args[0];
	
		if (!available_languages.includes(language.toLowerCase())) {
			const langKey = await LanguageManager.getString(msg.author.id, "lang.invalid_language", '<languages>', Object.keys(LanguageManager.languageMap).map(c => `\`${c}\``).join(', '));
			if (!langKey) return msg.channel.send('Something went wrong.');
			
			const embed = Embeds.error(langKey);
			return msg.channel.send({embeds: [ embed ]})
		}

		// Get the language code
		let translatedLang: string;
		for (const lang of Object.keys(LanguageManager.languageMap)) {
			if (lang.toLowerCase() == args[0]) {
				translatedLang = lang;
				//@ts-ignore
				const lang_key = LanguageManager.languageMap[lang]
				await LanguageModel.update({ language: lang_key }, { where: { userID: msg.author.id }});
			}
		}

		const langKey = await LanguageManager.getString(msg.author.id, 'lang.changed_language', '<language>', translatedLang!);
		if (!langKey) return msg.channel.send('Something went wrong.');

		const embed = Embeds.success(langKey);
		msg.channel.send({ embeds: [ embed ]});
	}
}