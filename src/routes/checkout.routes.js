import express from "express";
import { finalizarCompra } from "../controllers/checkout.controller.js";
const router = express.Router();


router.post("/checkout/finalizarCompra", finalizarCompra);
export default router;
