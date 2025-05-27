import { Router } from "express";
import {userCheckController} from '../controllers/userCheck.controller.js';

const router = Router()

router.post('/userCheck', userCheckController)

export default router;