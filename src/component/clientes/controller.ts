import {Request,Response} from 'express'
import { Carga } from './precarga/models'
import { Personales } from './personales/models'
import { Laboral } from './laboral/models'
import { Cliente } from './cliente/models'
import { Crediticio } from './crediticios/models'
import { Movilidad } from './movilidad/models'
import jwt from "jsonwebtoken";
import { Vendors } from '../vendors/models'
import { INTEGER } from 'sequelize/types'


export async function getClient(req: Request, res: Response) {
  try {
    const vendedor=req.headers["user-id"]
    const cliente = await Carga.findAll({
      where:{
        vendedor:vendedor
      },
      // attributes:["createdAt"     
      // ],
      include:[{
        model:Cliente,
          include:[{
            model:Personales,
              include:[{
                  model:Crediticio,
                        include:[{model:Movilidad}]
                  },
                  {model:Laboral}]
          }]
      }]
    })
     res.status(200).send(cliente)
  } catch (error) {
    return res.status(500).json({message: error})
  }
}

export async function  createClient(req: Request, res: Response) {   
    try {
          const {conoci, horario, telefono} = req.body
          const {nombre,apellido} =req.body
          const vendedor=req.headers["user-id"]
          /**se crea la entidad crediticio */
          const newCrediticio = await Crediticio.create()
          const crediticioId = newCrediticio.getDataValue("id")
           /**se crea la entidad laboral */
          const newLaboral = await Laboral.create()
          const laboralId = newLaboral.getDataValue("id")
           /**se crea la entidad personal */
          const newPersonales = await Personales.create({laboral_Id:laboralId,crediticio_Id:crediticioId})
          const personalesId = newPersonales.getDataValue("id")
           /**se crea la entidad cliente */
          const newCliente = await Cliente.create({apellido,nombre,telefono,personales_Id:personalesId})    
          const clienteId = newCliente.getDataValue("id")  
           /**se crea la entidad carga */  
          const newCarga = await Carga.create({conoci,horario,telefono,vendedor:vendedor,cliente_Id:clienteId})
          const cargaId = newCarga.getDataValue("id") 
          
          newCliente.setDataValue("carga_Id",cargaId)
          newCliente.save()
          newPersonales.setDataValue("cliente_Id",clienteId)
          newPersonales.save()
          newCrediticio.setDataValue("personales_Id",personalesId)
          newCrediticio.save()
          newLaboral.setDataValue("personales_Id",personalesId)
          newLaboral.save()
        res.json({newCarga})

    } catch (error) {
       return res.status(500).json({message: error})
    }
  
}

export async function  deleteClient(req: Request, res: Response) { 
    try {
        const {id} = req.body
        const vendedor=req.headers["user-id"]
        const client = await Carga.findByPk(id)
        console.log("cliente", client)
        client?.destroy()
        res.json(client)
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

export async function  updateClient(req: Request, res: Response) {
    try {
        const { id } = req.body
        const { name,lastname,tel } = req.body
        const { email,domicilio,cuil,edad } = req.body
        const { permuta,credito,donde,actual,tc } = req.body
        const { situacion,ingreso } = req.body
        const { vehiculo } = req.body
        const vendedor=req.headers["user-id"]
        //const ven = await Vendors.findByPk(vendedor)
        vendedor?.valueOf()
        const carga = await Carga.findByPk(id)
        const cliente = await Cliente.findByPk(id)
        const personales = await Personales.findByPk(id)
        const laboral = await Laboral.findByPk(id)
        const crediticio = await Crediticio.findByPk(id)
        const movilidad = await Movilidad.findByPk(id)
        //carga de datos del cliente
        name!==null? cliente?.setDataValue("name", name):""
        lastname!==null? cliente?.setDataValue("apellido", lastname):""
        tel!==null? cliente?.setDataValue("telefono", tel):""
        //carga de datos personales
        email!==null? personales?.setDataValue("email", email):""
        domicilio!==null? personales?.setDataValue("domicilio", domicilio):""
        cuil!==null? personales?.setDataValue("cuil", cuil):""
        edad!==null? personales?.setDataValue("edad", edad):""
        //carga de datos laboral
        situacion!==null? laboral?.setDataValue("situacion", situacion):""
        ingreso!==null? laboral?.setDataValue("ingreso", ingreso):""
        //carga de datos crediticios
        permuta!==null? crediticio?.setDataValue("permuta", permuta):""
        credito!==null? crediticio?.setDataValue("credito", credito):""
        donde!==null? crediticio?.setDataValue("donde", donde):""
        actual!==null? crediticio?.setDataValue("actual", actual):""
        tc!==null? crediticio?.setDataValue("tc", tc):""
        

        crediticio?.save()
        cliente?.save()
        laboral?.save()
        personales?.save()
        res.json({personales:personales, laboral:laboral, cliente:cliente, crediticio:crediticio})
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export async function addMovilidad(req: Request, res: Response) {
  // try {
  //     const {idCliente} = req.body

  //         const vendors = await Vendors.findByPk(idVendor)
          
  //         if(vendors!==null){
  //                await vendors?.update({groupId:idGroup})  
  //               return  res.json({ message: "vendedores agregados al gupo" })                 
  //         }else{
  //            return res.json({ message: "el vendedor no se encontro" })  
  //         }

    
  // } catch (error) {
  //     return res.status(500).json({ message: error })
  // }
}



