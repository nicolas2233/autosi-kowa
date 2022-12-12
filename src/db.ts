import {Sequelize} from "sequelize";
const newLocal = require('dotenv').config();

//   export const sequelize= new Sequelize(process.env.DATABASE_URL||'postgres://postgres:e1oihCrWqVjlOVqU6fCS@containers-us-west-54.railway.app:6986/railway',
//   {//postgres:e1oihCrWqVjlOVqU6fCS@containers-us-west-54.railway.app:6986/railway
//     dialectOptions:{
//         ssl:{
//                 rejectUnauthorized:false
//         }
//     }
// }
//  )
   export const sequelize= new Sequelize({
    database:'railway',
    username:'postgres',
    password:'e1oihCrWqVjlOVqU6fCS',
    host:'containers-us-west-54.railway.app',
    dialect:'postgres',
    port:6986,
    dialectOptions:{
        ssl:{
                rejectUnauthorized:false
        }
    }
})

// export const sequelize2 = new Sequelize('Kowa-autosi','postgres','pili1804',{
//     host:'localhost',
//     dialect:'postgres',
    
// })


