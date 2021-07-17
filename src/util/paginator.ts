import { Message, MessageEmbed, MessageReaction, ReactionCollector, User } from 'discord.js';

export default class Paginator {

	private msg: Message;
	private page: number = 0;
	private pages: MessageEmbed[];
	private emojiList: string[];
	private timeout: number;
	private current: Message | undefined;
	private deleteEachPage: boolean = false;

	constructor(msg: Message, pages: MessageEmbed[], deleteEachPage: boolean = false, emojiList: string[] = ['⏪', '⏩'], timeout: number = 120000) {
		this.msg = msg;
		this.pages = pages;
		this.emojiList = emojiList;
		this.timeout = timeout;
		this.deleteEachPage = deleteEachPage;
		
		this.sendInitial();
	}

	private async sendInitial() {
		this.current = await this.msg.channel.send({ embeds: [ this.pages[this.page].setFooter(`Page ${this.page + 1} / ${this.pages.length}`) ]})
		await this.react();
		this.createMessageCollector();
	}

	private async react() {
		for (const emoji of this.emojiList) await this.current!.react(emoji).catch(() => {});
	}

	private createMessageCollector() {
		const reactionCollector: ReactionCollector = this.current!.createReactionCollector({ 
			filter: (reaction: MessageReaction, user: User) => this.emojiList.includes(reaction.emoji.name!) && !user.bot && user.id == this.msg.author.id,
			time: this.timeout
		});

		reactionCollector.on('collect', async reaction => {
			reaction.users.remove(this.msg.author);
			switch(reaction.emoji.name) {
				case this.emojiList[0]:
					this.page = this.page > 0 ? --this.page : this.pages.length - 1;
					break;
				case this.emojiList[1]:
					this.page = this.page + 1 < this.pages.length ? ++this.page : 0;
					break;
				default:
					break;
			}
			
			if (this.deleteEachPage) {
				reactionCollector.stop();
				await this.current!.delete().catch(() => {});
				this.current = await this.msg.channel.send({ embeds: [ this.pages[this.page].setFooter(`Page ${this.page + 1} / ${this.pages.length}`)] });
				
				await this.react();
				this.createMessageCollector();
			} else {
				await this.current!.edit({ embeds: [ this.pages[this.page].setFooter(`Page ${this.page + 1} / ${this.pages.length}`) ] });
			}
		});

		reactionCollector.on('end', () => {
			if (!this.current!.deleted) {
				this.current!.reactions.removeAll()
			}
		});
	}
}