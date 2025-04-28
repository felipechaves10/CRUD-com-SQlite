
export const getAllUsers = (req, res) =>{
    res.status(200).json({mensagem: "rota usuario fucionando"})
}

export const postCreateUsers = (req,res) => {
    const {nome, email} = req.body

    const newUsers = {
        nome,
        email
    }

    res.status(201).json(newUsers)
}