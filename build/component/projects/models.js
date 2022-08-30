"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
exports.Project = db_1.sequelize.define('projects', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    }
});
// Project.hasMany(Task,{
//     foreignKey:'projectId',
//     sourceKey:'id',
// })
// Project.belongsTo(Project,{
//     foreignKey: 'projectId',
//     targetKey:'id'
// })
