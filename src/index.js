import express from 'express'
import routerUsuario from './routes/usuario.routes.js'
import productoRoutes from './routes/producto.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import signupRoutes from './routes/signup.routes.js'
import loginRoutes from './routes/login.routes.js'
import logoutRoutes from './routes/logout.routes.js'
import productosPedidoRoutes from './routes/productos_pedido.routes.js'
import pedidoRoutes from './routes/pedido.routes.js'
import finalizarCompra  from './routes/checkout.routes.js'
import resetRoutes from './routes/reset.password.routes.js'

import userCheck from './routes/userCheck.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'



const app = express()

app.use(cors({
    origin: 'https://fuerzanatural.netlify.app',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(productoRoutes);
app.use(categoriaRoutes);
app.use(signupRoutes);
app.use(loginRoutes);
app.use(routerUsuario);
app.use(userCheck);
app.use(logoutRoutes);
app.use(productoRoutes);
app.use(pedidoRoutes);
app.use(productosPedidoRoutes);
app.use(finalizarCompra);
app.use(resetRoutes)



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`);
});