import User from "../models/User.js";
import jwt from 'jsonwebtoken';
const protectRoute = (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).json({
                status: '403',
                message: 'No hay token, por favor ingresa un token valido.'
            });
        }
      
        const user = User.findOne({ where: { jwt } });
        if (!user) {
            return res.status(401).json({
                status: '401',
                message: 'Usuario no autorizado para esta accion.'
            });
        }

     /*    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
         */
        next(); 
    
}


export default protectRoute;