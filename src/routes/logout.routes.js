import { Router } from "express";
import {logoutController} from '../controllers/logout.controller.js';

const router = Router()

router.post('/logout', logoutController)

export default router;