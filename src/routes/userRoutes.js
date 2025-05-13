import express from "express"
import { getAllUsers, postCreateUsers, deleteUsers, updateUser, usuarioId, login, registerUser } from "../controllers/userController.js"
import { validete } from "../middleware/validate.js"
import { createUserSchema, loginSchema, updateUserSchema } from "../schemas/userSchemas.js"
import { authenticate } from "../middleware/authentication.js"

const router = express.Router()

router.get("/", getAllUsers)

router.post('/', validete(createUserSchema), postCreateUsers)

router.put("/:id", authenticate, validete(updateUserSchema), updateUser)

router.delete('/:id', deleteUsers)

router.get("/:id", usuarioId)

router.post("/registro", registerUser)

router.post("/login",validete(loginSchema), login)



export default router 
