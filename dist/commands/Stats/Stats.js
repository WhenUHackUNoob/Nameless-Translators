"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var BaseCommand_1 = __importDefault(require("../../handlers/CommandHandler/BaseCommand"));
var LanguageManager_1 = __importDefault(require("../../handlers/LanguageManager/LanguageManager"));
var __1 = require("../..");
var Embeds_1 = __importDefault(require("../../constants/Embeds"));
var node_fetch_1 = __importDefault(require("node-fetch"));
// @ts-ignore
var canvas_1 = __importDefault(require("canvas"));
var path_1 = __importDefault(require("path"));
var discord_emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
var FONT_FILE = "roboto.ttf";
var FONT = "roboto";
var StatsCommand = /** @class */ (function (_super) {
    __extends(StatsCommand, _super);
    function StatsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatsCommand.prototype.setup = function () {
        this.name = "stats";
        this.command = "stats";
        this.description = "Display stats about a language";
        this.usage = "stats <language>";
        this.category = "stats";
    };
    StatsCommand.prototype.run = function (_, args, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var langKey, embed, encodedArgs, weblateResponse, languageCode, langKey, embed, attachment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!args[0]) return [3 /*break*/, 2];
                        return [4 /*yield*/, LanguageManager_1.default.getString(msg.author.id, 'general.usage', 'usage', "" + __1.config.prefix + this.usage)];
                    case 1:
                        langKey = _a.sent();
                        if (!langKey)
                            return [2 /*return*/, msg.reply('We encountered an error. Please try again.')];
                        embed = Embeds_1.default.error(langKey);
                        return [2 /*return*/, msg.channel.send({ embeds: [embed] })];
                    case 2:
                        encodedArgs = encodeURIComponent(args.join(' '));
                        return [4 /*yield*/, node_fetch_1.default("https://translate.namelessmc.com/api/languages/" + encodedArgs + "/statistics/?format=json").then(function (res) { return res.json(); })];
                    case 3:
                        weblateResponse = _a.sent();
                        if (!weblateResponse.detail) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.extractLanguageCode(args, msg)];
                    case 4:
                        languageCode = _a.sent();
                        return [4 /*yield*/, node_fetch_1.default("https://translate.namelessmc.com/api/languages/" + languageCode + "/statistics/?format=json").then(function (res) { return res.json(); })];
                    case 5:
                        weblateResponse = _a.sent();
                        if (!weblateResponse.detail) return [3 /*break*/, 7];
                        return [4 /*yield*/, LanguageManager_1.default.getString(msg.author.id, 'stats.no_data_found')];
                    case 6:
                        langKey = _a.sent();
                        if (!langKey)
                            return [2 /*return*/, msg.reply('We encountered an error. Please try again.')];
                        embed = Embeds_1.default.error(langKey);
                        return [2 /*return*/, msg.channel.send({ embeds: [embed] })];
                    case 7: return [4 /*yield*/, this.generateImage(weblateResponse)];
                    case 8:
                        attachment = _a.sent();
                        msg.channel.send({ files: [attachment] });
                        return [2 /*return*/];
                }
            });
        });
    };
    StatsCommand.prototype.extractLanguageCode = function (args, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var country, url, countryInfo, langKey, languages, languageCode, description, i, langKey_1, langKeyA, embed, message, i, filter, collected, reaction, index;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    country = args.join(' ');
                                    url = "https://restcountries.eu/rest/v2/name/" + encodeURIComponent(country);
                                    return [4 /*yield*/, node_fetch_1.default(url).then(function (res) { return res.json(); }).then(function (res) { return res[0]; })];
                                case 1:
                                    countryInfo = _a.sent();
                                    return [4 /*yield*/, LanguageManager_1.default.getString(msg.author.id, 'stats.no_country_found')];
                                case 2:
                                    langKey = _a.sent();
                                    if (!langKey)
                                        return [2 /*return*/, msg.channel.send('We encountered an error. Please try again.')];
                                    if (!countryInfo)
                                        return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.error(langKey)] })];
                                    languages = countryInfo.languages;
                                    if (!(languages.length == 1)) return [3 /*break*/, 3];
                                    languageCode = languages[0].iso639_1;
                                    return [3 /*break*/, 12];
                                case 3:
                                    description = [];
                                    for (i = 0; i < languages.length; i++) {
                                        description.push(discord_emotes[i] + " " + languages[i].name);
                                    }
                                    return [4 /*yield*/, LanguageManager_1.default.getString(msg.author.id, 'stats.choose_country_emote')];
                                case 4:
                                    langKey_1 = _a.sent();
                                    if (!langKey_1)
                                        return [2 /*return*/, msg.channel.send('We encountered an error. Please try again.')];
                                    return [4 /*yield*/, LanguageManager_1.default.getString(msg.author.id, 'stats.choose_country_emote_title')];
                                case 5:
                                    langKeyA = _a.sent();
                                    if (!langKeyA)
                                        return [2 /*return*/, msg.channel.send('We encountered an error. Please try again.')];
                                    embed = Embeds_1.default.success(langKey_1 + "\n" + description.join('\n'));
                                    embed.setTitle(langKeyA);
                                    return [4 /*yield*/, msg.channel.send({ embeds: [embed] })];
                                case 6:
                                    message = _a.sent();
                                    i = 0;
                                    _a.label = 7;
                                case 7:
                                    if (!(i < languages.length)) return [3 /*break*/, 10];
                                    return [4 /*yield*/, message.react(discord_emotes[i])];
                                case 8:
                                    _a.sent();
                                    _a.label = 9;
                                case 9:
                                    i++;
                                    return [3 /*break*/, 7];
                                case 10:
                                    filter = function (reaction, user) { return discord_emotes.includes(reaction.emoji.name) && !user.bot && user.id == msg.author.id; };
                                    return [4 /*yield*/, message.awaitReactions({ filter: filter, time: 60 * 1000, max: 1 })];
                                case 11:
                                    collected = _a.sent();
                                    reaction = collected.first();
                                    if (!reaction || !reaction.emoji)
                                        return [2 /*return*/];
                                    message.reactions.removeAll();
                                    index = discord_emotes.indexOf(reaction.emoji.name);
                                    languageCode = languages[index].iso639_1;
                                    _a.label = 12;
                                case 12:
                                    resolve(languageCode);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    StatsCommand.prototype.generateImage = function (json) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var canvas, ctx, background, attachment;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    canvas_1.default.registerFont(path_1.default.join(__dirname, "../../../public/fonts/" + FONT_FILE), { family: "" + FONT });
                                    canvas = canvas_1.default.createCanvas(400, 165);
                                    ctx = canvas.getContext('2d');
                                    return [4 /*yield*/, canvas_1.default.loadImage(path_1.default.join(__dirname, '../../../public/img/stats_background.png'))];
                                case 1:
                                    background = _a.sent();
                                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                                    ctx.font = "36px \"" + FONT + "\"";
                                    ctx.fillStyle = "#ffffff";
                                    ctx.fillText(json.name, 15, 41);
                                    ctx.font = "12px \"" + FONT + "\"";
                                    ctx.fillText(json.total + " / " + json.translated + " (" + json.translated_percent + "%)", 150, 88);
                                    ctx.fillText(json.total_words + " / " + json.translated_words + " (" + json.translated_words_percent + "%)", 150, 108);
                                    ctx.fillText(json.comments, 150, 128);
                                    ctx.fillText(json.suggestions, 150, 148);
                                    attachment = new discord_js_1.MessageAttachment(canvas.toBuffer(), 'language-stats.png');
                                    resolve(attachment);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return StatsCommand;
}(BaseCommand_1.default));
exports.default = StatsCommand;
