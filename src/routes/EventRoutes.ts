import express from 'express'
import { CreateEvent, DeleteEvent, GetAllEvent, GetSingleEvent, UpdateEvent } from '../Controllers/EventControllers'
import { VerifyMember } from '../middleware/verifyMember'
import { validate } from '../middleware/Attende'
import { Eventschema } from '../Schema/EventSchema'

export const router = express.Router()

router.post('/new', VerifyMember, validate(Eventschema) ,   CreateEvent)
router.get('/getAll', GetAllEvent)
router.get('/single/:id', GetSingleEvent)
router.put('/update/:id',VerifyMember,  UpdateEvent)
router.delete("/delete/:id", VerifyMember, DeleteEvent)