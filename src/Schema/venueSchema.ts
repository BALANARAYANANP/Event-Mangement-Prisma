import { z } from 'zod';

export const Venueschema = z.object({
  name: z.string().nonempty("Name is required"),
  address: z.string().nonempty("address is required"),
  capacity : z.number()
});
