import { Router } from "express";
import {deleteUsuario, getClientes} from '../controllers/usuario.controller.js'
import {changePassword} from '../controllers/usuario.controller.js'


const router = Router()

router.get("/admin/clientes", getClientes)

router.delete("/usuario/:numero", deleteUsuario)

router.patch("/usuario", changePassword)

export default router;