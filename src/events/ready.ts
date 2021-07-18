import { client } from "..";
import Prefixes from "../constants/Prefixes";
import LanguageModel from "../db/model/LanguageModel";
import fetch from "node-fetch";

export default {
	name: 'ready',
	once: false,
	async run() {

		// Set status of bot
		client.user?.setActivity('Translations!', {type: 'WATCHING'})

		// Logging that the bot is ready
		console.log(Prefixes.BOT + client.user?.tag + " is ready!");

		// Initializing database models
		LanguageModel.sync();
	}
}