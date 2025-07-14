import { Request, Response, NextFunction } from 'express';
import { ZodSchema , ZodError, z} from 'zod';

export const validate =
  (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction):void => {
        try {
            const result = schema.safeParse(req.body);
      if(!result.success){
          res.status(400).json({error: z.prettifyError(result.error) })
          return 
      }
          next();
    } catch (err: any) {
        if(err instanceof ZodError){
       res.status(400).json({
        message: err.message,
      
      });}
    }
  };