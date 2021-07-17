"use strict";
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
var __1 = require("../..");
var Embeds_1 = __importDefault(require("../../constants/Embeds"));
var Prefixes_1 = __importDefault(require("../../constants/Prefixes"));
var StarboardModel_1 = __importDefault(require("../../db/model/StarboardModel"));
exports.default = (function (reaction, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var starboardData, starboard_channel, embed, message_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, StarboardModel_1.default.findOne({ where: { messageID: reaction.message.id } })];
            case 1:
                starboardData = _a.sent();
                return [4 /*yield*/, reaction.message.guild.channels.fetch(__1.config.starboardChannel)];
            case 2:
                starboard_channel = _a.sent();
                if (!starboard_channel)
                    return [2 /*return*/, console.log(Prefixes_1.default.BOT + "no starboard channel found. Configure it properly in the config.json")];
                if (!!starboardData) return [3 /*break*/, 4];
                embed = Embeds_1.default.starboard(reaction.message);
                return [4 /*yield*/, starboard_channel.send({ content: "\u2B50 " + amount + " | <#" + reaction.message.channel.id + ">", embeds: [embed] })];
            case 3:
                message_1 = _a.sent();
                return [2 /*return*/, StarboardModel_1.default.create({
                        messageID: reaction.message.id,
                        guild: reaction.message.guild.id,
                        channel: message_1.channel.id,
                        message: message_1.id
                    })];
            case 4:
                ;
                return [4 /*yield*/, starboard_channel.messages.fetch(starboardData.get('message'))];
            case 5:
                message = _a.sent();
                if (!message)
                    return [2 /*return*/, StarboardModel_1.default.destroy({ where: { messageID: reaction.message.id } })];
                return [4 /*yield*/, message.edit("\u2B50 " + amount + " | <#" + reaction.message.channel.id + ">")];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
