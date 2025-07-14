import express from 'express'
import { VerifyMember } from '../middleware/verifyMember'
import { GetAllEventAttendeeCount, popularVenue } from '../Controllers/AnalyticsController'
export const AnalytiscRoute = express.Router()




AnalytiscRoute.get('/Popular', VerifyMember, popularVenue)
AnalytiscRoute.get('/count', VerifyMember, GetAllEventAttendeeCount)