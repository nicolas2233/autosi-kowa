import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";
import {getContrato, createContrato} from './controller'
const router = Router()

  router.get('/contrato',[verifyToken],getContrato),

  router.post('/contrato',[verifyToken], createContrato)

export default router