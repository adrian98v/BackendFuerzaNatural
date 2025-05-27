import { Router } from "express";
import {deleteUsuario, getClientes} from '../controllers/usuario.controller.js'


const router = Router()

router.get("/admin/clientes", getClientes)

router.delete("/usuario/:numero", deleteUsuario)



export default router;