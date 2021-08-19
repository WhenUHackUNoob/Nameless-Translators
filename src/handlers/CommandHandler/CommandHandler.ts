import { Message } from "discord.js";
import { client as bot } from '../../index';
import UID from '../../util/uid';

import { EventEmitter } from 'events';

import fs from 'fs';
import path from 'path';
import Command from "./BaseCommand";

export default
class CommandHandler extends EventEmitter {

	//	settings
	setup: boolean = false;

	//	Command data
	public commands: Map<string, UID> = new Map<string, UID>();
	public commandData: Map<UID, Command> = new Map<UID, Command>();

	config: { ignoreToken: string; };

	constructor(config: { ignoreToken: string; } | undefined = { ignoreToken: '@' }) {
		super();

		this.config = {
			ignoreToken: config!.ignoreToken
		};

		this.start();
	}


	private async start() {
		if(this.setup) return;
		bot.on('interactionCreate', async (interaction) => {
			if (!interaction.isCommand()) return;
			if (!interaction.guild) return;

			const cmd = this.commands.get(interaction.commandName);
			if (!cmd) throw new Error(`Interaction with name ${interaction.commandName} was not found in the command list!`);
			const cmdData = this.commandData.get(cmd)!;

			//	Try and catch for errors
			try {
				await cmdData.run(interaction);
			}
			catch(e) {
				interaction.reply('Somemething went wrong! ' + e.message);
				console.error(e);
			}
		})
		this.setup = true;
	}

	/**
	 * Add a command to the command handler
	 * @param cmd command class to add
	 */
	public async loadCommand(cmd: Command) {

		//	Generating the id for this command
		const id = new UID();

		//	Setup the command
		cmd.preSetup(id);

		//	adding command to the database
		this.commandData.set(id, cmd);

		if (!cmd.commandData?.name) throw new TypeError("Command name cannot be undefined");
		if (!cmd.commandData) throw new TypeError("Command description cannot be undefined");

		//	adding a new command
		if(this.commands.get(cmd.commandData?.name) != null) throw new TypeError('Error: command ' + cmd.commandData.name + ' is already created.');
		this.commands.set(cmd.commandData.name, id);

		const applicationCommand = await (await bot.guilds.fetch('737390815281807421')).commands.create(cmd.commandData);

		if (cmd.permissions) {
			await applicationCommand.permissions.add({ permissions: cmd.permissions });
		}
	}

	/**
	 * Load an directory to the CommandHandler
	 * @param dir absoulte path of this directory
	 */
	public async loadDir(dir: string) {

		const files = fs.readdirSync(dir);

		files.forEach(async file => {
			const fdir = path.join(dir, file)


			//	Collecting stats
			const stats = fs.lstatSync( fdir );


			//	Checking if file/folder should be read
			if(file.startsWith(this.config.ignoreToken)) {
				return;
			}


			//	Checking if its an directory for nesting
			if(stats.isDirectory()) {
				return await this.loadDir(fdir);
			}

			try {
				//	Getting file
				const _a = require(fdir);
				const temp = new (( _a.default ? _a.default : _a ));
	
				
				//	Checking if its the right class
				if(!(temp instanceof Command)) return;
	
				//	Adding to command handler
				this.loadCommand(temp);
			} catch (ignored) { console.log(ignored) }
		});

	}
}