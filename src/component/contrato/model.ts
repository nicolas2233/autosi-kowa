import { sequelize } from "../../db";
import {DataTypes} from 'sequelize'
import { Cliente } from "../clientes/cliente/models";
export const Contrato = sequelize.define('contrato',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    numeroContrato: {
        type: DataTypes.STRING,
    },
    dia:{
        type: DataTypes.STRING,
    },
    metodopago:{
        type: DataTypes.STRING,
        
    },
    suscripcion:{
        type: DataTypes.STRING,       
    },
    sellado:{
        type: DataTypes.STRING, 
    },
    otorgado:{
        type: DataTypes.STRING, 
    },
    adeudado:{
        type: DataTypes.STRING, 
    },
    cliente:{
        type: DataTypes.STRING, 
    },
    vendedor:{
        type: DataTypes.STRING, 
    }
})

