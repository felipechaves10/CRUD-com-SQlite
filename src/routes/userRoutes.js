import express from "express"
import { getAllUsers, postCreateUsers, deleteUsers, updateUser, usuarioId } from "../controllers/userController.js"
const router = express.Router()

router.get("/", getAllUsers)

router.post('/', postCreateUsers)

router.put("/:id", updateUser)

router.delete('/:id', deleteUsers)
export default router 

router.get("/:id", usuarioId)

