import { Router } from "express";
import { verifyToken } from "../../middlewares/verifysingup";
import {updateStateEvent,getEvent, createEvent,getEventTime, canceledEvent, getAllEvent, deletedEvent, updateEvent} from './controller'
const router = Router()

  router.get('/events',[verifyToken],getEvent),

  router.post('/events',[verifyToken], createEvent),
  
  router.get('/events/eventTime',[verifyToken],getEventTime),
  
   router.put('/events/canceled',[verifyToken], canceledEvent),
  
   router.delete('/events',[verifyToken], deletedEvent),

   router.put('/events', updateEvent),

   router.get('/events/all',[verifyToken],getAllEvent)
   
   router.post('/events/state',updateStateEvent)




export default router