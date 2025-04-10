import { pool } from '../db.js'
import bcrypt from 'bcrypt';


export const signupController = async (req, res)=>{

    try{
        const {email} = req.body;

    const [rows] = await pool.query('select * from usuario where email = ?', [email])

    if(rows.length == 0){
        const {DNI, nombre, apellido, email, is_admin, contrasenia} = req.body;

        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        const [resultado] = await pool.query('insert into usuario values (?, ?, ?, ?, ?, ?)', 
            [DNI, nombre, apellido, email, is_admin, hashedPassword])

        res.status(201).json({ success: true, message: 'Usuario registrado correctamente' });

    }else{
        res.status(400).json({success: false, message: 'El email ingresado ya existe'})

    }

    }catch(error){
        console.error('Error en signupController:', error);
        return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
    
}