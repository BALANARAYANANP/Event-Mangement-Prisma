import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface JwtPayload {
    password : string
    role : string
}



export const VerifyMember = (req:Request, res:Response, next: NextFunction) => {
    try{
        const authHeaders = req.headers?.authorization
        if(!authHeaders){
            res.status(404).json({Error : "No Token Found"})
            return
        }
        const token = authHeaders.split(' ')[1]
        if(!token){
            res.status(401).json({Error: "Token is Invalid Format"})
            return
        }
        else{
            const decoded = jwt.verify(token , "Novastrid") as JwtPayload
            if(decoded.role !== "ADMIN"){
                res.status(401).json({"Illegal Entry " : "Only Admin can acces this route"})
                 return
            }
                
            else{
                next()
               
            }
        }



    }catch(err:any){
        res.status(400).json({Error: err.message})
    }
}