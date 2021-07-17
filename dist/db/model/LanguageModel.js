"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize_1 = __importDefault(require("../Sequelize"));
var sequelize_1 = require("sequelize");
exports.default = Sequelize_1.default.define('language', {
    userID: { type: sequelize_1.DataTypes.STRING, allowNull: false, primaryKey: true },
    language: { type: sequelize_1.DataTypes.STRING, allowNull: false }
});
