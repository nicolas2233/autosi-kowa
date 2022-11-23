import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";

import {createClient,deleteClient,getClient, updateClient, updateCrediticio, updateLaboral, updatePersonales} from './controller'

const router = Router()


  router.get('/client',[verifyToken],getClient),

  router.post('/client',[verifyToken], createClient)
  
  router.put('/client',[verifyToken],updateClient),

  router.put('/client/crediticio',[verifyToken],updateCrediticio),

  router.put('/client/personal',[verifyToken],updatePersonales),
  
  router.put('/client/laboral',[verifyToken],updateLaboral),
  
  router.delete('/client/:id', deleteClient)
  
//   router.get('/client/:id')

export default router