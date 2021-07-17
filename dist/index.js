"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.commandHandler = exports.client = void 0;
//
//	TheCodingTrain Event-Bot
//
require('dotenv').config();
var discord_js_1 = require("discord.js");
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var Prefixes_1 = __importDefault(require("./constants/Prefixes"));
var CommandHandler_1 = __importDefault(require("./handlers/CommandHandler/CommandHandler"));
var EventHandler_1 = __importDefault(require("./handlers/EventHandler/EventHandler"));
var LanguageManager_1 = __importDefault(require("./handlers/LanguageManager/LanguageManager"));
console.log(Prefixes_1.default.BOT + "Starting discord client");
var config = JSON.parse(fs_1.readFileSync(path_1.default.join(__dirname, '../config.json'), 'utf-8'));
exports.config = config;
var client = new discord_js_1.Client({
    messageCacheLifetime: 20,
    messageCacheMaxSize: 10,
    messageSweepInterval: 100,
    partials: ["REACTION", "MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER"],
    intents: discord_js_1.Intents.NON_PRIVILEGED
});
exports.client = client;
var commandHandler = new CommandHandler_1.default({ ignoreToken: '@' });
exports.commandHandler = commandHandler;
LanguageManager_1.default.loadLanguages(path_1.default.join(__dirname, '../language'));
new EventHandler_1.default(path_1.default.join(__dirname, './events'));
commandHandler.loadDir(path_1.default.join(__dirname, './commands'));
client.login(process.env.BOTTOKEN);
