"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize_1 = __importDefault(require("../Sequelize"));
var sequelize_1 = require("sequelize");
exports.default = Sequelize_1.default.define('tags', {
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
    description: { type: sequelize_1.DataTypes.TEXT },
    username: { type: sequelize_1.DataTypes.STRING },
    usage_count: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0, allowNull: false }
});
