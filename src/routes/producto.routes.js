import express from 'express';
import { getProductos, addProducto, getProductosPorCategoria } from '../controllers/producto.controller.js';
const router = express.Router();

router.get('/Categoria', getProductos);
router.get('/ProductoPorCategoria/:id', getProductosPorCategoria);
router.post('/AddCategoria', addProducto);

export default router;
