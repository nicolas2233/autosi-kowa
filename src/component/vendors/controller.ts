import {Request,Response} from 'express'
import { Vendors } from './models'
import { Role } from '../roles/models'
import bcrypt from 'bcryptjs'
import { Group } from '../group/models'

export async function getVendors(req: Request, res: Response) {
  try {   
    const gerente = req.headers["user-id"]
    console.log("*****************",gerente)
    const ger= await Vendors.findByPk(Number(gerente))
    if(ger?.getDataValue("category")===4){
         const vendors = await Vendors.findAll({
            where:{
                gerente:gerente?.toString()
            }
        }) 
        return res.status(200).send(vendors)
    }
    if(ger?.getDataValue("category")===5){
        const vendors = await Vendors.findAll() 
       return res.status(200).send(vendors)
   }
   return res.status(200).send({Message:"no se encontro vendedores"})
       
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
export async function getOneVendors(req: Request, res: Response) {
    try {
        const {name, lastname, dni, email, phone}=req.body
         const arr=[name,lastname,dni,email,phone]
         const txt=["name","lastname","dni","email","phone"]
         var num =0
         var val
         var value
         var vendor
        while (arr[num]===null || arr[num]===undefined) {
           num++ 
        }
         val=txt[num]
         value=arr[num]
         switch (val) {
            case "name":
              vendor = await Vendors.findOne({
                    where:{name:value}
            })
                break;
            case "lastname":
                vendor = await Vendors.findOne({
                    where:{lastname:value}
            })
             
                break;
                case "dni":
                    vendor = await Vendors.findOne({
                        where:{dni:value}
                })
                
                break;
                case "email":
                    vendor = await Vendors.findOne({
                        where:{email:value}
                })
                
                break;
                case "phone":
                    vendor = await Vendors.findOne({
                        where:{phone:value}
                })
                break;
            default:
                 
                break;
        }
        console.log(vendor)
        if(vendor===null || vendor===undefined){
            return res.status(200).send({message: "no se pudo encontrar ningun vendedor"})
        }
         return res.status(200).send(vendor)
        
    } catch (error) {
        return res.status(500).json({ message: error })
    }   
}
export async function deleteVendors(req: Request, res: Response) {
    try {
        const { id } = req.body
        const vendor = await Vendors.findByPk(id)
        const group = await Group.findOne({
            where:{
                lider:id.toString()
            }
        })
        if(group===null){
            vendor?.destroy()
            res.json({message:"el vendedor a sido eliminado exitosamente", vendor})
        }else{
            res.json({message:"el vendedor es lider de un grupo", group})
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}
export async function updateVendors(req: Request, res: Response) {
    try {
        const { id, email, phone, password, category } = req.body
        const rol = await Role.findOne({ where: { name: category } });
        if (rol !== null) {
            var catrol = rol.getDataValue("id");
         } 
       const vendedor = await Vendors.findByPk(id?.toString())
       if (email!==null) {
            const newemail = await Vendors.findOne({
                where:{
                    email:email
                }
            })
            if(newemail===null){
                vendedor?.update({email:email})
            }else if(vendedor?.getDataValue("email")===email)
            {
                
            }else{
                return res.json({ message: "email ya existente" })
            }
       }
       if (phone!==null) {
        vendedor?.update({phone:phone})
       }
       if(password!==null){
        vendedor?.update({password:await passencrypting(password)})
       }
       if(category!==null){
        vendedor?.update({category: catrol.toString()})
       }
        vendedor?.save()
       res.json({vendedor,messeger:"modificaste al vendedor satisfactoriamente"})
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}
export async function getVendorGroup(req: Request, res: Response) {
    try {
        const { groupid } = req.body
        const vendedor = await Vendors.findAll({
            where:{
                groupId:groupid
            }
        })
        res.json(vendedor)
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}
export async function getVendorCategoy(req: Request, res: Response) {
    try {
        const { category } = req.body
        const vendedor = await Vendors.findAll({
            where:{
                category:category
            }
        })
        res.json(vendedor)
    } catch (error) {
        return res.status(500).json({ message: error })
    }

   

}
 const passencrypting = async (pass: string) => {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(pass, salt)
      }