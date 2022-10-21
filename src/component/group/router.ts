 import { Router } from "express";
 import { isAdmin, isGerente,verifyToken } from "../../middlewares/verifysingup";
 import {getGroup,updateGroup,createGroup,deleteGroup,addVendors, getGroupForOne, deleteVendor} from './controller'
 const router = Router()

   router.get('/group',getGroup)
   router.post('/group', createGroup),
   router.put('/group',updateGroup),
   router.post('/group/forOne',getGroupForOne)
   router.delete('/group', deleteGroup),
   router.put('/group/addVendors', addVendors)
   router.put('/group/deleteVendors', deleteVendor)

   



 export default router
 