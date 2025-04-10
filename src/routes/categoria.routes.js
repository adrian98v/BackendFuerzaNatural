import express from 'express';
import { getCategorias, addCategoria } from '../controllers/categoria.controller.js';
const router = express.Router();

router.get('/categoria', getCategorias);
router.post('/categoria', addCategoria);

export default router;
