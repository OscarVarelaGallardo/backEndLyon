import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const protectRoute = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({
            status: '403',
            message: 'No hay token, ingresado.'
        });
    }

    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(403).json({
            status: '401',
            message: 'No hay token, por favor ingresa un token valido.'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(decoded.id);
        if (!user) {
            return res.status(403).json({
                status: '403',
                message: 'Usuario no encontrado'
            });
        }
        const now = new Date().getTime() / 1000;
        if (decoded.exp < now) {
            return res.status(403).json({
                status: '403',
                message: 'Token expirado'
            });
        }
        next();
    } catch (error) {
        console.error('Error al proteger la ruta:', error);
        res.status(500).json({ status: 500, msg: 'Error al proteger la ruta', error: error.message });
    } 
}


export default protectRoute;