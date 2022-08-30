// import lowdb from 'lowdb'
// import FileSync from 'lowdb/adapters/FileSync'

import {Sequelize} from "sequelize";
require('dotenv').config()

// export const sequelize = new Sequelize('postgres://afxnmftfheqyzz:7eba79acb21e113199fd2ab3c5960ecb93a15bfadf475c61f4935dc871fdfd49@ec2-54-161-255-125.compute-1.amazonaws.com:5432/daiutfsqr987da',{})
// export const sequelize = new Sequelize('Kowa-autosi','postgres','pili1804',{
//     host:'localhost',
//     dialect:'postgres',

// })
export const sequelize = new Sequelize({
    database:'daiutfsqr987da',
    username:'afxnmftfheqyzz',
    password:'7eba79acb21e113199fd2ab3c5960ecb93a15bfadf475c61f4935dc871fdfd49',
    host:'ec2-54-161-255-125.compute-1.amazonaws.com',
    dialect:'postgres',
    port:5432

})

