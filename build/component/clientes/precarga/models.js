"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carga = void 0;
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
const models_1 = require("../cliente/models");
exports.Carga = db_1.sequelize.define('carga', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    conoci: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    horario: {
        type: sequelize_1.DataTypes.STRING,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    vendedor: {
        type: sequelize_1.DataTypes.INTEGER,
    },
});
//Carga.hasOne(Cliente)
exports.Carga.hasOne(models_1.Cliente, {
    foreignKey: 'carga_Id',
    sourceKey: 'id',
});
exports.Carga.belongsTo(models_1.Cliente, {
    foreignKey: 'cliente_Id',
    targetKey: 'id'
});
