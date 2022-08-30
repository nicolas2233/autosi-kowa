import { sequelize } from "../../../db";
import {DataTypes} from 'sequelize'
import { Laboral } from "../laboral/models";
import { Crediticio } from "../crediticios/models";

export const Personales = sequelize.define('Personales',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    email: {
        type: DataTypes.STRING,
    },
    domicilio:{
        type: DataTypes.STRING,
    },
    cuil:{
        type: DataTypes.STRING,
    },
    edad:{
        type: DataTypes.STRING,
    }
})

Personales.hasOne(Laboral,{
    foreignKey:'personales_Id',
    sourceKey:'id',
})

Personales.belongsTo(Laboral,{
    foreignKey: 'laboral_Id',
    targetKey:'id'
})

Personales.hasOne(Crediticio,{
    foreignKey:'personales_Id',
    sourceKey:'id',
})

Personales.belongsTo(Crediticio,{
    foreignKey: 'crediticio_Id',
    targetKey:'id'
})


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