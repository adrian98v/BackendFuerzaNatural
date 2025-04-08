import { pool } from '../db.js'

export const createUsuario = async (req, res) => {
    const {DNI, nombre, apellido, email, is_admin, contraseña} = req.body;
    const [rows] = await pool.query('insert into usuario values (?, ?, ?, ?, ?, ?)', 
        [DNI, nombre, apellido, email, is_admin, contraseña]);
      
    res.send(rows)
}


export const deleteUsuario = async (req, res) => {
    await pool.query('delete from usuario where DNI = ?', [req.params.DNI])
}

