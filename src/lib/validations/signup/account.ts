// STEP 1 – account info
import { z } from "zod";

export const account = z
  .object({
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(8, "Phone number is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
