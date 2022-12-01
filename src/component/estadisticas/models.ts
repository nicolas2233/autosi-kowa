import { sequelize } from "../../db";
import {DataTypes} from 'sequelize'
export const Project = sequelize.define('projects',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority:{
        type: DataTypes.INTEGER,
    },
    description:{
        type: DataTypes.STRING,
        
    }
})

// Project.hasMany(Task,{
//     foreignKey:'projectId',
//     sourceKey:'id',
// })

// Project.belongsTo(Project,{
//     foreignKey: 'projectId',
//     targetKey:'id'
// })
