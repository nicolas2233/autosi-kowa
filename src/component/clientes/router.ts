import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";

import {addMovilidad, createClient, getAllClient, deleteClient, deleteMovilidad, getClient, updateClient, updateCrediticio, updateLaboral, updatePersonales} from './controller'

const router = Router()


  router.get('/client',[verifyToken],getClient),

  router.get('/client/all',[verifyToken],getAllClient),

  router.post('/client',[verifyToken], createClient),
  
  router.put('/client',[verifyToken],updateClient),

  router.put('/client/crediticio',[verifyToken],updateCrediticio),

  router.put('/client/personal',[verifyToken],updatePersonales),
  
  router.put('/client/laboral',[verifyToken],updateLaboral),
  
  router.post('/client/movi',[verifyToken],addMovilidad)

  router.delete('/client/movi',[verifyToken],deleteMovilidad)

  


export default router