import express from 'express';
import { getPedidos, createPedido, deletePedido, getAllPedidos, cambiarEstadoPedido , getPedidosPorUsuario} from '../controllers/pedido.controller.js';
const router = express.Router();


router.get("/pedidos", getPedidos);
router.post("/crearPedido", createPedido);
router.delete("/pedido/:id", deletePedido);
router.get("/pedidos/detalles", getAllPedidos);
router.put('/pedidos/:id/:estado', cambiarEstadoPedido);
router.get("/pedidos/usuario/:numero", getPedidosPorUsuario);

export default router;
