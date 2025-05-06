import express from "express"
import { getAllUsers, postCreateUsers, deleteUsers, updateUser, usuarioId } from "../controllers/userController.js"
import { validete } from "../middleware/validate.js"
import { createUserSchema, updateUserSchema } from "../schemas/userSchemas.js"

const router = express.Router()

router.get("/", getAllUsers)

router.post('/', validete(createUserSchema), postCreateUsers)

router.put("/:id",validete(updateUserSchema), updateUser)

router.delete('/:id', deleteUsers)

router.get("/:id", usuarioId)

export default router 
