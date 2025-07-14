import {z} from 'zod'

export const memberSchema  = z.object({
    name: z.string().nonempty("Name is Required"), 
    password: z.string("String is Required ").nonempty("Password is Required"),
    role: z.string()
})