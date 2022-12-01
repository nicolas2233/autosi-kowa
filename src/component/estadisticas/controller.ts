import {Request,Response} from 'express'
import { Where } from 'sequelize/types/utils'
import { Project } from './models'

    export async function getProject(req: Request, res: Response) {
    const projects = await Project.findAll()
     res.status(200).send(projects)
}

export async function  createProject(req: Request, res: Response) {
    
    try {
          const {name, priority, description} = req.body
    const newproject = await Project.create({
        name,
        description,
        priority
      })
        res.json(newproject)
    } catch (error) {
       return res.status(500).json({message: error})
    }
  
}

export async function  deleteProject(req: Request, res: Response) {
    
    try {
        const {id}=req.params
         
    const newproject = await Project.findByPk(id)
      newproject?.destroy()
      res.send(newproject)
    } catch (error) {
       return res.status(500).json({message: error})
    }
  
}

export async function  updateProject(req: Request, res: Response) {
    
    try {
        const {id}=req.params
        const {name, priority, description} = req.body
          const newproject = await Project.findByPk(id)
          newproject?.setDataValue("name", name)
          newproject?.setDataValue("priority", priority)
          newproject?.setDataValue("description", description)
          newproject?.save()
          console.log(newproject)
          res.json(newproject)
    } catch (error) {
       return res.status(500).json({message: error})
    }
  
}

export async function  prueba(req: Request, res: Response) {
    
    try {
        const {id}=req.params
          const newproject = await Project.findAll({
            where:{
                priority:3
            }
          })
          console.log(newproject.length)
          res.json(newproject)
        
    } catch (error) {
       return res.status(500).json({message: error})
    }
  
}
