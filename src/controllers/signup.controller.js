import { pool } from '../db.js'
import bcrypt from 'bcryptjs';


export const signupController = async (req, res)=>{

    try{
        const {email, numero} = req.body;

        const [rows] = await pool.query('select * from usuario where email = ? or numero = ?', [email, numero])

    if(rows.length == 0){
        const {nombre, email, is_admin, contrasenia, numero} = req.body;

        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        const [resultado] = await pool.query('insert into usuario (nombre, email, is_admin, contrasenia, numero) values (?,?,?,?,?)', 
            [nombre, email, is_admin, hashedPassword, numero])



        res.status(201).json({ success: true, message: 'Usuario registrado correctamente' });

    }else{
        res.status(400).json({success: false, message: 'Ya existe un usuario con los datos ingresados'})

    }

    }catch(error){
        console.error('Error en signupController:', error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
    
}