import express from 'express';
import { getProductos, addProducto, getProductosPorCategoria,updateProducto,deleteProducto } from '../controllers/producto.controller.js';
const router = express.Router();

router.get('/Productos', getProductos);
router.get('/ProductoPorCategoria/:id', getProductosPorCategoria);
router.post('/AgregarProducto', addProducto);
router.put('/ActualizarProducto/:id', updateProducto);
router.delete('/EliminarProducto/:id', deleteProducto);
export default router;
