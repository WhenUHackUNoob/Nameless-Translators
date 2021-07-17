import { Message } from "discord.js";
import { client as bot } from '../../index';
import UID from '../../util/uid';

import { EventEmitter } from 'events';

import fs from 'fs';
import path from 'path';
import Command from "./BaseCommand";
import Prefixes from '../../constants/Prefixes';

import { config as configJSON } from '../..';
import LanguageManager from "../LanguageManager/LanguageManager";

export default
class CommandHandler extends EventEmitter {

	//	settings
	setup: boolean = false;

	//	Command data
	public aliases: Map<string, UID> = new Map<string, UID>();
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

		//	This listens for the commands
		bot.on('message', async (msg: Message) : Promise<any> => {
			try {

				// Do not respond to bots or dm messages
				if(!msg.guild) return;
				if(msg.author.bot) return;
				
				const prefix = configJSON.prefix;
				if (!prefix) return console.log(Prefixes.BOT + "no prefix provided. Please configure this in the config.json");
				

				//	Checking if the command starts witht he bot prefix
				if(!msg.content.toLowerCase().startsWith(prefix.trim().toLowerCase()) && !msg.content.startsWith(`<@${bot.user!.id}>`)) return;
				//	Defining constants
				const args: string[] = msg.content.substring(prefix.length).split(/ +/);
				const cmd: string | undefined = args.shift()!.toLowerCase();

				//	Emit event
				if(!cmd) return this.emit('invalidCommand', cmd, args, msg);

				//	Getting command
				let command = this.commands.get(cmd);
				if(command == null) {
				
					//	If not set, check aliases
					command = this.aliases.get(cmd);

					//	Emit event of command non exist
					if(command == null)
						return this.emit('invalidCommand', cmd, args, msg);
				}

				//	Get Command
				const commandData: Command = this.commandData.get(command)!;

				if (commandData.ownerOnly) {
					if (!configJSON.owners.includes(msg.author.id)) {
						return msg.reply(commandData.permissionMessage);
					}
				}

				if (!configJSON.modules[commandData.category.toLowerCase()]) {
					return;
				}

				//	Checking permissions
				if(commandData.permissions != null && !configJSON.owners.includes(msg.author.id)) {
					const member = (await msg.guild.members.fetch(msg.author.id))!;

					if(!member.permissions.has(commandData.permissions)) {
						return msg.reply(commandData.permissionMessage);
					}
				}

				//	Try and catch for errors
				try {
					// Run language manager to make sure base language for the user exists
					await LanguageManager.getString(msg.author.id, "general.usage");
					await commandData.run(cmd, args, msg);
				}
				catch(e) {
					msg.reply('Somemething went wrong! ' + e.message);
					console.error(e);
				}
			}
			catch(e) {
				console.error(e);
			}
		});

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

		//	adding a new command
		if(this.commands.get(cmd.command.toLowerCase()) != null) throw new TypeError('Error: command ' + cmd.command + ' is already defined.');
		this.commands.set(cmd.command.toLowerCase(), id);

		//	adding the aliases
		cmd.aliases.forEach((a: string) => {
			this.aliases.set(a.toLowerCase(), id);
		});
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