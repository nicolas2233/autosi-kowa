import { Router } from "express";
import { deleteVendors, getVendors, updateVendors, getOneVendors,getVendorGroup, getVendorCategoy } from './controller'
import {isAdmin, isGerente, verifyToken} from '../../middlewares/verifysingup'
const router = Router()

//[verifyToken,isAdmin]
router.get('/vendors',[verifyToken],getVendors), //trae todos los clientes
 
router.put('/vendors/update',updateVendors), // modificar un vendedor
  
router.delete('/vendors', deleteVendors), // eliminar un vendedor
  
router.get('/vendors/findFor', getOneVendors), // buscar un vendedor por algo

router.get('/vendors/group', getVendorGroup), // buscar vendedores por grupo

router.get('/vendors/category', getVendorCategoy) // buscar vendedores por categoria


export default router