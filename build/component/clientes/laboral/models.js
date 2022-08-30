"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Laboral = void 0;
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
exports.Laboral = db_1.sequelize.define('laboral', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    situacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    ingreso: {
        type: sequelize_1.DataTypes.STRING,
    }
});
