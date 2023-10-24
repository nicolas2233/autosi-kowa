import { sequelize } from "../../db";
import {DataTypes} from 'sequelize'
export const Pago = sequelize.define('Pago',{
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
    pago:{
        type: DataTypes.STRING, 
    },
    vendedor:{
        type: DataTypes.STRING, 
    }
})