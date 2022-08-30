"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crediticio = void 0;
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
const models_1 = require("../movilidad/models");
exports.Crediticio = db_1.sequelize.define('crediticio', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    permuta: {
        type: sequelize_1.DataTypes.STRING,
    },
    credito: {
        type: sequelize_1.DataTypes.STRING,
    },
    donde: {
        type: sequelize_1.DataTypes.STRING,
    },
    actual: {
        type: sequelize_1.DataTypes.STRING,
    },
    tc: {
        type: sequelize_1.DataTypes.STRING,
    }
});
exports.Crediticio.hasMany(models_1.Movilidad, {
    foreignKey: 'movilidad_id',
    sourceKey: 'id',
});
// Movilidad.belongsTo(Movilidad,{
//     foreignKey: 'movilidad_id',
//     targetKey:'id'
// })
