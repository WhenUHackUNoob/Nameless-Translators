import { Message, PermissionResolvable } from 'discord.js';
import UID from '../../util/uid';
const defaultPermissionMessage = "You don't have the required permission to do this.";

export default 
class Command {
	public id: UID | null = null;

	public name: string = "Unnamed";
	public category: string = "No category";
	public description: string = "No description";
	public usage: string = "No usage";
	
	public command: string = "No command";
	public aliases: string[] = [];

	public permissions: PermissionResolvable | null = null;
	public permissionMessage: string = defaultPermissionMessage;
	
	public hidden: boolean = false;
	public ownerOnly: boolean = false;

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
	async run(_: string, __: string[], msg: Message) {
		msg.reply('This command doesn\'t do anything, please report this to an administrator'
		+ '\n name: ' + this.name
		+ '\n cmd: '  + this.command);
	}
}