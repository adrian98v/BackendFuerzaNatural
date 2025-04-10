import express from 'express'
import routerUsuario from './routes/usuario.routes.js'
import productoRoutes from './routes/producto.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import signupRoutes from './routes/signup.routes.js'
import loginRoutes from './routes/login.routes.js'
import cors from 'cors'


const app = express()
app.use(cors());

app.use(express.json())
app.use(productoRoutes);
app.use(categoriaRoutes);
app.use(signupRoutes);
app.use(loginRoutes);
app.use(routerUsuario);

app.use('/api/categorias', categoriaRoutes);


app.listen(3000, ()=>{console.log("escuchando en puerto 3000")})