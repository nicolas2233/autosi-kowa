 import { Router } from "express";
 import { isAdmin, isGerente,verifyToken } from "../../middlewares/verifysingup";
 import {getGroup,updateGroup,createGroup,deleteGroup,addVendors, getGroupForOne} from './controller'
 const router = Router()

   router.get('/group',getGroup)
   router.post('/group', createGroup),
   router.put('/group',updateGroup),
   router.get('group/forOne',getGroupForOne)
   router.delete('/group', deleteGroup),
   router.put('/group/addVendors', addVendors)
   



 export default router
 