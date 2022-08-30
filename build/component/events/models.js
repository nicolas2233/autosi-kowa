"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const models_1 = require("../clientes/cliente/models");
exports.Event = db_1.sequelize.define('event', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dia: {
        type: sequelize_1.DataTypes.STRING,
    },
    hora: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
    },
    nota: {
        type: sequelize_1.DataTypes.STRING,
    },
    vendedor: {
        type: sequelize_1.DataTypes.INTEGER,
    }
});
exports.Event.hasOne(models_1.Cliente, {
    foreignKey: 'event_Id',
    sourceKey: 'id',
});
exports.Event.belongsTo(models_1.Cliente, {
    foreignKey: 'cliente_Id',
    targetKey: 'id'
});
