"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movilidad = void 0;
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
exports.Movilidad = db_1.sequelize.define('Movilidad', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
    },
    marca: {
        type: sequelize_1.DataTypes.STRING,
    },
    modelo: {
        type: sequelize_1.DataTypes.STRING,
    },
    año: {
        type: sequelize_1.DataTypes.STRING,
    }
});
