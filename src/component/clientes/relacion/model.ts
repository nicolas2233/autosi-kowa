import { sequelize } from "../../../db";
import {DataTypes} from 'sequelize'

export const moviCred = sequelize.define('moviCred',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    }
},{
    timestamps:false,
})