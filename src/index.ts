import app from './app'
import  {sequelize}  from './db'
import dotenv from 'dotenv'
import '../src/component/projects/models'
import { createRole } from './component/roles/controller'
const envFound = dotenv.config();
if(!envFound){
    throw new Error("Couldn't find .env file.");
}
async function main(){
    try {
    await sequelize.sync({force: true, alter: true})
    app.listen(app.get('port'))
    createRole()
    console.log('server listening on port: 4000')
    console.log('el servidor quedo enlazado')
    } catch (error) {
        console.log('no se pudo conectar con el servidor',error)
    }   
}

main()