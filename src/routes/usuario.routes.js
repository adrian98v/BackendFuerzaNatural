import { Router } from "express";
import {createUsuario} from '../controllers/usuario.controller.js'
import {deleteUsuario} from '../controllers/usuario.controller.js'
import {changePassword} from '../controllers/usuario.controller.js'

const router = Router()

router.post('/usuario', createUsuario)

router.delete("/usuario/:email", deleteUsuario)

router.patch("/usuario", changePassword)

export default router;