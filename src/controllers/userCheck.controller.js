import  {pool}  from '../db.js';


export const userCheckController = async (req, res) => {

    try {
        const {email, nombre, is_admin} = req.body;
    
        const [rows] = await pool.query("select * from usuario where email = ? and nombre = ? and is_admin = ?", [email, nombre, is_admin])
    
        if (rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Usuario no encontrado'});
        }

        const usuario = rows[0]

        return res.status(200).json({ success: true, user: usuario });

    } catch (error) {
        res.status(500).json({success: false, message: "Error del servidor"})
    }
    
  };