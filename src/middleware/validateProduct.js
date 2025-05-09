export const validateProduct = (schema) => {
    return (req, res, next) => {
        try {
            const validateData = schema.parse(req.body)
            req.body = validateData
            next()
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
}