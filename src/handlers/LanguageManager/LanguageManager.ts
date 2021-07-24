import { Collection } from "discord.js";
import fs from 'fs';
import path from "path";
import Prefixes from "../../constants/Prefixes";

import LanguageModel from "../../db/model/LanguageModel";

const DEFAULT_LANGUAGE = "en_UK"

export default class LanguageManager {
	public static languages: Collection<string, any> = new Collection();
	public static languageMap = {
		"Czech": "cs_CZ",
		"German": "de_DE",
		"Greek": "el_GR",
		"EnglishUK": "en_UK",
		"EnglishUS": "en_US",
		"Spanish": "es_419",
		"SpanishES": "es_ES",
		"French": "fr_FR",
		"Hungarian": "hu_HU",
		"Italian": "it_IT",
		"Lithuanian": "lt_LT",
		"Norwegian": "nb_NO",
		"Dutch": "nl_NL",
		"Polish": "pl_PL",
		"Romanian": "ro_RO",
		"Russian": "ru_RU",
		"Slovak": "sk_SK",
		"Turkish": "tr_TR",
		"Chinese(Simplified)": "zh_CN",
		"Portuguese": "pt_BR"
	}

	public static loadLanguages(dir: string) {
		const languageFiles = fs.readdirSync(dir);
		for (const languageFile of languageFiles) {
			const file = fs.readFileSync(path.join(dir, languageFile), 'utf8');
			try {
				const json = JSON.parse(file);
				if (!json) continue;

				this.languages.set(languageFile.split('.')[0], json);
				console.log(Prefixes.LANGUAGE + `loaded language: ` + languageFile.split('.')[0]);
			} catch (ignored) {}
		}
	}

	public static async getString(user: string, key: string, ...placeholders: string[]) : Promise<string | undefined> {
		

		const language = await this.getLanguage(user);
		let translations = this.languages.get(language);
		
		let translation = this.getTranslation(translations, key);
		if (!translation) {
			translations = this.languages.get(DEFAULT_LANGUAGE);
			translation = this.getTranslation(translations, key);
		}
		
		if (!translation) {
			// We are already the default translation so the term is not set
			console.log(Prefixes.BOT + `Term '${key}' is missing from default (${DEFAULT_LANGUAGE}) translation`)
			return undefined;
		}

		for (let i = 0; i < placeholders.length; i += 2) {
			const k = placeholders[i];
			const v = placeholders[i + 1];
			
			translation = translation.split("{" + k + "}").join(v); // .replaceAll doesn't exist so I guess we use this
		}

		return translation;
	}

	private static getTranslation(json: any, key: string) {
		const keys = key.split('.');
		let result = json;
		for (const k of keys) {
			result = result[k];
			if (!result) {
				console.log(Prefixes.LANGUAGE + `No language key found for: ${key}`);
				return undefined;
			}
		}
		return result;
	}

	private static async getLanguage(user: string) {
		let data = await LanguageModel.findOne({ where: { userID: user }});
		if (!data) {
			data = await LanguageModel.create({ userID: user, language: DEFAULT_LANGUAGE });
		}
		return data.get('language') as string;
	}
}