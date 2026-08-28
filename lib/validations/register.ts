import z from "zod";

export const createRegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(50, "Email must be less than 50 characters")
    .email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters"),
});
