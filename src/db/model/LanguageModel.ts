import sequelize from "../Sequelize"
import { DataTypes  } from "sequelize"

export default sequelize.define('language', {
	userID: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
	language: { type: DataTypes.STRING, allowNull: false }
})