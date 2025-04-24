import { pool } from '../db.js'
import bcrypt from 'bcrypt';


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
    await pool.query('delete from usuario where numero = ?', [req.params.numero])
}



export const changePassword = async (req, res) => {
    try {
      const { contrasenia, newPassword } = req.body;
      const { ID_Usuario } = req.cookies;
  
      if (!ID_Usuario) {
        return res.status(400).json({ success: false, message: 'Usuario no autenticado' });
      }
  
      // Verificar que el usuario existe con la cookie ID_Usuario
      const [userRows] = await pool.query('SELECT * FROM usuario WHERE ID_Usuario = ?', [ID_Usuario]);
  
      if (userRows.length === 0) {
        return res.status(400).json({ success: false, message: 'Usuario no encontrado' });
      }
  
      const usuario = userRows[0];
  
      // Verificar la contraseña actual con bcrypt
      const passwordMatch = await bcrypt.compare(contrasenia, usuario.contrasenia);
  
      if (!passwordMatch) {
        return res.status(400).json({ success: false, message: 'Contraseña actual incorrecta' });
      }
  
      // Hashear la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Actualizar la contraseña en la base de datos
      const [updateResult] = await pool.query('UPDATE usuario SET contrasenia = ? WHERE ID_Usuario = ?', [hashedPassword, ID_Usuario]);
  
      // Verificar si la actualización fue exitosa
      if (updateResult.affectedRows === 0) {
        return res.status(500).json({ success: false, message: 'Error al actualizar la contraseña' });
      }
  
      res.status(200).json({ success: true, message: 'Contraseña actualizada con éxito' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error del servidor' });
    }
  };
