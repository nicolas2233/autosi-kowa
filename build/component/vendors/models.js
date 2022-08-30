"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendors = void 0;
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
exports.Vendors = db_1.sequelize.define('vendors', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    dni: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    phone: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
    }
});
