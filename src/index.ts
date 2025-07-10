import express from 'express'
import { router } from './routes/EventRoutes'
import { Attendeerouter } from './routes/AttendeeRoutes'
import { Venuerouter } from './routes/venueRouter'
import { EventAttendeeRoute } from './routes/EventAttendeeRoute'
import { MemberRoute } from './routes/memberRoutes'

const app = express()

app.use(express.json())
app.use('/event', router)
app.use('/Attendee', Attendeerouter)
app.use('/venue', Venuerouter)
app.use('/EventAttendee', EventAttendeeRoute)
app.use('/member', MemberRoute)


app.listen(3000, ()=>{
    console.log("Server is Running Port No: 3000")
})