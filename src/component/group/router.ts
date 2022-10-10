 import { Router } from "express";
 import { isAdmin, isGerente,verifyToken } from "../../middlewares/verifysingup";
 import {getGroup,updateGroup,createGroup,deleteGroup,addVendors} from './controller'
 const router = Router()

   router.get('/group',getGroup)
   router.post('/group',[verifyToken,isGerente,isAdmin], createGroup),
   router.put('group/:id',updateGroup),
   router.delete('/group/:id', deleteGroup),
   router.put('/group/addVendors', addVendors)
   



 export default router
 