import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";

import {createClient,deleteClient,getClient} from './controller'

const router = Router()


  router.get('/client',[verifyToken],getClient),

  router.post('/client',[verifyToken], createClient)
  
//   router.put('client/:id',updateClient),
  
   router.delete('/client/:id', deleteClient)
  
//   router.get('/client/:id')

export default router