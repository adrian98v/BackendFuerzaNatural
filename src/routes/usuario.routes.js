import { Router } from "express";
import { pool } from '../db.js'
import {usuarioController} from '../controllers/usuario.controller.js'


const router = Router()

router.get('/usuario', (req, res) => {

    pool.query('select * from usuario',  )
      
})


export default router;