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
         var count: any[]=[]
         var n=0
         const newGroup = await Group.create({
            name,
            lider:log.getDataValue("id")
        })  
        //  miembros.forEach( async (e:string) => {
        //     let n=0
        //     const miembro = await Vendors.findByPk(e?.toString())
        //     if(miembro?.getDataValue("groupId")===null){
        //         await miembro?.update({groupId:newGroup.getDataValue("id")})
        //     }else{
        //         console.log("*************soy e",e)
        //         count[n]=e
        //         n++
        //     }
        // });
        for (let i = 0; i < miembros.length; i++) {
            const e= miembros[i]
            const miembro = await Vendors.findByPk(e?.toString())
            if(miembro?.getDataValue("groupId")===null){
                await miembro?.update({groupId:newGroup.getDataValue("id")})
            }else{
                count[n]=miembro?.getDataValue("email")
                n=n+1
            }
            
        }
        log.setDataValue("groupId",newGroup.getDataValue("id"))
        log.save()
           return res.json({message: "grupo creado satisfactoriamente",grupo: newGroup, rechazados: count })
         
       // res.json({message: "grupo creado satisfactoriamente",newGroup})
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
           group?.update({lider:null})
           const old = await Vendors.findByPk(oldLider)
           console.log(old)
           old?.update({groupId:null})
            const newLider = await Vendors.findByPk(idLider)
            console.log(newLider)
            group?.update({lider:idLider})
            newLider?.update({groupId:idGroup})
          }
          if(nombre!==null){
            group?.update({name:nombre})
          }
          return res.json({ message:"grupo actualizado satisfactoriamente", group})
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
export async function addVendors(req: Request, res: Response) {
    try {
        const {idVendor,idGroup} = req.body
            const vendors = await Vendors.findByPk(idVendor)

            if(vendors!==null){
                if(vendors.getDataValue("groupId")!==null){
                return  res.json({ message: "el vendedor ya pertenece a un grupo" }) 
                }else{
                     await vendors?.update({groupId:idGroup})  
                  return  res.json({ message: "vendedores agregados al gupo" })  
                }
                                 
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
                   
                  return  res.json({ message: "vendedor eliminado del gupo", vendors })                     
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

