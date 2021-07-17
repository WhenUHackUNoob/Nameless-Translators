"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize_1 = __importDefault(require("../Sequelize"));
var sequelize_1 = require("sequelize");
exports.default = Sequelize_1.default.define('starboard', {
    messageID: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    guild: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    channel: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    message: { type: sequelize_1.DataTypes.STRING, allowNull: false }
});
