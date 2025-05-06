import {z} from "zod"

export const createUserSchema = z.object({
    nome: z.string().min(3,"nome deve ter  pelo menos 3 chars"),
    email: z.string().email("email Ivalido"),
    password: z.string().min(6,"senha dev  ter menos 6 chars").regex(/[A-Z]/,  "A senha deve ter pelo menos uma letra maisucula")
    
})

export const updateUserSchema = z.object({
    nome: z.string().min(3,"nome deve ter  pelo menos 3 chars").optional(),
    email: z.string().email("email Ivalido").optional(),
    password: z.string().min(6,"senha dev  ter menos 6 chars").regex(/[A-Z]/,  "A senha deve ter pelo menos uma letra maisucula").optional()
    
})
