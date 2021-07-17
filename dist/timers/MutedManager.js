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
var __1 = require("..");
var PunishmentModel_1 = __importDefault(require("../db/model/PunishmentModel"));
setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
    var mutedPeople, _i, mutedPeople_1, info, guild, member, roles, role, oldRoles, _a, oldRoles_1, roleID, r;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, PunishmentModel_1.default.findAll({ where: { action: 'mute', expired: false } })];
            case 1:
                mutedPeople = _b.sent();
                _i = 0, mutedPeople_1 = mutedPeople;
                _b.label = 2;
            case 2:
                if (!(_i < mutedPeople_1.length)) return [3 /*break*/, 11];
                info = mutedPeople_1[_i];
                if (info.get('expires') > Date.now())
                    return [3 /*break*/, 10];
                PunishmentModel_1.default.update({ expired: true }, { where: { id: info.get('id') } });
                return [4 /*yield*/, __1.client.guilds.fetch(info.get('guild'))];
            case 3:
                guild = _b.sent();
                return [4 /*yield*/, guild.members.fetch(info.get('member'))];
            case 4:
                member = _b.sent();
                return [4 /*yield*/, guild.roles.fetch()];
            case 5:
                roles = _b.sent();
                role = roles.find(function (c) { return c.name.toLowerCase() == "muted"; });
                if (!role)
                    return [3 /*break*/, 10];
                return [4 /*yield*/, member.roles.remove(role)];
            case 6:
                _b.sent();
                oldRoles = JSON.parse(info.get('roles'));
                _a = 0, oldRoles_1 = oldRoles;
                _b.label = 7;
            case 7:
                if (!(_a < oldRoles_1.length)) return [3 /*break*/, 10];
                roleID = oldRoles_1[_a];
                r = roles.get(roleID);
                if (!r) return [3 /*break*/, 9];
                return [4 /*yield*/, member.roles.add(r)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                _a++;
                return [3 /*break*/, 7];
            case 10:
                _i++;
                return [3 /*break*/, 2];
            case 11: return [2 /*return*/];
        }
    });
}); }, 5 * 1000);
