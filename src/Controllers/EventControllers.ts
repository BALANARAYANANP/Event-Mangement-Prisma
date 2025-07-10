
import {Request, Response} from 'express'
import { event, eventResponse } from '../dto/eventdto'
import { prisma } from '../prisma'
import {v4  as uuidV4} from 'uuid'
import {Role} from '../../generated/prisma'

export const CreateEvent = async (req:Request , res: Response): Promise<void> => {
    try{
        const data:event = req.body
        if(data){
            const newEvent = await prisma.event.create({data: {
                id : uuidV4(),
                title: data.title,
                description: data.description,
                VenueId : data.VenueId,
                date :data.date,
                

            }})

            res.status(201).json({"Event Created" : newEvent})

        }
        else{
            res.status(404).json({"Error" : "No Data Found"})
        }
    }catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}



export const GetAllEvent = async (req:Request , res: Response): Promise<void> => {
    try{
       
            const AllEvent:eventResponse = await prisma.event.findMany({include : {EventAddentee : true}})
            if(AllEvent)
            {
                res.status(200).json({"All Events" : AllEvent})}
            else{
                res.status(404).json({"Oops :" : "No Events Found"})
            }

        }
        
    catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}

export const UpdateEvent = async (req:Request, res: Response) : Promise<void> => {
    try{
        const data:event = req.body
        const id =   req.params.id

        if(data && id){
            const updatedEvent = await prisma.event.update({data: {
                title : data.title,
                description: data.description,
                date : data.date
            }, 
                where :{
                    id: id
                }
            })
            res.status(201).json({"Event Updated": updatedEvent})
        }
        


    }catch(err:any){
        res.status(400).json({Error: err.message})
    }
}


export const DeleteEvent = async (req:Request, res: Response) : Promise<void> => {
    try{
       

            const id = req.params.id
            if(id){
            const DeletedEvent = await prisma.event.delete({where : {id : id}})
            res.status(201).json({"Event Deleted" : DeletedEvent})
            }
        }
        catch(err:any){
        res.status(400).json({Error: err.message})
    }
}