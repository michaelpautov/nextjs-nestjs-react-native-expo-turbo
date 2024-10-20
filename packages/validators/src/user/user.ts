import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { usersTable } from "@app/db";

const fullUserSchema = createSelectSchema(usersTable);

export const userSchema = fullUserSchema.omit({ passwordHash: true });
export type UserRow = z.infer<typeof userSchema>;
