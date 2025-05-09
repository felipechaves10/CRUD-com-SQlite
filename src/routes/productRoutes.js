import express from 'express'
import { getAllProduct, getIdProduct, updateProduct, deleteProduct, criarProduto } from '../controllers/productController.js'
import { validateProduct } from '../middleware/validateProduct.js'
import { createProductSchema } from '../schemas/productSchemas.js'

const router = express.Router()

router.post('/', validateProduct(createProductSchema), criarProduto)

router.get('/', getAllProduct)

router.get('/:id', getIdProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)


export default router
