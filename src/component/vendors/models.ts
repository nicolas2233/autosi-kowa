import { sequelize } from "../../db";
import {DataTypes} from 'sequelize'
export const Vendors = sequelize.define('vendors',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING, 
    },
    password:{
        type: DataTypes.STRING, 
    },
    dni:{
        type: DataTypes.INTEGER, 
    },
    phone:{
        type: DataTypes.INTEGER, 
    },
    category:{
        type: DataTypes.STRING,
    }
})



