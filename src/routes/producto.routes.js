import express from 'express';
import { getProductos, addProducto, getProductosPorCategoria } from '../controllers/producto.controller.js';
const router = express.Router();

router.get('/', getProductos);
router.get('/categoria/:id', getProductosPorCategoria);
router.post('/', addProducto);

export default router;
