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

export const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM categoria WHERE ID_Categoria = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json({ mensaje: 'Categoría y productos relacionados eliminados correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};

export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nuevo nombre de la categoría es requerido' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE categoria SET nombre = ? WHERE ID_Categoria = ?',
      [nombre, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json({ mensaje: 'Categoría actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
};
