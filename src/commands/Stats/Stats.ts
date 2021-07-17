import { Message, MessageAttachment, MessageEmbed, MessageReaction, User } from 'discord.js';
import Command from "../../handlers/CommandHandler/BaseCommand";
import LanguageManager from '../../handlers/LanguageManager/LanguageManager';
import { config } from '../..';
import Embeds from '../../constants/Embeds';
import fetch from 'node-fetch';

// @ts-ignore
import Canvas from 'canvas';
import path from 'path';

const discord_emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
const FONT_FILE = "roboto.ttf";
const FONT = "roboto";

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

		const attachment = await this.generateImage(weblateResponse) as MessageAttachment;
		msg.channel.send({ files: [ attachment ]})
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

				const langKey = await LanguageManager.getString(msg.author.id, 'stats.choose_country_emote')
				if(!langKey) return msg.channel.send('We encountered an error. Please try again.')

				const langKeyA = await LanguageManager.getString(msg.author.id, 'stats.choose_country_emote_title')
				if(!langKeyA) return msg.channel.send('We encountered an error. Please try again.')

				const embed = Embeds.success(`${langKey}\n` + description.join('\n'));
				embed.setTitle(langKeyA);

				const message = await msg.channel.send({ embeds: [ embed ]});
				for (let i = 0; i < languages.length; i++) {
					await message.react(discord_emotes[i]);
				}

				const filter = (reaction: MessageReaction, user: User) => discord_emotes.includes(reaction.emoji.name!) && !user.bot && user.id == msg.author.id;

				const collected = await message.awaitReactions({ filter, time: 60 * 1000, max: 1 });
				const reaction = collected.first();
				if (!reaction || !reaction.emoji) return;
				
				message.reactions.removeAll();
				const index = discord_emotes.indexOf(reaction.emoji.name!);
				languageCode = languages[index].iso639_1;
			} 

			resolve(languageCode);
		})
	}


	async generateImage(json: any) {
		return new Promise(async (resolve) => {
			
			Canvas.registerFont(path.join(__dirname, `../../../public/fonts/${FONT_FILE}`), { family: `${FONT}` });
			
			const canvas = Canvas.createCanvas(400, 165);
			const ctx = canvas.getContext('2d');

			const background = await Canvas.loadImage(path.join(__dirname, '../../../public/img/stats_background.png'));
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

			ctx.font = `36px "${FONT}"`;
			ctx.fillStyle = "#ffffff";
			ctx.fillText(json.name, 15, 41);

			ctx.font = `12px "${FONT}"`;

			ctx.fillText(`${json.total} / ${json.translated} (${json.translated_percent}%)`, 150, 88);
			ctx.fillText(`${json.total_words} / ${json.translated_words} (${json.translated_words_percent}%)`, 150, 108);
			ctx.fillText(json.comments, 150, 128);
			ctx.fillText(json.suggestions, 150, 148);

			const attachment = new MessageAttachment(canvas.toBuffer(), 'language-stats.png');
			resolve(attachment);
		})
	}
}