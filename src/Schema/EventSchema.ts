import { z } from 'zod';

export const Eventschema = z.object({
  title: z.string().nonempty("Title is Required"),
  description: z.string().nonempty("description is required"),
 
    date: z.string()
      .refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
      })
      .transform(val => new Date(val)),

  
   VenueId : z.string()
});
