 import {Request,Response} from 'express'
import { Identifier } from 'sequelize/types'
import { Vendors } from '../vendors/models'
 import { Group} from './models'

export async function getGroup(req: Request, res: Response) {
    try { 
    const group = await Group.findAll({
        include:[{model:Vendors}]
     }
     )
      res.status(200).send(group)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
export async function  createGroup(req: Request, res: Response) { 
    try {
        const {name,idLider,miembros} = req.body

        const log = await Vendors.findByPk(idLider?.toString())
        if(log?.getDataValue("groupId")===null){
         const newGroup = await Group.create({
            name,
            lider:log.getDataValue("id")
        })  
         miembros.forEach( async (e:string) => {
            const miembro = await Vendors.findByPk(e?.toString())
            if(miembro?.getDataValue("groupId")===null){
                await miembro?.update({groupId:newGroup.getDataValue("id")})
            }
        });
        log.setDataValue("groupId",newGroup.getDataValue("id"))
        log.save()
        res.json({message: "grupo creado satisfactoriamente",newGroup})
        }else{
            res.json({message: "ya eres lider de un grupo"})
        }
        
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
export async function  deleteGroup(req: Request, res: Response) {
    
    try {

    } catch (error) {
        return res.status(500).json({ message: error })
    }

}
export async function  updateGroup(req: Request, res: Response) {
    try {
      
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
export async function addVendors(req: Request, res: Response) {
    try {
        const {idVendor,idGroup} = req.body
            const vendors = await Vendors.findByPk(idVendor)

            if(vendors!==null){
                   await vendors?.update({groupId:idGroup})  
                  return  res.json({ message: "vendedores agregados al gupo" })                 
            }else{
               return res.json({ message: "el vendedor no se encontro" })  
            }

      
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export async function getGroupForOne(req: Request, res: Response) {
    try { 
        const {idGroup} = req.body
    const group = await Group.findOne({
        where:{
             id:idGroup
        },
        include:[{model:Vendors}]
     }
     )
      res.status(200).send(group)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
