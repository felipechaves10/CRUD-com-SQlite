
//requisição ->  middleware  -> rota(controllers) -> resposta


// function middleware(req, res, next){

//     //1fazer algo com a requisição
//     //-> validar as informações
//     //-> verificar se o usr tem conta
//     // 2. modificar a resposta 
//     // -> dar uma  resposta  oa cliente
//     // 3. chamar o next 
// }


export function validete (schema) {
return (req,res, next) => {
    try {
    //valedar o corpo da requisição contra schema fornecido*/
    const validatedData = schema.parse(req.body)
    /**substituir o body pelo dados validados  */
    req.body = validatedData

    /**chamo o proximo agente(middleware) */
    next()
    } catch (error) {
        return res.status(400).json({messagem: "error de  validação",errors: error.errors.map(e => ({
            path: e.path,
            message: e.message
        }))})
    }
}

}