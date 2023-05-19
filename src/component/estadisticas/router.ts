import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";
import {getContratos,getCargas,getEventos,getContratosVendors} from './controller'
const router = Router()

  router.post('/sta/cargas',[verifyToken],getCargas)
  router.post('/sta/contratos',[verifyToken],getContratos)
  router.post('/sta/eventos',[verifyToken],getEventos)
  router.post('/sta/venCargas',[verifyToken],getContratosVendors)

export default router