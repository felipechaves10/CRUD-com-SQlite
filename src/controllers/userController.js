import { PrismaClient } from '@prisma/client'
import { comparePassword, generateToken, hashPassword } from '../utils/auth.js'
const prisma = new PrismaClient()


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

export const registerUser = async (req, res) => {

    const {nome, email, password} = req.body

    try {
        // Criar a senha do usuário hasheada
        const hashedPassword = await hashPassword(password)

        //Cria usuário no banco de dados
        const newRegisteredUser = await prisma.user.create({
            data: {
                nome: nome,
                email: email,
                password: hashedPassword
            }
        })

        //Gerar um token JWT
        const token = generateToken(newRegisteredUser)

        //Manda como resposta infos do usuário criado e o token de acesso
        res.status(201).json({
            nome: newRegisteredUser.nome,
            email: newRegisteredUser.email,
            token: token
        })
    
    } catch (error) {
        res.status(400).json({
            erro: "Erro ao criar o usuário!",
            detalhes: error.message
        })
    }



}

export const login = async (req,res) => {
    const {email, password} = req.body
    try {
        //01 buscar o usuario pelo email
     const user = await prisma.user.findUnique({
        where: {email}

     })
     if(!user){
        return res.status(401).json({
            mensagem: "Credenciais Ivalidas!"
        })
     }
        //02. comparar a senha fornecida com a senha hash amazenada
      const pesswordMatch = await comparePassword(
        password, user.password)

        if(!pesswordMatch){
            return res.status(401).json({
                mensagem: "Credenciais invalidas!"
            })
        }
        //03. gerar token jwt
        const token = generateToken(user)
        //04/ Enviar como resposta o usuario e token
        res.json({usuario:{nome: user.nome,email: user.email},token})
    } catch (error) {
      res.status(500).json({mensagem: "Erro no Login", erro: error.message})  
    }
}

