import {pool} from "../db.js";

// GET todos los pedidos
export const getPedidos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM pedido");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST crear un nuevo pedido
export const createPedido = async (req, res) => {
    const { estado, fecha, precio_final, numero, nombre } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO pedido (estado, fecha, precio_final, numero, nombre) VALUES (?, ?, ?, ?, ?)",
            [estado, fecha, precio_final, numero, nombre]
        );
        res.status(201).json({ message: "Pedido creado", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE eliminar un pedido por ID
export const deletePedido = async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await pool.query("DELETE FROM pedido WHERE ID_Pedido = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json({ message: "Pedido eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
