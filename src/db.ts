import {Sequelize} from "sequelize";
require('dotenv').config()

console.log("*******",process.env.DATABASE_URL)
  export const sequelize= new Sequelize(process.env.DATABASE_URL||'postgres://rymkijagqdxitw:8313b1932d1e5d1ec666e52b9776e03d0ece1769bd0d0ef1f564bd5958819780@ec2-3-224-184-9.compute-1.amazonaws.com:5432/dbbrqr2j3gb2ns',{
    dialectOptions:{
        ssl:{
                rejectUnauthorized:false
        }
    }
 })
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


