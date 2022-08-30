"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personales = void 0;
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
const models_1 = require("../laboral/models");
const models_2 = require("../crediticios/models");
exports.Personales = db_1.sequelize.define('Personales', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    domicilio: {
        type: sequelize_1.DataTypes.STRING,
    },
    cuil: {
        type: sequelize_1.DataTypes.STRING,
    },
    edad: {
        type: sequelize_1.DataTypes.STRING,
    }
});
exports.Personales.hasOne(models_1.Laboral, {
    foreignKey: 'personales_Id',
    sourceKey: 'id',
});
exports.Personales.belongsTo(models_1.Laboral, {
    foreignKey: 'laboral_Id',
    targetKey: 'id'
});
exports.Personales.hasOne(models_2.Crediticio, {
    foreignKey: 'personales_Id',
    sourceKey: 'id',
});
exports.Personales.belongsTo(models_2.Crediticio, {
    foreignKey: 'crediticio_Id',
    targetKey: 'id'
});
// cbu:0150515301000133268408
// nombre: cecilia teresa Ñañez
// banco:icbc
// cbu:0150549801000105008353
// nombre:alvaro facundo miño
// cbu: 0150804601000125617038
// nombre:blanca del valle Ñañez
// banco:icbc
// cbu:4150999718002678470027
// alias:yamile.cimio.ars
// nombre: yamile cimino viñales
// banco: reba
// CBU: 4150999718005528820025
// Alias: MELENA.PROA.SANTA
// cbu: 0150817601000112993639
// nombre: iñaki
