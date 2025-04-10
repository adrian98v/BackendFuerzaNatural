import  {pool}  from '../db.js';
import bcrypt from 'bcrypt';


export const loginController = async (req, res)=>{

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


        const copiaSegura = { ...usuario }
        copiaSegura.contrasenia = "_"

        res.status(200).json({ success: true, user: copiaSegura});

    } catch (error) {
        res.status(500).json({success: true, message: "Error del servidor"})
    }
}