import { sequelize } from "../../../db";
import {DataTypes} from 'sequelize'
import { Cliente } from "../cliente/models";


export const Carga = sequelize.define('carga',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    conoci: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horario:{
        type: DataTypes.STRING,
    },
    telefono:{
        type: DataTypes.STRING,
    },
    vendedor:{
        type: DataTypes.INTEGER,
    },

})


 //Carga.hasOne(Cliente)
 Carga.hasOne(Cliente,{
    foreignKey:'carga_Id',
    sourceKey:'id',
})

Carga.belongsTo(Cliente,{
    foreignKey: 'cliente_Id',
    targetKey:'id'
})

