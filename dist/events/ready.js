"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Prefixes_1 = __importDefault(require("../constants/Prefixes"));
var LanguageModel_1 = __importDefault(require("../db/model/LanguageModel"));
exports.default = {
    name: 'ready',
    once: false,
    run: function () {
        var _a;
        // Logging that the bot is ready
        console.log(Prefixes_1.default.BOT + ((_a = __1.client.user) === null || _a === void 0 ? void 0 : _a.tag) + " is ready!");
        // Initializing database models
        LanguageModel_1.default.sync();
    }
};
