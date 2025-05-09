import express from "express"
import userRoutes from "./routes/userRoutes.js"
import produtosRoutes from './routes/productRoutes.js'
const app = express()

// Permite que o Express entenda dados JSON no corpo da requisição
app.use(express.json())

// Rota de usuários
app.use("/users", userRoutes)
app.use("/produtos", produtosRoutes)

export default app