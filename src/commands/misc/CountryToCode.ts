// Made by Supercrafter100
// Please leave my credits in here because yes
// Do not steal k ty


import { Message, MessageReaction, User } from 'discord.js';
import BaseCommand from "../../handlers/CommandHandler/BaseCommand";
import Embeds from "../../constants/Embeds";
import { config } from "../..";
import fetch from 'node-fetch';

const discord_emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

interface languageInfo {
	iso639_1: string
	iso639_2: string
	name: string
	nativeName: string
}

export default class CountrytocodeCommand extends BaseCommand {
	setup() {
		this.name = "lang";
		this.command = "lang";
		this.description = "Get the language code for a given country";
		this.usage = "lang <countryname>";
		this.category = "misc";
	}

	async run (_: string, args: string[], msg: Message) : Promise<any> {
		if (!args[0]) return msg.channel.send({ embeds: [ Embeds.error(`Usage: \`${config.prefix}${this.usage}\``) ] });
		
		const country = args.join(' ');
		const url = `https://restcountries.eu/rest/v2/name/${encodeURIComponent(country)}`;
		const countryInfo = await fetch(url).then((res) => res.json()).then((res) => res[0]);

		if (!countryInfo) return msg.channel.send({ embeds: [ Embeds.error('No country was found with that name') ] });

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

		msg.channel.send(languageCode);
	}
}

