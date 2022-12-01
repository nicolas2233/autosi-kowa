import {Sequelize} from "sequelize";
require('dotenv').config()

//   export const sequelize= new Sequelize(process.env.DATABASE_URL||'postgres://gyhhlhiwutoqcg:e80a203defb2f84ef5d90b2655c7ceb95c4a0704a564debed01ce6d153897432@ec2-44-195-132-31.compute-1.amazonaws.com:5432/d83luda9mhkob6',
//   {
//     dialectOptions:{
//         ssl:{
//                 rejectUnauthorized:false
//         }
//     }
// }
//  )
 export const sequelize= new Sequelize({
    database:'DB-autosi',
    port:5432,
    username:'Kowa2022',
    password:'Dimaniga123',
    host:'ls-88ead4cfee45676c6184d4a76b8f75e149654868.cduddho6pfaj.us-east-1.rds.amazonaws.com',
    dialect:'postgres',
    dialectOptions:{
        ssl:{
                rejectUnauthorized:false
        }
    }
})

// export const sequelize = new Sequelize('Kowa-autosi','postgres','pili1804',{
//     host:'localhost',
//     dialect:'postgres',
// })


