"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
const models_1 = require("../personales/models");
exports.Cliente = db_1.sequelize.define('cliente', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.Cliente.hasOne(models_1.Personales, {
    foreignKey: 'cliente_Id',
    sourceKey: 'id',
});
exports.Cliente.belongsTo(models_1.Personales, {
    foreignKey: 'personales_Id',
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
