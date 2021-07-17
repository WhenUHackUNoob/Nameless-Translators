"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize_1 = __importDefault(require("../Sequelize"));
var sequelize_1 = require("sequelize");
exports.default = Sequelize_1.default.define('moderations', {
    action: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    issuer: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    member: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    guild: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    reason: { type: sequelize_1.DataTypes.TEXT },
    context: { type: sequelize_1.DataTypes.STRING },
    length: { type: sequelize_1.DataTypes.STRING },
    expires: { type: sequelize_1.DataTypes.STRING },
    expired: { type: sequelize_1.DataTypes.BOOLEAN },
    roles: { type: sequelize_1.DataTypes.TEXT },
});
