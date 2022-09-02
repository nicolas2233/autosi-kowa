import { Router } from "express";
import { deleteVendors, getVendors, updateVendors, getOneVendors,getVendorGroup } from './controller'
import {isAdmin, verifyToken} from '../../middlewares/verifysingup'
const router = Router()

//[verifyToken,isAdmin]
router.get('/vendors',getVendors),
 
router.put('/vendors/:id',updateVendors),
  
router.delete('/vendors/:id', deleteVendors),
  
router.get('/vendors/findFor', getOneVendors),

router.get('/vendors/group', getVendorGroup)
export default router