import express from "express"
import { criarProduto } from "../controllers/productController.js"

const router = express.Router()

router.post("/", criarProduto)











export default router