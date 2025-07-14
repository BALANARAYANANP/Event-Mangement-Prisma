import express from 'express'
import { CreateEventAttendee, DeleteEventAttendee, GetAllEventAttendee, UpdateEventAttendee } from '../Controllers/EventAttendeeControllers'
import { GetAllEventAttendeeCount } from '../Controllers/AnalyticsController'
import { VerifyMember } from '../middleware/verifyMember'

export const EventAttendeeRoute = express.Router()

EventAttendeeRoute.post('/new', CreateEventAttendee)

EventAttendeeRoute.get('/getAll', GetAllEventAttendee)

EventAttendeeRoute.put('/update/:id', UpdateEventAttendee)
EventAttendeeRoute.delete('/delete/:id', DeleteEventAttendee)
