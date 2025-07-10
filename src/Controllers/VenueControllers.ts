
import {Request, Response} from 'express'
import {  Venue } from '../dto/eventdto'
import { prisma } from '../prisma'
import {v4  as uuidV4} from 'uuid'


export const CreateVenue = async (req:Request , res: Response): Promise<void> => {
    try{
        const data:Venue = req.body
        if(data){
            const newVenue = await prisma.venue.create({data: {
              name : data.name,
              address: data.address,
              capacity : data.capacity  

            }})

            res.status(201).json({"Venue Created" : newVenue})

        }
        else{
            res.status(404).json({"Error" : "No Data Found"})
        }
    }catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}



export const GetAllVenue = async (req:Request , res: Response): Promise<void> => {
    try{
       
            const AllVenues = await prisma.venue.findMany()
            if(AllVenues)
            {
                res.status(200).json({"All Venues" : AllVenues})}
            else{
                res.status(404).json({"Oops :" : "No Venues Found"})
            }

        }
        
    catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}

export const UpdateVenue = async (req:Request, res: Response) : Promise<void> => {
    try{
        const data:Venue = req.body
        const id =   req.params.id

        if(data && id){
            const updatedVenue = await prisma.venue.update({data: {
               name: data.name,
               address : data.address,
               capacity: data.capacity
            }, 
                where :{
                    id: id
                }
            })
            res.status(201).json({"Venue Updated": updatedVenue})
        }
        


    }catch(err:any){
        res.status(400).json({Error: err.message})
    }
}


export const DeleteVenue = async (req:Request, res: Response) : Promise<void> => {
    try{
       

            const id = req.params.id
            if(id){
            const DeletedVenue = await prisma.venue.delete({where : {id : id}})
            res.status(201).json({"Venue Deleted" : DeletedVenue})
            }
        }
        catch(err:any){
        res.status(400).json({Error: err.message})
    }
}