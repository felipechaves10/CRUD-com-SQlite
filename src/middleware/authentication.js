import { verifyToken } from "../utils/auth.js";

export function authenticate(req,res, next) {
    //obter o token do header Authorizaton
    const authHeade = req.headers["authorization"]

    const token = authHeade && authHeade.split("")[1]
    
        if (!token){
           return res.status(401).json({
            mensagem: "token de acesso nao fornecido"
           }) 
        }
      try {
        //verificar se o token e valido
        //adicionar os dados decodificados token na requisição
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(403).json({
            mensagem: "token invalido ou Expirado"
        })
      }
}