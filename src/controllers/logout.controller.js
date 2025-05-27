import  {pool}  from '../db.js';
import bcrypt from 'bcryptjs';


export const logoutController = async (req, res)=>{

    try {
    
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


        const loggedUser = {
            nombre: usuario.nombre,
            email: usuario.email,
            numero: usuario.numero,
            is_admin: usuario.is_admin,
        };
        

    res.status(200).json({ success: true, message: 'Sesión iniciada correctamente', user: loggedUser });

    } catch (error) {
        res.status(500).json({success: false, message: "Error del servidor"})
    }
}