export default
class UID {
	public id: string

	constructor(length = 20) {
		const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
		const id = [];

		for(let i = 0; i < length; i++) {
			id.push(characters[
				Math.floor(
					Math.random() * characters.length - 1)
			]);
		}

		this.id = id.join('');
	}
};