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
var __1 = require("../../..");
var Embeds_1 = __importDefault(require("../../../constants/Embeds"));
var Prefixes_1 = __importDefault(require("../../../constants/Prefixes"));
exports.default = (function (guild, info) { return __awaiter(void 0, void 0, void 0, function () {
    var channel, type, _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var _k, _l, _m, _o;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0: return [4 /*yield*/, guild.channels.fetch(__1.config.moderationChannel)];
            case 1:
                channel = _p.sent();
                if (!channel)
                    return [2 /*return*/, console.log(Prefixes_1.default.BOT + "No moderation logging channel found. Was it not configured?")];
                type = info.get('action');
                _a = type;
                switch (_a) {
                    case "ban": return [3 /*break*/, 2];
                    case "mute": return [3 /*break*/, 5];
                    case "warn": return [3 /*break*/, 8];
                    case "kick": return [3 /*break*/, 11];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = (_b = channel).send;
                _k = {};
                return [4 /*yield*/, Embeds_1.default.moderation_ban(info)];
            case 3: return [4 /*yield*/, _c.apply(_b, [(_k.embeds = [_p.sent()], _k)])];
            case 4:
                _p.sent();
                return [3 /*break*/, 14];
            case 5:
                _e = (_d = channel).send;
                _l = {};
                return [4 /*yield*/, Embeds_1.default.moderation_mute(info)];
            case 6: return [4 /*yield*/, _e.apply(_d, [(_l.embeds = [_p.sent()], _l)])];
            case 7:
                _p.sent();
                return [3 /*break*/, 14];
            case 8:
                _g = (_f = channel).send;
                _m = {};
                return [4 /*yield*/, Embeds_1.default.moderation_warn(info)];
            case 9: return [4 /*yield*/, _g.apply(_f, [(_m.embeds = [_p.sent()], _m)])];
            case 10:
                _p.sent();
                return [3 /*break*/, 14];
            case 11:
                _j = (_h = channel).send;
                _o = {};
                return [4 /*yield*/, Embeds_1.default.moderation_kick(info)];
            case 12: return [4 /*yield*/, _j.apply(_h, [(_o.embeds = [_p.sent()], _o)])];
            case 13:
                _p.sent();
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); });
