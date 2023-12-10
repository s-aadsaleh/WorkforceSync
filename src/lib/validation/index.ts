import * as z from "zod"

export const SignupValidation = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email({message: 'Please use a proper e-mail'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'})
  })