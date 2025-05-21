import  {pool}  from '../db.js';
import bcrypt from 'bcryptjs';


export const loginController = async (req, res)=>{

    try {
        console.log(req.cookies);
        const {email, contrasenia} = req.body

        const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Usuario no encontrado' });
        }

        const usuario = rows[0];

        const passwordControl = await bcrypt.compare(contrasenia, usuario.contrasenia);

        if(!passwordControl){
            return res.status(401).json({success: false, message: "Contraseña incorrecta"})
        }


        const copiaSegura = {
            IDUsuario: usuario.ID_Usuario,
            nombre: usuario.nombre,
            email: usuario.email,
            numero: usuario.numero,
            is_admin: usuario.is_admin,
        };
        
        // Guardar la cookie
        res.cookie('usuario', copiaSegura, {
            httpOnly: true,
            secure: true, // true en producción con HTTPS
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 // 1 día con sesión abierta
        });

    res.status(200).json({ success: true, message: 'Sesión iniciada correctamente' });

    } catch (error) {
        res.status(500).json({success: true, message: "Error del servidor"})
    }
}