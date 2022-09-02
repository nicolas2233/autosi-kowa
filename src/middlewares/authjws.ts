import {NextFunction, Request,Response} from 'express'
export const verifyToken = async (req:Request,res:Response,next:NextFunction)=>{
   const token = req.headers["x-access-token"]

   if(!token){return res.status(403).json({Message:"no token provider"})}
   next()
}