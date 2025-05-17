// controllers/productoController.js

import { pool } from '../db.js';

export const getProductos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM producto');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('SELECT * FROM producto WHERE ID_Producto = ?', [id]);

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductosPorCategoria = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await pool.query('SELECT * FROM producto WHERE ID_Categoria = ?', [id]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addProducto = async (req, res) => {
  const { nombre, precio, stock, imagen, descripcion, ID_Categoria } = req.body;

  if (!nombre || !precio || !stock || !ID_Categoria) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  const sql = `
    INSERT INTO producto (nombre, precio, stock, imagen, descripcion, ID_Categoria)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.query(sql, [nombre, precio, stock, imagen, descripcion, ID_Categoria]);

    res.status(201).json({
      mensaje: 'Producto agregado exitosamente',
      idInsertado: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, imagen, descripcion, ID_Categoria } = req.body;

  const sql = `
    UPDATE producto 
    SET nombre = ?, precio = ?, stock = ?, imagen = ?, descripcion = ?, ID_Categoria = ?
    WHERE ID_Producto = ?
  `;

  try {
    const [result] = await pool.query(sql, [nombre, precio, stock, imagen, descripcion, ID_Categoria, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM producto WHERE ID_Producto = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
