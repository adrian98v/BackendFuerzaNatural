import express from "express";
import { getProductosPedido, addProductoPedido, getProductosPedidoPorID } from "../controllers/productos_pedido.controller.js";
const router = express.Router();


router.get("/ProductosPedido", getProductosPedido);
router.get("/ProductosPorPedido/:id", getProductosPedidoPorID);
router.post("/AgregarProductosPedido", addProductoPedido);

export default router;
