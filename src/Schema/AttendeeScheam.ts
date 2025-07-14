import { z } from 'zod';

export const Attendeeschema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email format"),
});
