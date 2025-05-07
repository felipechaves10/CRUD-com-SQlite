import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const criarProduto = async (req,res) => {
    const {name, description, price, stock, createdAt} = req.body

    try {
        const novoProduto = await prisma.product.create({
            data: {
                name,
                description,
                price,
                stock,
                createdAt
            }
        })
        res.status(200).json(novoProduto)
    } catch (error) {
        res.status(500).json({message: `error ao criarProduto: ${error.message}`})
    }
}