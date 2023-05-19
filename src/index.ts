import app from './app'
import  {sequelize}  from './db'
import dotenv from 'dotenv'
import { createRole } from './component/roles/controller'
const envFound = dotenv.config();
if(!envFound){
    throw new Error("Couldn't find .env file.");
}
async function main(){
    try {
    await sequelize.sync({force: false, alter: false})
    app.listen(app.get('port'))
    createRole()
    console.log('server listening on port: ', app.get('port'))
    console.log('el servidor quedo enlazado')
    } catch (error) {
        console.log('no se pudo conectar con el servidor',error)
    }   
}

main()