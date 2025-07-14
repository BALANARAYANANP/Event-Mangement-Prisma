import express from 'express'
import { ExportattendeeCsv } from '../Controllers/csvController'

export const CsvRoute = express.Router()


CsvRoute.get('/get', ExportattendeeCsv)