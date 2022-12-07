import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";
import {getContrato, createContrato} from './controller'
const router = Router()

  router.get('/contrato',getContrato),

  router.post('/contrato', createContrato)

export default router