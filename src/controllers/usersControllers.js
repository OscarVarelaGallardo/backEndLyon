import User from '../models/User.js';

const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json({ status: 200, msg: 'Cliente creado correctamente' });

    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }

}
const login = (req, res) => {
    try {
        const { email, password } = req.body;
        const user = User.findOne({ where: { email, password } });
        if (user) {
            res.status(200).json({ status: 200, msg: 'Usuario logueado correctamente' });
        }
        else {
            res.status(404).json({ status: 404, msg: 'Usuario no encontrado' });
        }

    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}


export { createUser, login }