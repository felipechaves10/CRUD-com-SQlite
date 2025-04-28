import express from "express"
import userRoutes from "./routes/userRoutes.js"
const app = express()

// Permite que o Express entenda dados JSON no corpo da requisição
app.use(express.json())

// Rota de usuários
app.use("/users", userRoutes)

export default app