import { NextFunction, request, Request, Response } from 'express';
import secret from '../config';
import jwt from "jsonwebtoken";
import { Vendors } from '../component/vendors/models';
import { Role } from '../component/roles/models';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["x-access-token"]
        const token2 = token?.toString()
        if (!token2) { return res.status(403).json({ Message: "no token provider" }) }

        const decode = await jwt.verify(token2, secret.SECRET)

        const decodeS = JSON.stringify(decode.valueOf())
        const decodeObject = JSON.parse(decodeS)
        req.headers["user-id"] = decodeObject.id
        next()
    } catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" })
    }
}
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.headers["user-id"]?.toString()

        const user = await Vendors.findByPk(id)
        const role = await Role.findByPk(user?.getDataValue("category"))

        if (role?.getDataValue("name") == "admin") {
            next()
        } else {
            return res.status(403).json({ messenger: "Require admin role" })
        }

    } catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" })
    }
}
export const isGerente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.headers["user-id"]?.toString()

        const user = await Vendors.findByPk(id)
        const role = await Role.findByPk(user?.getDataValue("category"))

        if (role?.getDataValue("name") === "gerente") {
            next()
        } else {
            return res.status(403).json({ messenger: "Require gerente role" })
        }

    } catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" })
    }
}
export const isSupervisor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.headers["user-id"]?.toString()

        const user = await Vendors.findByPk(id)
        const role = await Role.findByPk(user?.getDataValue("category"))

        if (role?.getDataValue("name") == "supervisor") {
            next()
        } else {
            return res.status(403).json({ messenger: "Require supervisor role" })
        }

    } catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" })
    }
}
export const isSr = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.headers["user-id"]?.toString()
        const user = await Vendors.findByPk(id)
        const role = await Role.findByPk(user?.getDataValue("category"))
        if (role?.getDataValue("name") == "sr") {
            next()
        } else {
            return res.status(403).json({ messenger: "Require sr role" })
        }
    } catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" })
    }
}
export const isJr = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.headers["user-id"]?.toString()
        const user = await Vendors.findByPk(id)
        const role = await Role.findByPk(user?.getDataValue("category"))
        if (role?.getDataValue("name") == "jr") {
            next()
        } else {
            return res.status(403).json({ messenger: "Require jr role" })
        }
    } catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" })
    }
}