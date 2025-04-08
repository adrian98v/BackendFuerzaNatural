import express, { json } from 'express'
import routerUsuario from './routes/usuario.routes.js'

const app = express()

app.use(express.json())

app.use(routerUsuario)

app.listen(3000, ()=>{console.log("escuchando en puerto 3000")})