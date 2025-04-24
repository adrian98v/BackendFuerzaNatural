import {pool} from "../db.js";

// GET todos los productos_pedido
export const getProductosPedido = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM productos_pedido");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET productos de un pedido por ID
export const getProductosPedidoPorID = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query("SELECT * FROM productos_pedido WHERE ID_Pedido = ?", [id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};
// POST agregar producto a un pedido
export const addProductoPedido = async (req, res) => {
    const { ID_Pedido, ID_Producto, cantidad } = req.body;
    try {
        await pool.query(
            "INSERT INTO productos_pedido (ID_Pedido, ID_Producto, cantidad) VALUES (?, ?, ?)",
            [ID_Pedido, ID_Producto, cantidad]
        );
        res.status(201).json({ message: "Producto agregado al pedido" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
