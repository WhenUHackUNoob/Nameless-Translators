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
var discord_js_1 = require("discord.js");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Prefixes_1 = __importDefault(require("../../constants/Prefixes"));
var LanguageModel_1 = __importDefault(require("../../db/model/LanguageModel"));
var DEFAULT_LANGUAGE = "en_UK";
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
            var language, translations, translation, i, k, v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLanguage(user)];
                    case 1:
                        language = _a.sent();
                        translations = this.languages.get(language);
                        translation = this.getTranslation(translations, key);
                        if (!translation) {
                            translations = this.languages.get(DEFAULT_LANGUAGE);
                            translation = this.getTranslation(translations, key);
                        }
                        if (!translation) {
                            // We are already the default translation so the term is not set
                            console.log(Prefixes_1.default.BOT + ("Term '" + key + "' is missing from default (" + DEFAULT_LANGUAGE + ") translation"));
                            return [2 /*return*/, undefined];
                        }
                        for (i = 0; i < placeholders.length; i += 2) {
                            k = placeholders[i];
                            v = placeholders[i + 1];
                            translation = translation.split("{" + k + "}").join(v); // .replaceAll doesn't exist so I guess we use this
                        }
                        return [2 /*return*/, translation];
                }
            });
        });
    };
    LanguageManager.getTranslation = function (json, key) {
        var keys = key.split('.');
        var result = json;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var k = keys_1[_i];
            result = result[k];
            if (!result) {
                console.log(Prefixes_1.default.LANGUAGE + ("No language key found for: " + key));
                return undefined;
            }
        }
        return result;
    };
    LanguageManager.getLanguage = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LanguageModel_1.default.findOne({ where: { userID: user } })];
                    case 1:
                        data = _a.sent();
                        if (!!data) return [3 /*break*/, 3];
                        return [4 /*yield*/, LanguageModel_1.default.create({ userID: user, language: 'en_UK' })];
                    case 2:
                        data = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, data.get('language')];
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
