import { pool } from '../db.js'
import bcrypt from 'bcryptjs';


export const getClientes = async (req, res)=>{

  try{
    const [userRows] = await pool.query(`select nombre, email, numero, true as registrado from usuario where usuario.is_admin = 0
      union
        select pedido.nombre, null as email, pedido.numero, false as registrado from pedido 
        where not exists (
	        select * from usuario where pedido.numero = usuario.numero)
      order by nombre`)

  if (userRows.length === 0) {
    return res.status(200).json({ success: true, message: 'No hay clientes registrados' });
  }

  return res.status(200).json({ success: true, clientes: userRows})

  }catch(error)
  {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Error al obtener clientes'})
  }
}


export const deleteUsuario = async (req, res) => {

  try {
    const [result] = await pool.query('DELETE FROM usuario WHERE numero = ?', [req.params.numero]);

  
    if (result.affectedRows > 0) {
        
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } else {
        return res.status(200).json({ message: 'Usuario no encontrado' });
    }
    
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error del servidor' });
  }
  
}


