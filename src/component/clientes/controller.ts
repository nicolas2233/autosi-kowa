import {Request,Response} from 'express'
import { Carga } from './precarga/models'
import { Personales } from './personales/models'
import { Laboral } from './laboral/models'
import { Cliente } from './cliente/models'
import { Crediticio } from './crediticios/models'
import { Movilidad } from './movilidad/models'
import jwt from "jsonwebtoken";


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
           /**se crea la entidad personal */
          const newCliente = await Cliente.create({nombre,telefono,personales_Id:personalesId})    
          const clienteId = newCliente.getDataValue("id")  
           /**se crea la entidad personal */  
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
        const client = await Cliente.findByPk(id)
        console.log("cliente", client)
        client?.destroy()
        res.json(client)
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

// export async function  updateClient(req: Request, res: Response) {
//     try {
//         const { id } = req.params
//         const { name,
//            lastname,
//            tel,
//            email
//         } = req.body
//         const client = await Client.findByPk(id)
//         client?.setDataValue("name", name)
//         client?.setDataValue("lastname", lastname)
//         client?.setDataValue("tel", tel)
//         client?.setDataValue("email", email)
//         client?.save()
//         res.json(client)
//     } catch (error) {
//         return res.status(500).json({ message: error })
//     }
// }



