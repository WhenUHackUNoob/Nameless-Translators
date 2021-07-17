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
Object.defineProperty(exports, "__esModule", { value: true });
var Paginator = /** @class */ (function () {
    function Paginator(msg, pages, deleteEachPage, emojiList, timeout) {
        if (deleteEachPage === void 0) { deleteEachPage = false; }
        if (emojiList === void 0) { emojiList = ['⏪', '⏩']; }
        if (timeout === void 0) { timeout = 120000; }
        this.page = 0;
        this.deleteEachPage = false;
        this.msg = msg;
        this.pages = pages;
        this.emojiList = emojiList;
        this.timeout = timeout;
        this.deleteEachPage = deleteEachPage;
        this.sendInitial();
    }
    Paginator.prototype.sendInitial = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.msg.channel.send({ embeds: [this.pages[this.page].setFooter("Page " + (this.page + 1) + " / " + this.pages.length)] })];
                    case 1:
                        _a.current = _b.sent();
                        return [4 /*yield*/, this.react()];
                    case 2:
                        _b.sent();
                        this.createMessageCollector();
                        return [2 /*return*/];
                }
            });
        });
    };
    Paginator.prototype.react = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, emoji;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.emojiList;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        emoji = _a[_i];
                        return [4 /*yield*/, this.current.react(emoji).catch(function () { })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Paginator.prototype.createMessageCollector = function () {
        var _this = this;
        var reactionCollector = this.current.createReactionCollector({
            filter: function (reaction, user) { return _this.emojiList.includes(reaction.emoji.name) && !user.bot && user.id == _this.msg.author.id; },
            time: this.timeout
        });
        reactionCollector.on('collect', function (reaction) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reaction.users.remove(this.msg.author);
                        switch (reaction.emoji.name) {
                            case this.emojiList[0]:
                                this.page = this.page > 0 ? --this.page : this.pages.length - 1;
                                break;
                            case this.emojiList[1]:
                                this.page = this.page + 1 < this.pages.length ? ++this.page : 0;
                                break;
                            default:
                                break;
                        }
                        if (!this.deleteEachPage) return [3 /*break*/, 4];
                        reactionCollector.stop();
                        return [4 /*yield*/, this.current.delete().catch(function () { })];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.msg.channel.send({ embeds: [this.pages[this.page].setFooter("Page " + (this.page + 1) + " / " + this.pages.length)] })];
                    case 2:
                        _a.current = _b.sent();
                        return [4 /*yield*/, this.react()];
                    case 3:
                        _b.sent();
                        this.createMessageCollector();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.current.edit({ embeds: [this.pages[this.page].setFooter("Page " + (this.page + 1) + " / " + this.pages.length)] })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        reactionCollector.on('end', function () {
            if (!_this.current.deleted) {
                _this.current.reactions.removeAll();
            }
        });
    };
    return Paginator;
}());
exports.default = Paginator;
