import { Request , Response} from "express";
import { prisma } from "../prisma";

export const GetAllEventAttendeeCount = async (req:Request , res:Response): Promise<void> => {
    try{
       
            const AllEventAttendee = await prisma.eventAddentee.findMany()
            if(AllEventAttendee)
            {
                const eventCounts = await prisma.event.findMany({
                    select: {
                      id: true,
                      title: true,
                      _count: {
                        select: {
                          EventAddentee: true
                        }
                      }
                    }
                  });
                  
                  const formattedResponse = eventCounts.map(event => ({
                    title: event.title,
                    totalCount: event._count.EventAddentee
                  }));
                  
                  
                res.status(200).json({"All EventAttendeeCount" : formattedResponse})}
            else{
                res.status(404).json({"Oops :" : "No EventAttendeeCount Found"})
            }

        }
        
    catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}