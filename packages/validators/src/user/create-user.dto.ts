import { z } from "zod";

export const createUserDtoSchema = z.object({
  email: z.string().email().min(1).max(150),
  password: z.string().min(8).max(100),
});

export type CreateUserDTO = z.infer<typeof createUserDtoSchema>;
