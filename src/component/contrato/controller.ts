import {Request,Response} from 'express'
import { Cliente } from '../clientes/cliente/models'
import { Contrato } from './model'

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
        const vendedor = req.headers["user-id"]
        const events = await Contrato.findAll()
        res.status(200).send(events)
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


