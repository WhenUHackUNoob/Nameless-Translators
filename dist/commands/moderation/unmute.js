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
var WarnCommand = /** @class */ (function (_super) {
    __extends(WarnCommand, _super);
    function WarnCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WarnCommand.prototype.setup = function () {
        this.name = "Unmute user";
        this.command = "unmute";
        this.description = "Unmute a user";
        this.usage = "unmute <@user/userid>";
        this.permissions = "MANAGE_MESSAGES";
        this.category = "moderation";
    };
    WarnCommand.prototype.run = function (_, args, msg) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var member, _c, caseInfo, roles, role, oldRoles, _i, oldRoles_1, roleID, r;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!args[0])
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.error("Usage: `" + __1.config.prefix + this.usage + "`")] })];
                        _c = ((_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first());
                        if (_c) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.members.fetch(args[0]))];
                    case 1:
                        _c = (_d.sent());
                        _d.label = 2;
                    case 2:
                        member = _c;
                        if (!member)
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.warning('The specified member was not found in this guild.')] })];
                        return [4 /*yield*/, PunishmentModel_1.default.findOne({ where: { member: member.id, action: 'mute', expired: false } })];
                    case 3:
                        caseInfo = _d.sent();
                        if (!caseInfo)
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.warning("There is no active mute on this member.")] })];
                        return [4 /*yield*/, msg.guild.roles.fetch()];
                    case 4:
                        roles = _d.sent();
                        role = roles.find(function (c) { return c.name.toLowerCase() == "muted"; });
                        if (!role)
                            return [2 /*return*/];
                        return [4 /*yield*/, member.roles.remove(role)];
                    case 5:
                        _d.sent();
                        oldRoles = JSON.parse(caseInfo.get('roles'));
                        _i = 0, oldRoles_1 = oldRoles;
                        _d.label = 6;
                    case 6:
                        if (!(_i < oldRoles_1.length)) return [3 /*break*/, 9];
                        roleID = oldRoles_1[_i];
                        r = roles.get(roleID);
                        if (!r) return [3 /*break*/, 8];
                        return [4 /*yield*/, member.roles.add(r)];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [4 /*yield*/, msg.channel.send("Successfully unmuted **" + member.user.tag + "**")];
                    case 10:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WarnCommand;
}(BaseCommand_1.default));
exports.default = WarnCommand;
