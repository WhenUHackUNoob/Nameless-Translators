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
var BaseCommand_1 = __importDefault(require("../../handlers/CommandHandler/BaseCommand"));
var Embeds_1 = __importDefault(require("../../constants/Embeds"));
var __1 = require("../..");
var node_fetch_1 = __importDefault(require("node-fetch"));
var discord_emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
var CountrytocodeCommand = /** @class */ (function (_super) {
    __extends(CountrytocodeCommand, _super);
    function CountrytocodeCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CountrytocodeCommand.prototype.setup = function () {
        this.name = "lang";
        this.command = "lang";
        this.description = "Get the language code for a given country";
        this.usage = "lang <countryname>";
        this.category = "misc";
    };
    CountrytocodeCommand.prototype.run = function (_, args, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var country, url, countryInfo, languages, languageCode, description, i, embed, message, i, filter, collected, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args[0])
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.error("Usage: `" + __1.config.prefix + this.usage + "`")] })];
                        country = args.join(' ');
                        url = "https://restcountries.eu/rest/v2/name/" + encodeURIComponent(country);
                        return [4 /*yield*/, node_fetch_1.default(url).then(function (res) { return res.json(); }).then(function (res) { return res[0]; })];
                    case 1:
                        countryInfo = _a.sent();
                        if (!countryInfo)
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.error('No country was found with that name')] })];
                        languages = countryInfo.languages;
                        if (!(languages.length == 1)) return [3 /*break*/, 2];
                        languageCode = languages[0].iso639_1;
                        return [3 /*break*/, 9];
                    case 2:
                        description = [];
                        for (i = 0; i < languages.length; i++) {
                            description.push(discord_emotes[i] + " " + languages[i].name);
                        }
                        embed = Embeds_1.default.success("React with the emote of the language you want to choose\n" + description.join('\n'));
                        embed.setTitle("Choose language");
                        return [4 /*yield*/, msg.channel.send({ embeds: [embed] })];
                    case 3:
                        message = _a.sent();
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < languages.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, message.react(discord_emotes[i])];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        filter = function (reaction, user) { return discord_emotes.includes(reaction.emoji.name) && !user.bot && user.id == msg.author.id; };
                        return [4 /*yield*/, message.awaitReactions({ filter: filter, time: 60 * 1000 })];
                    case 8:
                        collected = _a.sent();
                        if (!collected || !collected.first())
                            return [2 /*return*/];
                        index = discord_emotes.indexOf(collected.first().emoji.name);
                        languageCode = languages[index].iso639_1;
                        _a.label = 9;
                    case 9:
                        msg.channel.send(languageCode);
                        return [2 /*return*/];
                }
            });
        });
    };
    return CountrytocodeCommand;
}(BaseCommand_1.default));
exports.default = CountrytocodeCommand;
