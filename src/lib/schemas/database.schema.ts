import { z } from "zod";

export const accountSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const userSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "Maximum 50 characters"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Maximum 50 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .max(50, "Maximum 50 characters"),
  address: z
    .string()
    .max(255, "Maximum 255 characters")
    .nullable(),
  city: z
    .string()
    .max(50, "Maximum 50 characters")
    .nullable(),
  country: z
    .string()
    .max(50, "Maximum 50 characters")
    .nullable(),
  birthdate: z.date().nullable(),
});

export const itemSchema = z.object({
  quantity: z.number().default(0),
  product_id: z.number(),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Maximum 255 characters"),
  description: z
    .string()
    .max(255, "Maximum 255 characters")
    .nullable(),
  price: z
    .string()
    .default("0")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN && val > 0),
});

export type AccountSchema = z.infer<typeof accountSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type ItemSchema = z.infer<typeof itemSchema>;
export type ProductSchema = z.infer<typeof productSchema>;
