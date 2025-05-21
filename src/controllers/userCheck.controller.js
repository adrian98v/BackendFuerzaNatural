
export const userCheckController = async (req, res) => {
    const usuario = req.cookies.usuario;
  
    if (!usuario) {
        return res.status(200).json({ success: true, message: "Usuario ya cerrado sesión o no está autenticado" });
    }

    return res.status(200).json({ logueado: true, user: usuario });
    
  };