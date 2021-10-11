import { Message, MessageAttachment, MessageReaction, User, CommandInteraction } from 'discord.js';
import Command from "../../handlers/CommandHandler/BaseCommand";
import LanguageManager from '../../handlers/LanguageManager/LanguageManager';
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
		this.commandData = {
			name: 'stats',
			description: 'Show the statistics about a certain language',
			options: [
				{
					name: 'code',
					description: 'The language code or a country to select the languages',
					type: 'STRING',
					required: true
				}
			]
		}
	}

	async run (ctx: CommandInteraction) : Promise<any> {

		const { value } = ctx.options.get('code')!;
		const encodedArgs = encodeURIComponent(value as string);

		// Check if there is a response from weblate with the inputted argument(s)
		let weblateResponse = await fetch(`https://translate.namelessmc.com/api/languages/${encodedArgs}/statistics/?format=json`).then((res) => res.json());

		if (weblateResponse.detail) {
			const languageCode = await this.extractLanguageCode(ctx);
			weblateResponse = await fetch(`https://translate.namelessmc.com/api/languages/${languageCode}/statistics/?format=json`).then((res) => res.json());
			
			if (weblateResponse.detail) {
				const langKey = await LanguageManager.getString(ctx.user.id, 'stats.no_data_found');
				if (!langKey) return ctx.reply('We encountered an error. Please try again.');

				const embed = Embeds.error(langKey);
				return ctx.replied ? ctx.followUp({ embeds: [ embed ]}) : ctx.reply({ embeds: [ embed ]})
			}
		}

		const attachment = await this.generateImage(weblateResponse) as MessageAttachment;
		return ctx.replied ? ctx.followUp({ files: [ attachment ]}) : ctx.reply({ files: [ attachment ]})
	}

	async extractLanguageCode(ctx: CommandInteraction) {
		return new Promise(async (resolve) => {
			const { value } = ctx.options.get('code')!;
			const country = encodeURIComponent(value as string);			
			const url = `https://restcountries.com/v2/name/${encodeURIComponent(country)}`;
			const countryInfo = await fetch(url).then((res) => res.json()).then((res) => res[0]);

			const langKey = await LanguageManager.getString(ctx.user.id, 'stats.no_country_found')
			if(!langKey) return ctx.reply('We encountered an error. Please try again.')

			if (!countryInfo) return ctx.reply({ embeds: [ Embeds.error(langKey) ] });

			const languages = countryInfo.languages as languageInfo[];
			let languageCode;
			if (languages.length == 1) {
				languageCode = languages[0].iso639_1;
			} else {

				const description = [];
				for (let i = 0; i < languages.length; i++) {
					description.push(`${discord_emotes[i]} ${languages[i].name}`);
				}

				const langKey = await LanguageManager.getString(ctx.user.id, 'stats.choose_country_emote')
				if(!langKey) return ctx.reply('We encountered an error. Please try again.')

				const langKeyA = await LanguageManager.getString(ctx.user.id, 'stats.choose_country_emote_title')
				if(!langKeyA) return ctx.reply('We encountered an error. Please try again.')

				const embed = Embeds.success(`${langKey}\n` + description.join('\n'));
				embed.setTitle(langKeyA);

				await ctx.reply({ embeds: [ embed ]});
				const message = await ctx.fetchReply() as Message;

				for (let i = 0; i < languages.length; i++) {
					await message.react(discord_emotes[i]);
				}

				const filter = (reaction: MessageReaction, user: User) => discord_emotes.includes(reaction.emoji.name!) && !user.bot && user.id == ctx.user.id;

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

			ctx.fillText(`${json.translated} / ${json.total} (${json.translated_percent}%)`, 150, 88);
			ctx.fillText(`${json.translated_words} / ${json.total_words} (${json.translated_words_percent}%)`, 150, 108);
			ctx.fillText(json.comments, 150, 128);
			ctx.fillText(json.suggestions, 150, 148);

			const attachment = new MessageAttachment(canvas.toBuffer(), 'language-stats.png');
			resolve(attachment);
		})
	}
}