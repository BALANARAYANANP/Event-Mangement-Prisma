import fs from 'fs'
import path from 'path'
import {format} from 'fast-csv'
import { Request, Response } from 'express'
import { prisma } from '../prisma'

export const ExportattendeeCsv = async (req:Request, res: Response):Promise<void> => {
    try{
        const attendees = await prisma.attendee.findMany()

        const filePath = path.join(__dirname, '../exports', "Attendes.csv")


        if(!fs.existsSync(path.dirname(filePath))){
            fs.mkdirSync(path.dirname(filePath), {recursive: true})
        }

        const ws = fs.createWriteStream(filePath)
        const csvStream = format({ headers: true})

        csvStream.pipe(ws)

        attendees.forEach((attendee)=> {
            const {id, name , email} = attendee
            csvStream.write({id, name, email})
        })
        csvStream.end();

        res.status(200).json({ message: `CSV File Created Successfully at ${filePath}` });
        
    }catch (error) {
        console.error('CSV Export Failed:', error);
        res.status(500).json({ message: 'CSV Export Failed' });
      }
}