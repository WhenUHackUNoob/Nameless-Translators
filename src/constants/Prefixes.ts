import chalk from 'chalk';

export default class Prefixes {
	public static BOT: string = (chalk.gray("[") + chalk.blue("BOT") + chalk.gray("]") + " ")
	public static DB: string =  (chalk.gray("[") + chalk.red("DB") + chalk.gray("]") + " ")
	public static LANGUAGE: string = (chalk.gray("[") + chalk.green("LANGUAGE") + chalk.gray(']') + " ");
}