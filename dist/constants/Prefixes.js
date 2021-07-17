"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Prefixes = /** @class */ (function () {
    function Prefixes() {
    }
    Prefixes.BOT = (chalk_1.default.gray("[") + chalk_1.default.blue("BOT") + chalk_1.default.gray("]") + " ");
    Prefixes.DB = (chalk_1.default.gray("[") + chalk_1.default.red("DB") + chalk_1.default.gray("]") + " ");
    Prefixes.LANGUAGE = (chalk_1.default.gray("[") + chalk_1.default.green("LANGUAGE") + chalk_1.default.gray(']') + " ");
    return Prefixes;
}());
exports.default = Prefixes;
