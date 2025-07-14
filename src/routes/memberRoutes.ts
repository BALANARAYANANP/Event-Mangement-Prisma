import express, { Router } from 'express'
import { CreateMember, DeleteMember, GetAllMemberss, LoginMembers, UpdateMember } from '../Controllers/MemberController'
import { popularVenue } from '../Controllers/AnalyticsController'
import { validate } from '../middleware/Attende'
import { memberSchema } from '../Schema/Memberschema'



export const MemberRoute =express.Router()

MemberRoute.post('/new',validate(memberSchema), CreateMember)
MemberRoute.post('/login', LoginMembers)

MemberRoute.get('/get', GetAllMemberss)
MemberRoute.put('/update/:id', UpdateMember)
MemberRoute.delete('/delete/:id', DeleteMember)

