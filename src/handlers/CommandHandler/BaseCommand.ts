import { ApplicationCommandData, ApplicationCommandPermissionData, ApplicationCommandPermissions, CommandInteraction, Message, PermissionResolvable } from 'discord.js';
import UID from '../../util/uid';

export default 
class BaseCommand {
	public id: UID | null = null;

	public category: string = "No category";
	public commandData: ApplicationCommandData | undefined;
	public permissions: ApplicationCommandPermissionData[] | undefined;
	
	preSetup(id: UID) {
		this.id = id;
		this.setup();
	}

	setup() {
		return;
	}

	/**
	 * Run the function
	 * @param {String} cmd The command executed
	 * @param {Message} msg The message object
	 * @param {String[]} args The arguments provided
	 */
	async run(ctx: CommandInteraction) {
		ctx.reply('This command is not set up. This is probably an error');
	}
}