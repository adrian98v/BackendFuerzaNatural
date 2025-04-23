import express from 'express';
import { getCategorias, addCategoria,deleteCategoria,updateCategoria} from '../controllers/categoria.controller.js';
const router = express.Router();

router.get('/Categorias', getCategorias);
router.post('/AgregarCategoria', addCategoria);
router.delete('/EliminarCategoria/:id', deleteCategoria);
router.put('/ActualizarCategoria/:id', updateCategoria);

export default router;

