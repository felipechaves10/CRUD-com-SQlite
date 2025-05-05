import {z} from "zod"

const createUserSchema = z. object({
    name: z. string().min(3),
    email: z. string().email(),
    password: z. string().min(6).regex(/[A-ZA-Z]/)
})
