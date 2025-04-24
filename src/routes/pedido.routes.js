import express from 'express';
import { getPedidos, createPedido, deletePedido } from '../controllers/pedido.controller.js';
const router = express.Router();


router.get("/pedidos", getPedidos);
router.post("/crearPedido", createPedido);
router.delete("/pedido/:id", deletePedido);

export default router;
