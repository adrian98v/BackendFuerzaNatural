import  {pool}  from '../db.js';
import { transporter } from '../mail.js';
import {EMAIL_USER} from '../data.js'
import crypto from 'crypto';
import bcrypt from 'bcrypt';


export const generatePassword = async (req, res) => {
  const { contrasenia, token} = req.body;

  try {

    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    // Actualizar contraseña, borrar token y expiración
    await pool.query(
      'UPDATE usuario SET contrasenia = ?, resetToken = NULL, resetTokenExpires = NULL WHERE resetToken = ?',
      [hashedPassword, token]
    );

    return res.json({ success: true, message: 'Contraseña actualizada correctamente' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};


export const tokenCheck = async (req, res)=>{

    const {token} = req.body

    try {

        const [rows] = await pool.query(
            'SELECT * FROM usuario WHERE resetToken = ? AND resetTokenExpires > NOW()',[token]
        );
        
        if(rows.length == 0){
            return res.status(400).json({success: false, message: "Token no encontrado o expirado"})
        }

        return res.status(200).json({ success: true, message: 'Token válido' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
}


export const passwordRequest = async (req, res)=>{

    const {email} = req.body;

    try {

        const [rows] = await pool.query("select * from usuario where email = ?", [email])
        
        if(rows.length == 0){
            return res.status(400).json({success: false, message: 'El correo electrónico ingresado no existe'})
        }

        const user = rows[0];

        // Crear token y fecha de expiración
        const token = crypto.randomBytes(32).toString('hex');
        const expiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos


        const [resultado] = await pool.query("update usuario set resetToken = ?, resetTokenExpires = ? where email = ?", [token, expiration, email])

        const resetLink = `http://localhost:5173/reset-password/${token}`;

        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: "Generación de contraseña",
            html: `<p>Hacé clic en el siguiente enlace para cambiar tu contraseña (válido por 10 minutos):</p>
            <a href="${resetLink}">${resetLink}</a>`,
        })

        return res.json({ success: true, message: 'Correo de recuperación enviado' });
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
}