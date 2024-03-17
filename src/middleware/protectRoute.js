import User from "../models/User.js";

const protectRoute = (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'No estas autorizado para acceder ingresa un token correcto.'
            });
        }
      
        const user = User.findOne({ where: { jwt } });
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Token invalido o expirado, por favor logueate nuevamente.'
            });
        }
        next(); 
    
}


export default protectRoute;