import {pool} from "../db.js";

export const finalizarCompra = async (req, res) => {
    const { carrito, estado, fecha, numero, nombre } = req.body;

    // Calculamos el precio final sumando subtotales
    const precio_final = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Insertar el pedido
        const [pedidoResult] = await connection.query(
            "INSERT INTO pedido (estado, fecha, precio_final, numero, nombre) VALUES (?, ?, ?, ?, ?)",
            [estado, fecha, precio_final, numero, nombre]
        );

        const ID_Pedido = pedidoResult.insertId;

        // 2. Insertar productos del carrito en productos_pedido
        for (const item of carrito) {
            await connection.query(
                "INSERT INTO productos_pedido (ID_Pedido, ID_Producto, cantidad) VALUES (?, ?, ?)",
                [ID_Pedido, item.ID_Producto, item.cantidad]
            );
        }

        await connection.commit();
        connection.release();

        res.status(201).json({ message: "Compra finalizada", ID_Pedido });
    } catch (err) {
        await connection.rollback();
        connection.release();
        res.status(500).json({ error: "Error al finalizar la compra", detalle: err.message });
    }
};
