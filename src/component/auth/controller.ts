import { Request, Response } from 'express'
import { Vendors } from '../vendors/models'
import { Role } from '../roles/models'
import bcrypt from 'bcryptjs'
import secret from '../../config'
import jwt from "jsonwebtoken";
import {format,isDate} from 'date-fns'

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body

  const newVendors = await Vendors.findOne({ where: { email: email } })

  if (newVendors === null) { return res.status(400).json({ Message: "user not found" }) }

  const realPass = newVendors.getDataValue("password")
  
  
  const matchPass = await passcompared(password, realPass)

  if (!matchPass) { return res.status(401).json({ Message: "invalid password", Token: "null" }) }

  const token = jwt.sign({ id: newVendors.getDataValue("id") }, secret.SECRET, {
    expiresIn: "3h"

  })
  res.status(200).json({ vendors: newVendors, token: token })


}

export async function signup(req: Request, res: Response) {
  const { name, lastname, password, email, dni, phone, category } = req.body
  let catrol = category
  const rol = await Role.findOne({ where: { name: catrol } });
  if (rol === null) {
    catrol = null
  } else {
    catrol = rol.getDataValue("id");
  }
  const mail=await Vendors.findOne({
    where:{
      email:email
    }
  })
  if(mail!==null){
   return res.json({ message: "el vendedor ya existe" })
  }
  const newVendors = await Vendors.create({
    name,
    lastname,
    password: await passencrypting(password),
    email,
    dni,
    phone,
    category: catrol
  })
  // const token = jwt.sign({ id: newVendors.getDataValue("id") }, secret.SECRET, {
  //   expiresIn: "3h"
  // })
 return  res.json({ vendors: newVendors})
}

const passencrypting = async (pass: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(pass, salt)
}

const passcompared = async (pass: string, entrypass: string) => {
  return await bcrypt.compare(pass, entrypass)
}
