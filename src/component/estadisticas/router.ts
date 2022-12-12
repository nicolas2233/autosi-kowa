import { Router } from "express";
import {getContratos} from './controller'
const router = Router()

  router.get('/sta/contratos',getContratos)



export default router