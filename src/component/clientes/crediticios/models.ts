import { sequelize } from "../../../db";
import {DataTypes} from 'sequelize'
import { Movilidad } from "../movilidad/models";

export const Crediticio = sequelize.define('crediticio',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    permuta: {
        type: DataTypes.STRING,
    },
    credito:{
        type: DataTypes.STRING,
    },
    donde:{
        type: DataTypes.STRING,
    },
    actual:{
        type: DataTypes.STRING,
    },
    tc:{
        type: DataTypes.STRING,
    }
})

Crediticio.hasMany(Movilidad,{
    foreignKey:'movilidad_id',
    sourceKey:'id',
})

// Movilidad.belongsTo(Movilidad,{
//     foreignKey: 'movilidad_id',
//     targetKey:'id'
// })
