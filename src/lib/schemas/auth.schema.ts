import { z } from "zod";
import { accountSchema, userSchema } from "./database.schema";

export const loginSchema = z.object({
  username: accountSchema.shape.username,
  password: accountSchema.shape.password,
});

export const registerSchema = z.object({
  username: accountSchema.shape.username,
  password: accountSchema.shape.password,
  user: userSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
