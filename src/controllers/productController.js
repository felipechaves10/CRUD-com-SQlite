import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const criarProduto = async (req,res) => {
    const {nome, description, price, stock} = req.body

    try {
        const novoProduto = await prisma.product.create({
            data: {
                nome,
                description,
                price,
                stock
            }
        })
        res.status(200).json(novoProduto)
    } catch (error) {
        res.status(500).json({message: `error ao criarProduto: ${error.message}`})
    }
}
    


    export const getAllProduct = async (req, res) => {
        try {
            const product = await prisma.product.findMany()
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({mensagem: `Erro ao listar produtos:  ${error.message}`})
        }
    }
    
    export const getIdProduct = async (req, res) => {
        const { id } = req.params
    
        try {
            const idProduct = await prisma.product.findUnique({
                where: {id: Number(id)}
            })
            res.status(200).json(idProduct)
        } catch (error) {
            res.status(500).json({mensagem: `Erro ao listar produtos por id:  ${error.message}`})
        }
    }
    
    export const updateProduct = async (req, res) => {
        const { id } = req.params
        const { name, description, price, stock} = req.body
    
        try {
            const updateProduct = await prisma.product.update({
                where: {id: Number(id)},
                data: {
                    name,
                    description,
                    price,
                    stock
                }
            })
            res.status(200).json(updateProduct)
        } catch (error) {
            res.status(400).json({mensagem: `Erro ao atualizar: ${error.message}`})
        }
    }
    
    export const deleteProduct = async (req, res) => {
        const { id } = req.params
    
        try {
            const deleteProduct = await prisma.product.delete({
                where: {id: Number(id)}
            })
            res.status(204).json(deleteProduct)
        } catch (error){
            res.status(400).json(`Erro em deletar: ${error.message}`)  
            }
        }