import User from '../models/User.js'

const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 400, msg: 'Todos los campos son obligatorios' })
    }
    try {
        const existUser = await User.findOne({ email })
       
        if (!existUser) {
            return res.status(400).json({ status: 400, msg: 'El email no existe' })
        }
        const validPassword = await existUser.validPassword(password)
     
        if (!validPassword) {
            return res.status(400).json({ status: 400, msg: 'Contraseña incorrecta' })
        }
        if (existUser.rol_id === 2  || existUser.rol_id === 3) {
            return res.status(403).json({ status: 403, msg: 'No tienes permisos para ingresar' })
        }
        const user = {
            _id: existUser._id,
            email: existUser.email,
            rol_id: existUser.rol_id
        }
        res.status(200).json({ status: 200, msg: 'Usuario logueado correctamente', user })
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error en el servidor' })
    }
}

export { login }