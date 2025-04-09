import  {pool}  from '../db.js';

export const getProductos = (req, res) => {
  pool.query('SELECT * FROM producto', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

export const getProductosPorCategoria = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM producto WHERE ID_Categoria = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

export const addProducto = (req, res) => {
  const { nombre, precio, stock, imagen, descripcion, ID_Categoria } = req.body;
  const sql = 'INSERT INTO producto (nombre, precio, stock, imagen, descripcion, ID_Categoria) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(sql, [nombre, precio, stock, imagen, descripcion, ID_Categoria], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ mensaje: 'Producto agregado' });
  });
};
