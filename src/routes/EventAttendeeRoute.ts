import express from 'express'
import { CreateEventAttendee, DeleteEventAttendee, GetAllEventAttendee, UpdateEventAttendee } from '../Controllers/EventAttendeeControllers'
import { GetAllEventAttendeeCount } from '../Controllers/dashboradController'

export const EventAttendeeRoute = express.Router()

EventAttendeeRoute.post('/new', CreateEventAttendee)
EventAttendeeRoute.get('/count', GetAllEventAttendeeCount)
EventAttendeeRoute.get('/getAll', GetAllEventAttendee)

EventAttendeeRoute.put('/update/:id', UpdateEventAttendee)
EventAttendeeRoute.delete('/delete/:id', DeleteEventAttendee)
