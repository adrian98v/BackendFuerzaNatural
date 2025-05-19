import {Router} from 'express'
import {passwordRequest, tokenCheck, generatePassword} from '../controllers/passwordRequest.controller.js'

const router = Router()

router.post("/reset/password", passwordRequest)

router.post("/reset/tokenCheck", tokenCheck)

router.post("/reset/generatePassword", generatePassword)

export default router