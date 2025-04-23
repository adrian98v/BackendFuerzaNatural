import express from 'express';
import { getProductos, addProducto, getProductosPorCategoria,obtenerProductos } from '../controllers/producto.controller.js';
const router = express.Router();

router.get('/Productos', getProductos);
router.get('/ProductoPorCategoria/:id', getProductosPorCategoria);
router.post('/AddCategoria', addProducto);
router.get('/TodoProductos', obtenerProductos);

export default router;
