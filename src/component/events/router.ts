import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";
import {getEvent, createEvent,getEventTime} from './controller'
const router = Router()

  router.get('/events',[verifyToken],getEvent),

  router.post('/events',[verifyToken], createEvent),
  
  router.get('/events/eventTime',[verifyToken],getEventTime)
  
//   router.delete('/projects/:id', deleteProject),
  
//   router.get('/projects/:id')



export default router