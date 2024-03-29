import {Request,Response} from 'express'
import { Model } from 'sequelize/types'
import { Cliente } from '../clientes/cliente/models'
import { Vendors } from '../vendors/models'
import { Contrato } from './model'
import { Pago } from '../cobranza/model'
export async function getContrato(req: Request, res: Response) {
    try {
        const vendedor = req.headers["user-id"]
        const events = await Contrato.findAll({
            where: {
                vendedor: vendedor?.toString()
            }
        })
        res.status(200).send(events)
    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }
}
export async function getAllContrato(req: Request, res: Response) {
    try {
        const gerente=req.headers["user-id"]
        const a = await Vendors.findByPk(Number(gerente))
        if(Number(a?.getDataValue("category"))===5){
            const contrato = await Contrato.findAll()
          return res.status(200).send(contrato)
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
   
    const contrato = await Contrato.findAll()
   var beta: Model<any, any>[] =[]
        for (let i = 0; i < contrato.length; i++) {
          let e = zeta.indexOf(Number(contrato[i].getDataValue("vendedor")))
          if(e!=-1){
            beta.push(contrato[i])
        }
        }
        return res.status(200).send(beta)
    }
    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }
}
export async function createContrato(req: Request, res: Response) {
    try {
        const {numeroContrato, dia, metodopago, suscripcion, sellado,otorgado,adeudado,cliente} = req.body
        const vendedor = req.headers["user-id"]
       
       
            const newContrato = await Contrato.create({
                dia,
                numeroContrato,
                metodopago,
                suscripcion,
                cliente,
                vendedor: vendedor?.toString(),
                sellado,
                otorgado,
                adeudado
            })
            return res.json({ message: "contrato creado satisfactoriamente", newContrato: newContrato })

    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }

}
export async function modificarContratro(req: Request, res: Response){
    const{ dia, numeroContrato, pago, metodopago } = req.body
    const vendedor = req.headers["user-id"]


    const contrato = await Contrato.findOne({
        where:{
            numeroContrato
        }
    })
    const saldo=contrato?.getDataValue('adeudado')
    const nuevoSaldo=Number(saldo)-Number(pago)
    contrato?.setDataValue('adeudado',nuevoSaldo)
    contrato?.save()
    const newPago = await Pago.create({
        dia,
        numeroContrato,
        metodopago,
        vendedor: vendedor?.toString(),
        pago
    })
    return res.json({ message: "contrato creado satisfactoriamente", newContrato: newPago })
}
export async function getPagos(req: Request, res: Response) {
    try {
        const vendedor = req.headers["user-id"]
        const events = await Pago.findAll({
            where: {
                vendedor: vendedor?.toString()
            }
        })
        res.status(200).send(events)
    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }
}


