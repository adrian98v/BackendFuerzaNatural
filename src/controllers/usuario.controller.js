import { pool } from '../db.js'
import bcrypt from 'bcrypt';



export const deleteUsuario = async (req, res) => {
    await pool.query('delete from usuario where email = ?', [req.params.email])
}

export const changePassword = async (req, res) => {

    const {ID_Usuario, contrasenia, newPassword} = req.body

    const [rows] = await pool.query('SELECT * FROM usuario WHERE contrasenia = ?', [contrasenia]);

    if (rows.length === 0) {
        return res.status(400).json({ success: false, message: 'Contraseña no encontrada' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const [row] = await pool.query('UPDATE usuario SET contrasenia = ? WHERE ID_Usuario = ?', [hashedPassword, ID_Usuario])
    res.send(row)
}

