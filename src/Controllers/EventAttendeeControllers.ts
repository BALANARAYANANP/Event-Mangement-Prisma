
import {Request, Response} from 'express'
import { event, EventAttendee, eventResponse } from '../dto/eventdto'
import { prisma } from '../prisma'
import {v4  as uuidV4} from 'uuid'
import {Role} from '../../generated/prisma'

export const CreateEventAttendee = async (req:Request , res: Response): Promise<void> => {
    try{
        const data:EventAttendee  = req.body
        if(data){
            const newEventAttendee = await prisma.eventAddentee.create({data: {
                id : uuidV4(),
                eventId : data.eventId,
                attenteeId : data.attendeeId
                

            }})

            res.status(201).json({"Event Attendee Created" : newEventAttendee})

        }
        else{
            res.status(404).json({"Error" : "No Data Found"})
        }
    }catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}



export const GetAllEventAttendee = async (req:Request , res: Response): Promise<void> => {
    try{
       
            const AllEventAttendee = await prisma.eventAddentee.findMany()
            if(AllEventAttendee)
            {
                
                res.status(200).json({"All EventAttendee" : AllEventAttendee})}
            else{
                res.status(404).json({"Oops :" : "No EventAttendee Found"})
            }

        }
        
    catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}

export const UpdateEventAttendee = async (req:Request, res: Response) : Promise<void> => {
    try{
        const data:EventAttendee = req.body
        const id =   req.params.id

        if(data && id){
            const updatedEventAttendee = await prisma.eventAddentee.update({data: {
                eventId : data.eventId,
                attenteeId : data.attendeeId
            }, 
                where :{
                    id: id
                }
            })
            res.status(201).json({"EventAttendee Updated": updatedEventAttendee})
        }
        


    }catch(err:any){
        res.status(400).json({Error: err.message})
    }
}


export const DeleteEventAttendee = async (req:Request, res: Response) : Promise<void> => {
    try{
       

            const id = req.params.id
            if(id){
            const DeletedEventAttendee = await prisma.eventAddentee.delete({where : {id : id}})
            res.status(201).json({"EventAttendee Deleted" : DeletedEventAttendee})
            }
        }
        catch(err:any){
        res.status(400).json({Error: err.message})
    }
}