import { Router } from "express";
import { verifyToken } from "../../middlewares/authjws";
import * as auth from './controller'
const router = Router()


  router.post('/auth/signin',auth.signin),

  router.post('/auth/signup',[verifyToken], auth.signup)
  


export default router

