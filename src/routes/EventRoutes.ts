import express from 'express'
import { CreateEvent, DeleteEvent, GetAllEvent, UpdateEvent } from '../Controllers/EventControllers'
import { VerifyMember } from '../middleware/verifyMember'

export const router = express.Router()

router.post('/new', VerifyMember,  CreateEvent)
router.get('/getAll', GetAllEvent)
router.put('/update/:id',VerifyMember,  UpdateEvent)
router.delete("/delete/:id", VerifyMember, DeleteEvent)