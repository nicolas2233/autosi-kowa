import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";
import {getContrato, createContrato,getAllContrato,modificarContratro, getPagos} from './controller'
const router = Router()

  router.get('/contrato',[verifyToken],getContrato),
  
  router.get('/pagos',[verifyToken],getPagos),

  router.post('/contrato',[verifyToken], createContrato)

  router.get('/contrato/all',[verifyToken],getAllContrato)

  router.post('/contrato/pago',[verifyToken], modificarContratro)

export default router