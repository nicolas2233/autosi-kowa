import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";
import {getEvent, createEvent,getEventTime, deleteEvent, updateEvent} from './controller'
const router = Router()

  router.get('/events',[verifyToken],getEvent),

  router.post('/events',[verifyToken], createEvent),
  
  router.get('/events/eventTime',[verifyToken],getEventTime)
  
   router.delete('/events', deleteEvent),
  
   router.put('/events', updateEvent)



export default router