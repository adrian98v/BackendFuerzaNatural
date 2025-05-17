import { pool } from "../db.js";

// GET todos los pedidos
export const getPedidos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM pedido");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET pedidos con datos del usuario y productos
export const getAllPedidos = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.ID_Pedido,
                COALESCE(u.nombre, p.nombre) AS nombre_usuario,
                p.numero AS numero_usuario,
                pr.nombre AS nombre_producto,
                pr.precio AS precio_producto,
                p.estado AS estado_pedido,
                p.fecha AS fecha_pedido,
                pp.cantidad,
                p.precio_final AS Precio_Final
            FROM pedido p
            LEFT JOIN usuario u ON u.numero = p.numero
            JOIN productos_pedido pp ON p.ID_Pedido = pp.ID_Pedido
            JOIN producto pr ON pp.ID_Producto = pr.ID_Producto
            ORDER BY p.fecha DESC
        `);

        const pedidosMap = new Map();

        for (const row of rows) {
            const {
                ID_Pedido,
                nombre_usuario,
                numero_usuario,
                nombre_producto,
                precio_producto,
                estado_pedido,
                fecha_pedido,
                cantidad,
                Precio_Final
            } = row;

            if (!pedidosMap.has(ID_Pedido)) {
                pedidosMap.set(ID_Pedido, {
                    ID_Pedido,
                    nombre_usuario,
                    numero_usuario,
                    productos: [],
                    estado_pedido,
                    fecha_pedido,
                    Precio_Final
                });
            }

            pedidosMap.get(ID_Pedido).productos.push({
                nombre: nombre_producto,
                cantidad,
                precio: precio_producto
            });
        }

        const pedidos = Array.from(pedidosMap.values());
        res.json(pedidos);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//PATCH cambiar estado pedido
export const cambiarEstadoPedido = async (req, res) => {
    const id = req.params.id;
    const estado = req.params.estado; // Asegurarte que `estado` esté correctamente definido aquí

    try {
        // Comprobamos que `estado` sea uno de los valores válidos
        if (estado !== "pendiente" && estado !== "entregado") {
            return res.status(400).json({ message: "Estado inválido" });
        }

        const [result] = await pool.query(
            "UPDATE pedido SET estado = ? WHERE ID_Pedido = ?",
            [estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.json({ message: "Estado del pedido actualizado" });
    } catch (err) {
        console.error("Error en la actualización:", err);
        res.status(500).json({ error: "Error interno del servidor" });
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

// GET pedidos por número de usuario
export const getPedidosPorUsuario = async (req, res) => {
    const numero = req.params.numero;

    try {
        const [rows] = await pool.query(`
            SELECT 
                p.ID_Pedido,
                COALESCE(u.nombre, p.nombre) AS nombre_usuario,
                p.numero AS numero_usuario,
                pr.nombre AS nombre_producto,
                pr.precio AS precio_producto,
                pr.ID_Producto AS ID_Producto,
                p.estado AS estado_pedido,
                p.fecha AS fecha_pedido,
                pp.cantidad,
                p.precio_final AS Precio_Final
            FROM pedido p
            LEFT JOIN usuario u ON u.numero = p.numero
            JOIN productos_pedido pp ON p.ID_Pedido = pp.ID_Pedido
            JOIN producto pr ON pp.ID_Producto = pr.ID_Producto
            WHERE p.numero = ?
            ORDER BY p.fecha DESC
        `, [numero]);

        const pedidosMap = new Map();

        for (const row of rows) {
            const {
                ID_Pedido,
                nombre_usuario,
                numero_usuario,
                nombre_producto,
                precio_producto,
                ID_Producto,
                estado_pedido,
                fecha_pedido,
                cantidad,
                Precio_Final
            } = row;

            if (!pedidosMap.has(ID_Pedido)) {
                pedidosMap.set(ID_Pedido, {
                    ID_Pedido,
                    nombre_usuario,
                    numero_usuario,
                    productos: [],
                    estado_pedido,
                    fecha_pedido,
                    Precio_Final
                });
            }

            pedidosMap.get(ID_Pedido).productos.push({
                ID_Producto: ID_Producto,
                nombre: nombre_producto,
                cantidad,
                precio: precio_producto
            });
        }

        const pedidos = Array.from(pedidosMap.values());
        res.json(pedidos);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};