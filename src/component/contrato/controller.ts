import {Request,Response} from 'express'
import { Cliente } from '../clientes/cliente/models'
import { Contrato } from './model'

export async function getContrato(req: Request, res: Response) {
    try {
        const vendedor = req.body
        const events = await Contrato.findAll({
            where:{
                vendedor:vendedor
            }
        })
        res.status(200).send(events)
    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }
}

export async function createContrato(req: Request, res: Response) {
    try {
        const {numero, dia, pago, suscripcion, sellado,otorgado,adeudado,cliente} = req.body
        const vendedor = req.body
       
       
            const newContrato = await Contrato.create({
                dia,
                numero,
                pago,
                suscripcion,
                cliente,
                vendedor: vendedor,
                sellado,
                otorgado,
                adeudado
            })
            return res.json({ message: "contrato creado satisfactoriamente", newContrato: newContrato })

    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }

}


