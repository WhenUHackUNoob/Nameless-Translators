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
var paginator_1 = __importDefault(require("../../util/paginator"));
var HistoryCommand = /** @class */ (function (_super) {
    __extends(HistoryCommand, _super);
    function HistoryCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HistoryCommand.prototype.setup = function () {
        this.name = "User history";
        this.command = "history";
        this.description = "Show the punishment history of a user";
        this.permissions = "MANAGE_MESSAGES";
        this.usage = "history <@user/userid>";
        this.category = "moderation";
    };
    HistoryCommand.prototype.run = function (_, args, msg) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var member, _c, pastPunishments, embeds, i, content, j, punishment, caseNumber, action, reason, issuer, string;
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
                        return [4 /*yield*/, PunishmentModel_1.default.findAll({ where: { member: member.id }, order: [['createdAt', 'ASC']] })];
                    case 3:
                        pastPunishments = _d.sent();
                        embeds = [];
                        i = 0;
                        _d.label = 4;
                    case 4:
                        if (!(i < Math.ceil(pastPunishments.length / 10))) return [3 /*break*/, 10];
                        content = [];
                        j = i * 10;
                        _d.label = 5;
                    case 5:
                        if (!(j < ((i + 1) * 10) && j < pastPunishments.length)) return [3 /*break*/, 8];
                        punishment = pastPunishments[j];
                        caseNumber = punishment.get('id');
                        action = punishment.get('action');
                        reason = punishment.get('reason');
                        return [4 /*yield*/, __1.client.users.fetch(punishment.get('issuer'))];
                    case 6:
                        issuer = _d.sent();
                        string = [
                            "`Case #" + caseNumber + "`",
                            "**Action:** " + action,
                            "**Issuer:** `" + issuer.tag + "` (" + issuer.id + ") ",
                            "**Reason:** " + reason
                        ].join('\n');
                        content.push(string);
                        _d.label = 7;
                    case 7:
                        j++;
                        return [3 /*break*/, 5];
                    case 8:
                        embeds.push(Embeds_1.default.success(content.join('\n\n')).setTitle("Punishment history of " + member.user.tag));
                        _d.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 4];
                    case 10:
                        new paginator_1.default(msg, embeds);
                        return [2 /*return*/];
                }
            });
        });
    };
    return HistoryCommand;
}(BaseCommand_1.default));
exports.default = HistoryCommand;
