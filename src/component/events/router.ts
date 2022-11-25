import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";
import {getEvent, createEvent,getEventTime, canceledEvent, deletedEvent, updateEvent} from './controller'
const router = Router()

  router.get('/events',[verifyToken],getEvent),

  router.post('/events',[verifyToken], createEvent),
  
  router.get('/events/eventTime',[verifyToken],getEventTime),
  
   router.put('/events/1',[verifyToken], canceledEvent),
  
   router.delete('/events', deletedEvent),
   router.put('/events', updateEvent)



export default router