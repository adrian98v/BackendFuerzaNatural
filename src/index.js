import express, { json } from 'express'
import routerUsuario from './routes/usuario.routes.js'
import productoRoutes from './routes/producto.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import cors from 'cors'

const app = express()
app.use(cors());
app.use(express.json())
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);

app.use(routerUsuario)

app.listen(3000, ()=>{console.log("escuchando en puerto 3000")})