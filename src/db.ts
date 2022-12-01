import {Sequelize} from "sequelize";
require('dotenv').config()

  export const sequelize= new Sequelize(process.env.DATABASE_URL||'postgresql://postgres:e1oihCrWqVjlOVqU6fCS@containers-us-west-54.railway.app:6986/railway',
  {
    dialectOptions:{
        ssl:{
                rejectUnauthorized:false
        }
    }
}
 )
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


