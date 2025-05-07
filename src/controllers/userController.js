import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'
import { hashPassword, generate } from '../utils/auth.js'

export const getAllUsers = async (req, res) =>{
    const users  = await prisma.user.findMany()
    res.status(200).json(users)
}

// export const postCreateUsers = (req,res) => {
//     const {nome, email} = req.body

//     const newUsers = {
//         nome,
//         email
//     }

//     res.status(201).json(newUsers)
// }

export const postCreateUsers = async (req,res) => {
    const {nome, email, password} = req.body
   try {
    const newUsers =  await prisma.user.create({
        data: {nome, email, password} 
    })

    res.status(201).json(newUsers)
   } catch (error) {
        res.status(500).json({mensagem: `Error ao criar o novo usuario`,
            error: error.message
        })
   }
    
}
export const updateUser = async (req,res) => {
 const id = req.params.id
 const  {nome, email, password} = req.body
 try{
    const updateUser =await prisma.user.update({
        where: {id: parseInt(id)},
        data: {nome, email,password}
    })
    res.status(200).json(updateUser)

 } catch (error) {
    res.status(400).json({
        mensagem:"erro ao atualizar usuario",
        erro: error.mensage
    })
 }

}
export const deleteUsers = async (req,res) => {
    const id  = req.params.id
    try {
        const deleteUser = await prisma.user.delete({
    
            where: {id: Number(id)}
        })
        res.status(204).send()
    } catch (error) {
        res.status(400).json({mensagem: `Error ao delete usuario`,
            error: error.message
        })
    }
}

export const usuarioId = async (req,res) => {
    const  {id} = req.params

    try {
        const userId = await prisma.user.findUnique({
            where: {id: Number(id)}
        })
        res.status(200).json(userId)
    } catch (error) {
        res.status(400).json({mensagem: `erro ao ver usuario por id: ${error.mensage}`})
    }
}


export const registerUser = async (req,res) =>{
    const {nome, email, password} = req.body

    try {
        //criar a senha do  usuario hasheada
        const hashedPassword = await hashPassword(password)
         //criar usuario no banco de dados
        const newRegisteredUser = await prisma.user.create({
            data: {
                nome,
                email,
                password: hashedPassword
            }
        })

        const token = generate(newRegisteredUser)
        res.status(201).json({
            nome: newRegisteredUser.nome,
            email: newRegisteredUser.email,
            token: token
        })
    } catch (error) {
        res.status(400).json({mensagem: `error ao  criar usuario: ${error.message}`})
    }
}

