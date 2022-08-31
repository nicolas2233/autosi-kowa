// import lowdb from 'lowdb'
// import FileSync from 'lowdb/adapters/FileSync'

import {Sequelize} from "Sequelize";
// var parse = require('pg-connection-string').parse
// var config = parse('postgres://afxnmftfheqyzz:7eba79acb21e113199fd2ab3c5960ecb93a15bfadf475c61f4935dc871fdfd49@ec2-54-161-255-125.compute-1.amazonaws.com:5432/daiutfsqr987da')
require('dotenv').config()

 export const sequelize = new Sequelize('postgres://afxnmftfheqyzz:7eba79acb21e113199fd2ab3c5960ecb93a15bfadf475c61f4935dc871fdfd49@ec2-54-161-255-125.compute-1.amazonaws.com:5432/daiutfsqr987da',{})
// export const sequelize = new Sequelize('Kowa-autosi','postgres','pili1804',{
//     host:'localhost',
//     dialect:'postgres',

// })
// export const sequelize = new Sequelize({
//     database:'dbbrqr2j3gb2ns',
//     username:'rymkijagqdxitw',
//     password:'8313b1932d1e5d1ec666e52b9776e03d0ece1769bd0d0ef1f564bd5958819780',
//     host:'ec2-3-224-184-9.compute-1.amazonaws.com',
//     dialect:'postgres'
// })

