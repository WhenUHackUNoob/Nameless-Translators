import path from 'path';
import { readdir } from "fs";
import { client } from '../..';

export default class EventHandler {

	constructor(dir: string) {
		readdir(dir, (err, files) => {
			if (err) console.error(err);
			files.forEach((file) => {
				if (file.startsWith('@')) return;
				
				const eventFile = require(path.join(dir, file));
				const eventData = eventFile.default ? eventFile.default : eventFile;

				const eventName = eventData.name;
				const eventOnce = eventData.once;
				client[eventOnce ? 'once' : 'on'](eventName, (...args: any) => eventData.run(...args))
			})
		})
	}
}