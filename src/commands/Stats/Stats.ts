import { Message, MessageEmbed, MessageReaction, User } from 'discord.js';
import Command from "../../handlers/CommandHandler/BaseCommand";
import LanguageManager from '../../handlers/LanguageManager/LanguageManager';
import { config } from '../..';
import Embeds from '../../constants/Embeds';
import fetch from 'node-fetch';

const discord_emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

interface languageInfo {
	iso639_1: string
	iso639_2: string
	name: string
	nativeName: string
}

export default class StatsCommand extends Command {
	setup() {
		this.name = "stats";
		this.command = "stats";
		this.description = "Display stats about a language";
		this.usage = "stats <language>";
		this.category = "stats";
	}

	async run (_: string, args: string[], msg: Message) : Promise<any> {
		if (!args[0]) {
			const langKey = await LanguageManager.getString(msg.author.id, 'general.usage', '<usage>', `${config.prefix}${this.usage}`);
			if (!langKey) return msg.reply('We encountered an error. Please try again.');
			const embed = Embeds.error(langKey);

			return msg.channel.send({ embeds: [ embed ]});
		}

		// Check if there is a response from weblate with the inputted argument(s)
		const encodedArgs = encodeURIComponent(args.join(' '));
		let weblateResponse = await fetch(`https://translate.namelessmc.com/api/languages/${encodedArgs}/statistics/?format=json`).then((res) => res.json());

		if (weblateResponse.detail) {
			const languageCode = await this.extractLanguageCode(args, msg);
			weblateResponse = await fetch(`https://translate.namelessmc.com/api/languages/${languageCode}/statistics/?format=json`).then((res) => res.json());
			
			if (weblateResponse.detail) {
				const langKey = await LanguageManager.getString(msg.author.id, 'stats.no_data_found');
				if (!langKey) return msg.reply('We encountered an error. Please try again.');

				const embed = Embeds.error(langKey);
				return msg.channel.send({ embeds: [ embed ]});
			}
		}

		let userFriendlyResponse = JSON.stringify(weblateResponse, null, 4)
		const embed = new MessageEmbed()
			.setTitle(`Statistics: ${weblateResponse.name}`)
			.setColor("GREEN")
			.setTimestamp()
			.setDescription(userFriendlyResponse)
			.setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`)
		
		msg.channel.send({ embeds: [ embed ]})
	}

	async extractLanguageCode(args: string[], msg: Message) {
		return new Promise(async (resolve) => {
			const country = args.join(' ');
			const url = `https://restcountries.eu/rest/v2/name/${encodeURIComponent(country)}`;
			const countryInfo = await fetch(url).then((res) => res.json()).then((res) => res[0]);

			const langKey = await LanguageManager.getString(msg.author.id, 'stats.no_country_found')
			if(!langKey) return msg.channel.send('We encountered an error. Please try again.')

			if (!countryInfo) return msg.channel.send({ embeds: [ Embeds.error(langKey) ] });

			const languages = countryInfo.languages as languageInfo[];
			let languageCode;
			if (languages.length == 1) {
				languageCode = languages[0].iso639_1;
			} else {

				const description = [];
				for (let i = 0; i < languages.length; i++) {
					description.push(`${discord_emotes[i]} ${languages[i].name}`);
				}
				const embed = Embeds.success(`React with the emote of the language you want to choose\n` + description.join('\n'));
				embed.setTitle("Choose language");

				const message = await msg.channel.send({ embeds: [ embed ]});
				for (let i = 0; i < languages.length; i++) {
					await message.react(discord_emotes[i]);
				}

				const filter = (reaction: MessageReaction, user: User) => discord_emotes.includes(reaction.emoji.name!) && !user.bot && user.id == msg.author.id;

				const collected = await message.awaitReactions({ filter, time: 60 * 1000, max: 1 });
				const reaction = collected.first();
				if (!reaction || !reaction.emoji) return;

				const index = discord_emotes.indexOf(reaction.emoji.name!);
				languageCode = languages[index].iso639_1;
			} 

			resolve(languageCode);
		})
	}
}