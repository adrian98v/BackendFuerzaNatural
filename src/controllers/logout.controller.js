
export const logoutController =  async (req, res) =>{

    try {
        res.clearCookie('usuario', {
            httpOnly: true,
            sameSite: 'lax',
            secure: true // true si usás HTTPS en producción
          });
        
          res.status(200).json({ success: true, message: 'Sesión cerrada correctamente' });
        
    } catch (error) {
        res.status(500).json({success: true, message: "Error del servidor"})
    }

}