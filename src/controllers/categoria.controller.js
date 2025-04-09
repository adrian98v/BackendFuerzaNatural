import { pool } from '../db.js';

// Obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categoria');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

// Agregar una nueva categoría
export const addCategoria = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
  }

  try {
    const [result] = await pool.query('INSERT INTO categoria (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ mensaje: 'Categoría agregada exitosamente', ID_Categoria: result.insertId });
  } catch (error) {
    console.error('Error al agregar categoría:', error);
    res.status(500).json({ error: 'Error al agregar categoría' });
  }
};
