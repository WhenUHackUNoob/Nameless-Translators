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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Prefixes_1 = __importDefault(require("../../constants/Prefixes"));
var LanguageModel_1 = __importDefault(require("../../db/model/LanguageModel"));
var LanguageManager = /** @class */ (function () {
    function LanguageManager() {
    }
    LanguageManager.loadLanguages = function (dir) {
        var languageFiles = fs_1.default.readdirSync(dir);
        for (var _i = 0, languageFiles_1 = languageFiles; _i < languageFiles_1.length; _i++) {
            var languageFile = languageFiles_1[_i];
            var file = fs_1.default.readFileSync(path_1.default.join(dir, languageFile), 'utf8');
            try {
                var json = JSON.parse(file);
                if (!json)
                    continue;
                this.languages.set(languageFile.split('.')[0], json);
                console.log(Prefixes_1.default.LANGUAGE + "loaded language: " + languageFile.split('.')[0]);
            }
            catch (ignored) { }
        }
    };
    LanguageManager.getString = function (user, key) {
        var placeholders = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            placeholders[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var languageCode, data, languageData, keys, result, _a, keys_1, key_1, i, k, v;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(user == "fallback")) return [3 /*break*/, 1];
                        languageCode = "en_UK";
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, LanguageModel_1.default.findOne({ where: { userID: user } })];
                    case 2:
                        data = _b.sent();
                        if (!!data) return [3 /*break*/, 4];
                        return [4 /*yield*/, LanguageModel_1.default.create({ userID: user, language: 'en_UK' })];
                    case 3:
                        data = _b.sent();
                        _b.label = 4;
                    case 4:
                        languageCode = data.get('language');
                        _b.label = 5;
                    case 5:
                        languageData = this.languages.get(languageCode);
                        if (!languageData)
                            return [2 /*return*/, this.getString.apply(this, __spreadArray(["fallback", key], placeholders))];
                        keys = key.split('.');
                        result = languageData;
                        for (_a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                            key_1 = keys_1[_a];
                            result = result[key_1];
                            if (!result) {
                                console.log(Prefixes_1.default.LANGUAGE + ("No language key found for: " + key_1));
                                return [2 /*return*/, this.getString.apply(this, __spreadArray(["fallback", key_1], placeholders))];
                            }
                        }
                        for (i = 0; i < placeholders.length; i += 2) {
                            k = placeholders[i];
                            v = placeholders[i + 1];
                            result = result.replace(k, v);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    LanguageManager.languages = new discord_js_1.Collection();
    LanguageManager.languageMap = {
        "Czech": "cs_CZ",
        "German": "de_DE",
        "Greek": "el_GR",
        "EnglishUK": "en_UK",
        "EnglishUS": "en_US",
        "Spanish": "es_419",
        "SpanishES": "es_ES",
        "French": "fr_FR",
        "Hungarian": "hu_HU",
        "Italian": "it_IT",
        "Lithuanian": "lt_LT",
        "Norwegian": "nb_NO",
        "Dutch": "nl_NL",
        "Polish": "pl_PL",
        "Romanian": "ro_RO",
        "Russian": "ru_RU",
        "Slovak": "sk_SK",
        "Turkish": "tr_TR",
        "Chinese(Simplified)": "zh_CN",
    };
    return LanguageManager;
}());
exports.default = LanguageManager;
