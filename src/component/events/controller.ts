import {Request,Response} from 'express'
import { and, Model } from 'sequelize/types'
import { Cliente } from '../clientes/cliente/models'
import { Vendors } from '../vendors/models'
import { Event } from './models'

export async function getEvent(req: Request, res: Response) {
    try {
        const vendedor = req.headers["user-id"]
        const events = await Event.findAll({
            where: {
                vendedor: vendedor
            }
        })
        res.status(200).send(events)
    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }
}
export async function getAllEvent(req: Request, res: Response) {
    try {
        const gerente=req.headers["user-id"]
        const a = await Vendors.findByPk(Number(gerente))
        if(a?.getDataValue("category")===5){
            const event = await Event.findAll()
            res.status(200).send(event)
        }
        const v = await Vendors.findAll({
      where:{
        gerente:gerente?.toString()
      }
    })
    var zeta: number[]=[]
    v.forEach(e=>{  
      zeta.push(Number(e.getDataValue("id")))
    })
    const events = await Event.findAll()

   var beta: Model<any, any>[] =[]
        for (let i = 0; i < events.length; i++) {
          let e = zeta.indexOf(Number(events[i].getDataValue("vendedor")))
          if(e!=-1){
            beta.push(events[i])
        }
        }
        res.status(200).send(beta)
    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }
}

export async function createEvent(req: Request, res: Response) {
    try {
        const { dia, hora, tipo, nota, clienteId } = req.body
        const vendedor = req.headers["user-id"]
        const date = new Date
        const day = date.getDate()
        const mes = date.getMonth()
        const año = date.getFullYear()
        const fecha = day + "/" + mes + "/" + año
        console.log(day)
        const cliente = await Cliente.findByPk(clienteId)
        const e = await Event.findOne({
            where: {
                dia: dia,
                hora: hora
            }
        })
        if (e !== null) {
            return res.json({ message: "en ese dia ya tienes un evento" })
        }
        if (cliente !== null) {
            const newEvent = await Event.create({
                dia,
                hora,
                tipo,
                nota,
                cliente: clienteId,
                vendedor: vendedor,
                estado: "activo"

            })
            //const eventid = newEvent.getDataValue("id")
            //await cliente.setDataValue("event_Id", eventid)
            //cliente.save()
            return res.json({ message: "evento creado satisfactoriamente", newEvent: newEvent })
        }
        return res.json({ message: "el usuario no se encontro" })

    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }

}

export async function getEventTime(req: Request, res: Response) {
    
    try {
        const vendedor=req.headers["user-id"]
        const date = new Date   
        const day = date.getDate()
        const mes = date.getMonth()+1
        const año = date.getFullYear()
        const fecha = day+"/"+mes+"/"+año
    const events = await Event.findAll({
        where:{
            vendedor,
            dia:fecha.toString()
        },
    })
    res.status(200).send(events)
    }catch (error) {
         return res.sendStatus(500).json({message: error})
    }
}

export async function  canceledEvent(req: Request, res: Response) {
    try {
    const { id } = req.body
    const evento = await Event.findByPk(id)
    evento?.setAttributes("estado","cancelado")
    evento?.save()
    res.send({message:"evento eliminado correctamente", evento:evento})
    } catch (error) {
       return res.status(500).json({message: error})
    }
  
}

export async function  deletedEvent(req: Request, res: Response) {
    try {
    const { id } = req.body
    const evento = await Event.findByPk(id)
    evento?.destroy()
    res.send({message:"evento eliminado correctamente"})
    } catch (error) {
       return res.status(500).json({message: error})
    }
  
}

 export async function  updateEvent(req: Request, res: Response) {
    
     try {
        const { id } = req.body
         const {hora, nota, tipo, clienteId, estado} = req.body
        const evento = await Event.findByPk(Number(id))
        if(hora!==null){
            evento?.setDataValue("hora",hora)
        }
        if(nota!==null){
            evento?.setDataValue("nota",nota)
        }
        if(tipo!==null){
            evento?.setDataValue("tipo",tipo)
        }
        if(clienteId!==null){
            evento?.setDataValue("cliente",clienteId)
        }
        if(estado!==null){
            evento?.setDataValue("estado",estado)
        }
        evento?.save()
       res.json({message: "evento creado satisfactoriamente", event: evento})
        
     } catch (error) {
       return res.status(500).json({message: error})
    }
  
 }

