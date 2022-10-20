 import {Request,Response} from 'express'
import { Identifier, Model } from 'sequelize/types'
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
            const count: (Model<any, any> | null)[]=[]
         const newGroup = await Group.create({
            name,
            lider:log.getDataValue("id"),
            include:[{model:Vendors}]
        })  
         miembros.forEach( async (e:string) => {
            const miembro = await Vendors.findByPk(e?.toString())
            if(miembro?.getDataValue("groupId")===null){
                await miembro?.update({groupId:newGroup.getDataValue("id")})
            }else{
                count.push(miembro)
            }
        });
        log.setDataValue("groupId",newGroup.getDataValue("id"))
        log.save()
         if(count.length>0){
           return res.json({message: "grupo creado satisfactoriamente",grupo: newGroup,rechazados: count })
         }
       return res.json({message: "grupo creado satisfactoriamente",newGroup})
        }else{
            res.json({message: "ya eres lider de un grupo"})
        }
        
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
export async function  deleteGroup(req: Request, res: Response) {
    
    try {
        const { id } = req.body
        const group = await Group.findOne({
            where:{
                 id:id
            }
         })
         const vendedor = await Vendors.findAll({
            where:{
                groupId:id
            }
        })
        group?.destroy()
        vendedor.forEach(async e => {
        await e?.update({groupId:null})
        });
        return res.json({ message: "grupo eliminado satisfactoriamente" })
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}
export async function  updateGroup(req: Request, res: Response) {
    try {
        const {idGroup,idLider,nombre} = req.body
        const group = await Group.findByPk(idGroup)
          if(idLider!==null){
           const oldLider=group?.getDataValue("idLider")
           const old = await Vendors.findByPk(oldLider)
           old?.update({groupId:null})
            const newLider = await Vendors.findByPk(idLider)
            newLider?.update({groupId:idGroup})
            group?.update({idLider:idLider})
          }
          if(nombre!==null){
            group?.update({nombre:nombre})
          }
          return res.json({ message:"grupo actualizado satisfactoriamente"})
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
export async function deleteVendor(req: Request, res: Response) {
    try {
        const {idVendor} = req.body
            const vendors = await Vendors.findByPk(idVendor)
                   await vendors?.update({groupId:null})  
                  return  res.json({ message: "vendedore eliminado del gupo" })                     
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

