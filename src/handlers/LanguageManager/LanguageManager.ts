import { Collection } from "discord.js";
import fs from 'fs';
import path from "path";
import Prefixes from "../../constants/Prefixes";

import LanguageModel from "../../db/model/LanguageModel";

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
		
		// This is some horrible code but I cba to do it better rn
		let languageCode;
		if (user == "fallback") {
			languageCode = "en_UK";
		} else {
			let data = await LanguageModel.findOne({ where: { userID: user }});
			if (!data) {
				data = await LanguageModel.create({ userID: user, language: 'en_UK' });
			}
			languageCode = data.get('language') as string;
		}

		const languageData = this.languages.get(languageCode);
		if (!languageData) return this.getString("fallback", key, ...placeholders);
		
		const keys = key.split('.');
		let result = languageData;
		for (const key of keys) {
			result = result[key];
			if (!result) {
				console.log(Prefixes.LANGUAGE + `No language key found for: ${key}`);
				return this.getString("fallback", key, ...placeholders);
			}
		}

		for (let i = 0; i < placeholders.length; i += 2) {
			const k = placeholders[i];
			const v = placeholders[i + 1];

			result = result.replace(k, v);
		}

		return result as string;
	}
}