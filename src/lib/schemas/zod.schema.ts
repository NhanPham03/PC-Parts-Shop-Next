import { z } from "zod";

const minError = "This field must not be empty";

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const userSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  confirm_password: z
    .string()
    .min(1, "This field must not be empty"),
  first_name: z
    .string()
    .min(1, minError)
    .max(50, "Maximum 50 characters"),
  last_name: z
    .string()
    .min(1, minError)
    .max(50, "Maximum 50 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, minError)
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
  birthdate: z
    .string()
    .nullable(),
});

export const registerSchema = userSchema.omit({ confirm_password: true });

export const cartItemSchema = z.object({
  quantity: z
    .number()
    .default(0),
  price: z
    .string()
    .default("0")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0),
  cart_id: z
    .number(),
  product_id: z
    .number(),
});

const productTypes = z.enum(["CPU", "GPU", "RAM", "PSU", "Storage", "Motherboard", "Case", "Other"]);

export const productSchema = z.object({
  name: z
    .string()
    .min(1, minError)
    .max(255, "Maximum 255 characters"),
  price: z
    .string()
    .default("0")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0),
  type: productTypes,
  description: z
    .string()
    .max(255, "Maximum 255 characters")
    .nullable(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type ItemSchema = z.infer<typeof cartItemSchema>;
export type ProductSchema = z.infer<typeof productSchema>;
