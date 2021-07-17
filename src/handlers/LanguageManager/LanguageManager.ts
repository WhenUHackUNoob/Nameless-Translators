import { Collection } from "discord.js";
import fs from 'fs';
import path from "path";
import Prefixes from "../../constants/Prefixes";

import LanguageModel from "../../db/model/LanguageModel";

export default class LanguageManager {
	private static languages: Collection<string, any> = new Collection();

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
		let data = await LanguageModel.findOne({ where: { userID: user }});
		if (!data) {
			data = await LanguageModel.create({ userID: user, language: 'en' });
		}

		const languageCode = data.get('language') as string;
		const languageData = this.languages.get(languageCode.toLowerCase());
		const keys = key.split('.');
		let result = languageData;
		for (const key of keys) {
			result = result[key];
			if (!result) {
				console.log(Prefixes.LANGUAGE + `No language key found for: ${key}`)
				return undefined;
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