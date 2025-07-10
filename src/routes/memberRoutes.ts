import express, { Router } from 'express'
import { CreateMember, DeleteMember, GetAllMemberss, LoginMembers, UpdateMember } from '../Controllers/MemberController'



export const MemberRoute =express.Router()

MemberRoute.post('/new', CreateMember)
MemberRoute.post('/login', LoginMembers)
MemberRoute.get('/get', GetAllMemberss)
MemberRoute.put('/update/:id', UpdateMember)
MemberRoute.delete('/delete/:id', DeleteMember)

