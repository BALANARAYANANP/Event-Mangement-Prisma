
import {Request, Response} from 'express'
import { event, eventResponse, LoginMember, Member } from '../dto/eventdto'
import { prisma } from '../prisma'
import {v4  as uuidV4} from 'uuid'
import {Role} from '../../generated/prisma'
import CRYPTOJS from 'crypto-js'
import jwt from 'jsonwebtoken'

export const CreateMember = async (req:Request , res: Response): Promise<void> => {
    try{
        const data:Member = req.body
        if(data){
            const hashedPassword = CRYPTOJS.SHA256(data.password).toString()
            const newMember = await prisma.member.create({data: {
                id : uuidV4(),
                Username : data.Username,
                password :  hashedPassword,
                role : data.role as Role
               

            }})

            res.status(201).json({"Member Created" : newMember})

        }
        else{
            res.status(404).json({"Error" : "No Data Found"})
        }
    }catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}



export const GetAllMemberss = async (req:Request , res: Response): Promise<void> => {
    try{
       
            const AllMembers = await prisma.member.findMany()
            if(AllMembers)
            {
                res.status(200).json({"All Members" : AllMembers})}
            else{
                res.status(404).json({"Oops :" : "No Members Found"})
            }

        }
        
    catch(err:any){
        res.status(400).json({"Error" : err.message})
    }
}

export const UpdateMember = async (req:Request, res: Response) : Promise<void> => {
    try{
        const data:Member = req.body
        const id =   req.params.id

        if(data && id){
            const hashedPassword = CRYPTOJS.SHA256(data.password).toString()
            const updatedMember = await prisma.member.update({data: {
                Username : data.Username,
                password : hashedPassword,
                role : data.role as Role
            }, 
                where :{
                    id: id
                }
            })
            res.status(201).json({"Member Updated": updatedMember})
        }
        


    }catch(err:any){
        res.status(400).json({Error: err.message})
    }
}


export const DeleteMember = async (req:Request, res: Response) : Promise<void> => {
    try{
       

            const id = req.params.id
            if(id){
            const DeletedMember= await prisma.member.delete({where : {id : id}})
            res.status(201).json({"Member Deleted" : DeletedMember})
            }
        }
        catch(err:any){
        res.status(400).json({Error: err.message})
    }
}


export const LoginMembers = async (req:Request, res: Response) : Promise<void> => {
    try{
        const data:LoginMember = req.body
        if(data.Username && data.password){
            const User = await prisma.member.findUnique({where : {
                Username : data.Username
            }})
            if(User){
                const hashedPassword = CRYPTOJS.SHA256(data.password).toString()
                // const SECRET_KEY = process.env
                if(hashedPassword === User.password){
                    const token = jwt.sign({password : User.password , role : User.role}, "Novastrid"  , {expiresIn : "1h"})
                    res.status(200).json({"Login Sucessfull "  :   token})}
                else {
                    res.status(401).json({Error : "Invalid Password"})
                }

            }
            else{
                res.status(404).json({Error : "No Member Found"})
            }
        }
        else{
            res.status(404).json({Error : "Give Username and Password Properly"})
        }
        
    }catch(err:any){
        res.status(400).json("Error" + err.message)
    }
}