import app from './app'
import {sequelize} from './db'
import '../src/component/projects/models'
import { createRole } from './component/roles/controller'
async function main(){
    try {
    await sequelize.sync({force: false, alter: false})
    app.listen(app.get('port'))
    createRole()
    console.log('server listening on port: 4000')
    console.log('el servidor quedo enlazado')
    } catch (error) {
        console.log('no se pudo conectar con el servidor')
    }   
}

main()