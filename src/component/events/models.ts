import { sequelize } from "../../db";
import {DataTypes} from 'sequelize'
import { Cliente } from "../clientes/cliente/models";
export const Event = sequelize.define('event',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    dia: {
        type: DataTypes.STRING,
    },
    hora:{
        type: DataTypes.STRING,
    },
    tipo:{
        type: DataTypes.STRING,
        
    },
    nota:{
        type: DataTypes.STRING,       
    },
    vendedor:{
        type: DataTypes.INTEGER, 
    }
})

//  Event.hasOne(Cliente,{
//      foreignKey:'event_Id',
//      sourceKey:'id',
//  })
 Event.belongsTo(Cliente,{
    foreignKey: 'cliente_Id',
     targetKey:'id'
 })
