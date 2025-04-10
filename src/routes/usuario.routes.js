import { Router } from "express";
import {deleteUsuario} from '../controllers/usuario.controller.js'
import {changePassword} from '../controllers/usuario.controller.js'

const router = Router()

router.delete("/usuario/:email", deleteUsuario)

router.patch("/usuario", changePassword)

export default router;