import {Request,Response} from 'express'
import { Cliente } from '../clientes/cliente/models'
import { Event } from './models'

export async function getEvent(req: Request, res: Response) {
    try {
        const vendedor = req.headers["user-id"]
        const events = await Event.findAll({
            include: [{ model: Cliente }],
            where: {
                vendedor: vendedor
            }
        })
        res.status(200).send(events)
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
                cliente_Id: clienteId,
                vendedor: vendedor
            })
            const eventid = newEvent.getDataValue("id")
            await cliente.setDataValue("event_Id", eventid)
            cliente.save()
            return res.json({ message: "evento creado satisfactoriamente", newEvent: newEvent })
        }
        return res.json({ message: "el usuario no se encontro" })

    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }

}

export async function getEventTime(req: Request, res: Response) {
    
    try {
        const date = new Date   
        const day = date.getDate()
        const mes = date.getMonth()+1
        const año = date.getFullYear()
        const fecha = day+"/"+mes+"/"+año
    const vendedor=req.headers["user-id"]
    const events = await Event.findAll({
        include:[{model:Cliente}],
        where:{
            vendedor:vendedor,
            dia:fecha
        }
    })
    res.status(200).send(events)
    }catch (error) {
         return res.sendStatus(500).json({message: error})
    }
}



// export async function  deleteProject(req: Request, res: Response) {
    
//     try {
//           const { id } = req.params
//     await Project.destroy({
//         where:{
//             id
//         }
//       })
//         res.send("projecto eliminad correctamente")
//     } catch (error) {
//        return res.status(500).json({message: error})
//     }
  
// }

// export async function  updateProject(req: Request, res: Response) {
    
//     try {
//         const { id } = req.params
//         const {name, priority, description} = req.body

//         const project = await Project.findByPk(id)
//         console.log("este es un apdate",project)
        
       
        
//     } catch (error) {
//        return res.status(500).json({message: error})
//     }
  
// }
