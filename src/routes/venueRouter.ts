import express from 'express'

import { CreateVenue, DeleteVenue, GetAllVenue, UpdateVenue } from '../Controllers/VenueControllers'
import { VerifyMember } from '../middleware/verifyMember'
import { validate } from '../middleware/Attende'
import { Venueschema } from '../Schema/venueSchema'

export const Venuerouter = express.Router()

Venuerouter.post('/new',VerifyMember,validate(Venueschema), CreateVenue)
Venuerouter.get('/getAll', GetAllVenue)
Venuerouter.put('/update/:id',VerifyMember,  UpdateVenue)
Venuerouter.delete("/delete/:id",VerifyMember,  DeleteVenue)