import {Sequelize} from "sequelize";
require('dotenv').config()

  export const sequelize= new Sequelize(process.env.DATABASE_URL||'postgres://gyhhlhiwutoqcg:e80a203defb2f84ef5d90b2655c7ceb95c4a0704a564debed01ce6d153897432@ec2-44-195-132-31.compute-1.amazonaws.com:5432/d83luda9mhkob6',
  {
    dialectOptions:{
        ssl:{
                rejectUnauthorized:false
        }
    }
}
 )
//     console.log("estoy en el else")
//     const sequelize= new Sequelize({
//     database:'daiutfsqr987da',
//     username:'afxnmftfheqyzz',
//     password:'7eba79acb21e113199fd2ab3c5960ecb93a15bfadf475c61f4935dc871fdfd49',
//     host:'ec2-54-161-255-125.compute-1.amazonaws.com',
//     dialect:'postgres',
//     dialectOptions:{
//         ssl:{
//                 rejectUnauthorized:false
//         }
//     }
// })

// export const sequelize = new Sequelize('Kowa-autosi','postgres','pili1804',{
//     host:'localhost',
//     dialect:'postgres',

// })


