import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";
import {getContrato, createContrato,getAllContrato} from './controller'
const router = Router()

  router.get('/contrato',[verifyToken],getContrato),

  router.post('/contrato',[verifyToken], createContrato)

  router.get('/contrato/all',[verifyToken],getAllContrato)

export default router