import { Router } from "express";
import {loginController} from '../controllers/login.controller.js';

const router = Router()

router.post('/login', loginController)

export default router;