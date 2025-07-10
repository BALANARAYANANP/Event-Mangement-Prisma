
import {Request, Response} from 'express'
import { Attendee} from '../dto/eventdto'
import { prisma } from '../prisma'
import {v4  as uuidV4} from 'uuid'


export const CreateAttendee = async (req:Request , res: Response): Promise<void> => {
    try{
        const data:Attendee = req.body
        if(data){
            const newAttendee = await prisma.attendee.create({data: {
                id : uuidV4(),
                name : data.name,
                email : data.email

            }})

            res.status(201).json({"Attendee Created" : newAttendee})

        }
        else{
            res.status(404).json({"Error" : "No Data Found"})
        }
    }catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}



export const GetAllAttendee = async (req:Request , res: Response): Promise<void> => {
    try{
       
            const AllAttendee = await prisma.attendee.findMany({include : {EventAddentee : true}})
            if(AllAttendee)
            {
                res.status(200).json({"All Attendee" : AllAttendee})}
            else{
                res.status(404).json({"Oops :" : "No Attendee Found"})
            }

        }
        
    catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}

export const UpdateAttendee = async (req:Request, res: Response) : Promise<void> => {
    try{
        const data:Attendee = req.body
        const id =   req.params.id

        if(data && id){
            const updatedAttendee = await prisma.attendee.update({data: {
                name : data.name,
                email: data.email
                
            }, 
                where :{
                    id: id
                }
            })
            res.status(201).json({"Event Updated": updatedAttendee})
        }
        


    }catch(err:any){
        res.status(400).json({Error: err.message})
    }
}


export const DeleteAttendee = async (req:Request, res: Response) : Promise<void> => {
    try{
       

            const id = req.params.id
            if(id){
            const DeletedAttendee = await prisma.attendee.delete({where : {id : id}})
            res.status(201).json({"Attendee Deleted" : DeletedAttendee})
            }
        }
        catch(err:any){
        res.status(400).json({Error: err.message})
    }
}