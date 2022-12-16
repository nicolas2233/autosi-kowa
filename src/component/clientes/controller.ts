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
import { moviCred } from './relacion/model'


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
export async function getAllClient(req: Request, res: Response) {
  try {
    const gerente=req.headers["user-id"]
    
    const cliente = await Carga.findAll({
      where:{
        vededor: await Vendors.findAll({where:{gerente:gerente?.toString()}})
      },
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
        const { nombre,apellido,telefono } = req.body
        const vendedor=req.headers["user-id"]
        //const ven = await Vendors.findByPk(vendedor)
        vendedor?.valueOf()
       
        const cliente = await Cliente.findByPk(Number(id))
        const precarga = await Carga.findByPk(Number(id))
        //carga de datos del cliente
        if(nombre!==null){
          cliente?.setDataValue("nombre", nombre)
        }
        if(apellido!==null){
          cliente?.setDataValue("apellido", apellido)
        }
        if(telefono!==null){
          precarga?.setDataValue("telefono", telefono)
        }
      
        cliente?.save()
        precarga?.save()
        res.json({cliente:cliente, precarga:precarga })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


export async function updatePersonales(req: Request, res: Response) {
  try {
      const { id } = req.body
      const { email,domicilio,cuil,edad } = req.body
       
      const vendedor=req.headers["user-id"]
      vendedor?.valueOf()
      const personales = await Personales.findByPk(Number(id))
      //carga de datos personales
      if(email!==null){
        personales?.setDataValue("email", email)
      }
      if(domicilio!==null){
        personales?.setDataValue("domicilio", domicilio)
      }
      if(cuil!==null){
        personales?.setDataValue("cuil", cuil)
      }
      if(edad!==null){
        personales?.setDataValue("edad", edad)
      }

      
      personales?.save()
      res.json({personales:personales})
  } catch (error) {
      return res.status(500).json({ message: error })
  }
}

export async function  updateLaboral(req: Request, res: Response) {
  try {
      const { id } = req.body
      const { situacion,ingreso } = req.body
      const vendedor=req.headers["user-id"]
      vendedor?.valueOf()
      const laboral = await Laboral.findByPk(Number(id))
      //carga de datos personales
      if(situacion!==null){
        laboral?.setDataValue("situacion", situacion)
       
      }
      if(ingreso!==null){
        laboral?.setDataValue("ingreso", ingreso)
      }
      laboral?.save()
      res.json({laboral:laboral})
  } catch (error) {
      return res.status(500).json({ message: error })
  }
}
export async function updateCrediticio(req: Request, res: Response) {
  try {
      const { id } = req.body
      const { permuta,credito,donde,actual,tc } = req.body
       
      const vendedor=req.headers["user-id"]
      vendedor?.valueOf()
      const crediticio = await Crediticio.findByPk(Number(id))

      //carga de datos personales
      if(permuta!==null){
        crediticio?.setDataValue("permuta", permuta)
      }
      if(credito!==null){
        crediticio?.setDataValue("credito", credito)
      }
      if(donde!==null){
        crediticio?.setDataValue("donde", donde)
      }
      if(actual!==null){
        crediticio?.setDataValue("actual", actual)
      }
      if(tc!==null){
        crediticio?.setDataValue("tc", tc)
      }

      crediticio?.save()
      res.json({crediticio:crediticio})
  } catch (error) {
      return res.status(500).json({ message: error })
  }
}
export async function addMovilidad(req: Request, res: Response) {
  try {
      const {id} = req.body
      const {tipo, marca, modelo, año,permuta} = req.body
      const crediticio = await Crediticio.findByPk(id)
      const newVehiculo = await Movilidad.create({tipo:tipo,marca:marca,modelo:modelo,año:año,permuta:permuta})
      const idvehiculo=newVehiculo.getDataValue("id")
      const s = await moviCred.create({crediticioId:id, MovilidadId:idvehiculo})
      return res.json({ newVehiculo: newVehiculo })
  } catch (error) {
      return res.status(500).json({ message: error })
  }
}
export async function deleteMovilidad(req: Request, res: Response) {
  try {
      const {idcliente,idmovilidad} = req.body
      const v = await Movilidad.findByPk(idmovilidad)
      const s = await moviCred.findOne({
        where:{
          crediticioId:idcliente, 
          MovilidadId:idmovilidad
  }})
  v?.destroy()
  s?.destroy()
      return res.json({ message:"el vehiculo se elimino" })
  } catch (error) {
      return res.status(500).json({ message: error })
  }
}



