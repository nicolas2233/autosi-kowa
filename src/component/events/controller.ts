import {Request,Response} from 'express'
import { and, Model, Op } from 'sequelize'
import { Cliente } from '../clientes/cliente/models'
import { Vendors } from '../vendors/models'
import { Event } from './models'
import nodemailer from 'nodemailer';
const sendmail = require("sendmail")();

 const enviarMail = async(mail:any,events:any) =>{

   const config={
    host: 'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user: "maxidisilvestro@gmail.com",
        pass: "kjbwnllcjxphfgsu",
    }
   }


//    const cardsHTML = events.map((item:any) => `
//    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
//      <h2>Tipo: ${item.tipo}</h2>
//      <p>Hora: ${item.hora}:00 Hs</p>
//      <p>Cliente: ${item.clienteNom} ${item.clienteApe}</p>
//      <p>Nota: ${item.nota}</p>
//    </div>
//  `).join('');

 const cardsHTML =`
 <h1>Eventos del dia: ${events[0].fecha} </h1>
 ${events.map((item:any) => `
   <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
   <h2>Cliente: ${item.clienteNom} ${item.clienteApe}</h2>
   <p>Hora: ${item.hora}:00 Hs</p>
   <p>Tipo: ${item.tipo}</p>
     <p>Nota: ${item.nota}</p>
   </div>
 `).join('')}
`;

   const mailOptions = {
    from: "maxidisilvestro@gmail.com",
    to: mail,
    subject: "Autosi eventos",
    html:cardsHTML,
    //JSON.stringify(events),
  };
    const transporter = nodemailer.createTransport(config);
    const info = await transporter.sendMail(mailOptions)

    console.log(info)
}

//'kjbwnllcjxphfgsu'
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
        if(Number(a?.getDataValue("category"))===5){
            const event = await Event.findAll()
          return res.status(200).send(event)
        }else{
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
       return res.status(200).send(beta)
    }
    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }
}

export async function createEvent(req: Request, res: Response) {
    try {
        const { dia, hora, tipo, nota, clienteId,estado } = req.body
        const vendedor = req.headers["user-id"]
        const date = new Date
        const day = date.getDate()
        const mes = date.getMonth()
        const año = date.getFullYear()
        const fecha = day + "/" + mes + "/" + año
        const cliente = await Cliente.findByPk(clienteId)

        const e = await Event.findOne({
            where: {
                [Op.and]: [
                    { vendedor:vendedor},
                    { dia: dia },
                    { hora: hora }
                  ]
            }
        })
        console.log(">>>>>>>>>>>>>>>>>>",e)
        console.log("<<<<<<<DIA:",dia,">>>>>>>>>>")
        console.log("<<<<<<<HORA:",hora,">>>>>>>>>>")
        if (e === null || e === undefined) {
            const newEvent = await Event.create({
                dia: dia,
                hora: hora,
                tipo,
                nota,
                cliente: clienteId,
                vendedor: vendedor,
                estado: estado
                
            })
            return res.json({ message: "evento creado satisfactoriamente", newEvent: newEvent })
        }
        
        return res.json({ message: "en ese dia ya tienes un evento" })
    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }

}

export async function getEventTime(req: Request, res: Response) {
    
    try {
        const vendedor=req.headers["user-id"]
        const date = new Date   
        let day = date.getDate()
        const dia=day.toString().length===1?"0"+day.toString():day
        const mes = date.getMonth()+1
        const month=mes.toString().length===1?"0"+mes.toString():mes
        const año = date.getFullYear()
        const fecha = dia+"/"+month+"/"+año
        
        const vend = await Vendors.findOne({
            where:{
                id:vendedor,  
            },
        })
       const email= vend?.getDataValue("email")
    const events = await Event.findAll({
        where:{
            dia:fecha.toString(),
            vendedor:vendedor
        },
    })
      if(events.length!=0){
        const listid=[]
        const arrayemail=[]
        for (let i = 0; i < events.length; i++) {
            const element = events[i].getDataValue("cliente");
            listid.push(element)
        }
        const clientes = await Cliente.findAll({
            where: {
              id: {
                [Op.in]: listid,
              },
            },
          });

          for (let i = 0; i < clientes.length; i++) {
              const element={fecha:events[i].getDataValue("dia"),hora:events[i].getDataValue("hora"),clienteNom:clientes[i].getDataValue("nombre"),clienteApe:clientes[i].getDataValue("apellido"),tipo:events[i].getDataValue("tipo"),nota:events[i].getDataValue("nota")};
              arrayemail.push(element)
            }
            console.log(">>>>>>>>>>>>",arrayemail)
            enviarMail(email,arrayemail)
        }
    res.status(200).json(events)
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
        const { id, } = req.body
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


export async function  updateStateEvent(req: Request, res: Response) {
    
    try {
       const { id, } = req.body
        const { estado} = req.body
       const evento = await Event.findByPk(Number(id))
       if(estado!==null){
           evento?.setDataValue("estado",estado)
       }
       evento?.save()
      res.json({message: "estado actualizado", event: evento})
       
    } catch (error) {
      return res.status(500).json({message: error})
   }
 
}

