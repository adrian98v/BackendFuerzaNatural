import { Router } from "express";
import { pool } from '../db.js'
import {createUsuario} from '../controllers/usuario.controller.js'
import {deleteUsuario} from '../controllers/usuario.controller.js'

const router = Router()

router.post('/usuario', createUsuario)

router.delete("/usuario/:DNI", deleteUsuario)


export default router;