import { sequelize } from "../../../db";
import {DataTypes} from 'sequelize'

export const Movilidad = sequelize.define('Movilidad',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    tipo: {
        type: DataTypes.STRING,
    },
    marca:{
        type: DataTypes.STRING,
    },
    modelo:{
        type: DataTypes.STRING,
    },
    año:{
        type: DataTypes.STRING,
    }
})
