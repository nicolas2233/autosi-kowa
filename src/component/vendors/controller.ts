import {Request,Response} from 'express'
import { Vendors } from './models'


export async function getVendors(req: Request, res: Response) {
    try {
        const vendors = await Vendors.findAll() 
        return res.status(200).send(vendors)
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
        vendor?.destroy()
        res.json(vendor)
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}
export async function updateVendors(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { email,
            password,
            phone,
            category
        } = req.body
        const vendedor = await Vendors.findByPk(id)
        vendedor?.setDataValue("email", email)
        vendedor?.setDataValue("password", password)
        vendedor?.setDataValue("phone", phone)
        vendedor?.setDataValue("category", category)
        vendedor?.save()
        res.json(vendedor)
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
