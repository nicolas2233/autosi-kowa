import { Router } from "express";
import {getProject, createProject, deleteProject, updateProject, prueba} from './controller'
const router = Router()

  router.get('/projects',getProject),

  router.post('/projects', createProject),
  
  router.put('/projects/:id',updateProject),
  
  router.delete('/projects/:id', deleteProject),
  
  router.get('/projects/search',prueba)



export default router