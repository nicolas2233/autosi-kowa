import { sequelize } from "../../../db";
import {DataTypes} from 'sequelize'

export const Laboral = sequelize.define('laboral',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    situacion: {
        type: DataTypes.STRING,
    },
    ingreso:{
        type: DataTypes.STRING,
    }
})

