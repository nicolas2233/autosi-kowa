"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
exports.Role = db_1.sequelize.define('role', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    }
});
