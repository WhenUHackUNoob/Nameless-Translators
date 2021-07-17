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
var __1 = require("../..");
var Embeds_1 = __importDefault(require("../../constants/Embeds"));
var PunishmentModel_1 = __importDefault(require("../../db/model/PunishmentModel"));
var BaseCommand_1 = __importDefault(require("../../handlers/CommandHandler/BaseCommand"));
var ModerationLogger_1 = __importDefault(require("./@util/ModerationLogger"));
var timestring_1 = __importDefault(require("timestring"));
var parseTime_1 = __importDefault(require("../../util/parseTime"));
var MuteCommand = /** @class */ (function (_super) {
    __extends(MuteCommand, _super);
    function MuteCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MuteCommand.prototype.setup = function () {
        this.name = "Mute user";
        this.command = "mute";
        this.description = "Mute a user";
        this.usage = "Mute <@user/userid> <time> [reason]";
        this.permissions = "MANAGE_MESSAGES";
        this.category = "moderation";
    };
    MuteCommand.prototype.run = function (_, args, msg) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var member, _c, duration, expires, readable_duration, reason, roleIds, _i, _d, role, mutedRole, caseInfo;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // Member
                        if (!args[2])
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.error("Usage: `" + __1.config.prefix + this.usage + "`")] })];
                        _c = ((_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first());
                        if (_c) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.members.fetch(args[0]))];
                    case 1:
                        _c = (_e.sent());
                        _e.label = 2;
                    case 2:
                        member = _c;
                        if (!member)
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.warning('The specified member was not found in this guild.')] })];
                        if (!canMute(msg.member, member))
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.warning('You cannot mute this user.')] })];
                        try {
                            duration = timestring_1.default(args[1], 'ms');
                            expires = Date.now() + duration;
                            readable_duration = parseTime_1.default(duration);
                        }
                        catch (_f) {
                            msg.channel.send({ embeds: [Embeds_1.default.warning("The specified timespan is invalid. ")] });
                            return [2 /*return*/];
                        }
                        reason = args.slice(2).join(' ') || "No reason specified";
                        roleIds = [];
                        _i = 0, _d = member.roles.cache.array();
                        _e.label = 3;
                    case 3:
                        if (!(_i < _d.length)) return [3 /*break*/, 6];
                        role = _d[_i];
                        if (!(role.editable && role.id !== msg.guild.id)) return [3 /*break*/, 5];
                        return [4 /*yield*/, member.roles.remove(role)];
                    case 4:
                        _e.sent();
                        roleIds.push(role.id);
                        _e.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, getMutedRole(msg.guild)];
                    case 7:
                        mutedRole = _e.sent();
                        member.roles.add(mutedRole);
                        return [4 /*yield*/, PunishmentModel_1.default.create({
                                action: 'mute',
                                issuer: msg.author.id,
                                member: member.id,
                                reason: reason,
                                context: msg.url,
                                guild: msg.guild.id,
                                length: readable_duration,
                                expires: expires,
                                expired: false,
                                roles: JSON.stringify(roleIds),
                            })];
                    case 8:
                        caseInfo = _e.sent();
                        ModerationLogger_1.default(msg.guild, caseInfo);
                        msg.channel.send("Successfully muted **" + member.user.tag + "**");
                        return [2 /*return*/];
                }
            });
        });
    };
    return MuteCommand;
}(BaseCommand_1.default));
exports.default = MuteCommand;
function canMute(issuer, member) {
    var highestRoleIssuer = issuer.roles.highest.position;
    var highestRoleMember = member.roles.highest.position;
    if (highestRoleIssuer > highestRoleMember)
        return true;
    return false;
}
function getMutedRole(guild) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var roles, role, channels, _i, _a, channel;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, guild.roles.fetch()];
                case 1:
                    roles = _b.sent();
                    role = roles.find(function (c) { return c.name.toLowerCase() == "muted"; });
                    if (!!role) return [3 /*break*/, 7];
                    return [4 /*yield*/, guild.roles.create({
                            name: 'muted',
                            color: '#36393F',
                            permissions: [],
                            mentionable: false,
                        })];
                case 2:
                    role = _b.sent();
                    return [4 /*yield*/, guild.channels.fetch()];
                case 3:
                    channels = _b.sent();
                    _i = 0, _a = channels.array();
                    _b.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    channel = _a[_i];
                    return [4 /*yield*/, channel.updateOverwrite(role, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            CONNECT: false,
                            SPEAK: false
                        })];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    resolve(role);
                    return [2 /*return*/];
            }
        });
    }); });
}
