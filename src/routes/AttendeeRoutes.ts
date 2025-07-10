import express from 'express'
import { CreateAttendee, DeleteAttendee, GetAllAttendee, UpdateAttendee } from '../Controllers/AttendeesControllers'


export const Attendeerouter = express.Router()

Attendeerouter.post('/new', CreateAttendee)
Attendeerouter.get('/getAll', GetAllAttendee)
Attendeerouter.put('/update/:id', UpdateAttendee)
Attendeerouter.delete("/delete/:id", DeleteAttendee)