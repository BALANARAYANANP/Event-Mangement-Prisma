import express from 'express'
import { CreateAttendee, DeleteAttendee, GetAllAttendee, UpdateAttendee } from '../Controllers/AttendeesControllers'
import { validate } from '../middleware/Attende'
import { Attendeeschema } from '../Schema/AttendeeScheam'



export const Attendeerouter = express.Router()

Attendeerouter.post('/new', validate(Attendeeschema) ,CreateAttendee)
Attendeerouter.get('/getAll', GetAllAttendee)
Attendeerouter.put('/update/:id', UpdateAttendee)
Attendeerouter.delete("/delete/:id", DeleteAttendee)