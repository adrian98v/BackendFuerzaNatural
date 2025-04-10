import { pool } from '../db.js';

export const getProductos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM producto');
    res.json(result);
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


export const addProducto = (req, res) => {
  const { nombre, precio, stock, imagen, descripcion, ID_Categoria } = req.body;
  const sql = 'INSERT INTO producto (nombre, precio, stock, imagen, descripcion, ID_Categoria) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(sql, [nombre, precio, stock, imagen, descripcion, ID_Categoria], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ mensaje: 'Producto agregado' });
  });
};

// ✅ CORREGIDO: usar req.query en lugar de req.body
export const obtenerProductos = (req, res) => {
  const { categoria } = req.query;

  let query = 'SELECT * FROM producto';
  let params = [];

  if (categoria) {
    query += ' WHERE ID_Categoria = ?';
    params.push(categoria);
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener productos', error: err });
    }
    res.json(results);
  });
};
