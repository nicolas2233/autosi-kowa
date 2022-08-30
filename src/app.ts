import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
//import routas from '../src/utils/routers'
import swaggerJSDoc from 'swagger-jsdoc'
import swagerUI from 'swagger-ui-express'
import { options } from './config-swagger'
//import { createRole } from './component/roles/controller'
// const { useTreblle } = require("treblle");
const  app = express()

app.set('port', process.env.PORT || 4000)
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
// useTreblle(app, {
//     apiKey: "fsvUcgT2BNcCTr3dSTAfbf6c7RpTVuyE",
//     projectId: "yuyOW4QgeWLTcUwk"
// });
const specs = swaggerJSDoc(options)
app.get("/", function (req,res){
    res.json({mensagge:"hola mundo"})
})
//app.use(routas)
app.use('/docs', swagerUI.serve, swagerUI.setup(specs))
export default app