import User from '../models/User.js';
import generateToken from '../helpers/generateId.js';
import generateJWT from '../helpers/generarJWT.js';
import { sendMail, sendMailRecover } from '../helpers/nodemailer.js';

const register = async (req, res) => {
    const { email } = req.body;
    const existEmail = await User.findOne({ email: email });
   
    if (existEmail) {
        return res.status(400).json({ status: 400, msg: 'El email ya se encuentra registrado' });
    }
    try {
        const user = new User(req.body);
        user.token = generateToken();
        user.confirm = false;
        user.rol_id = 2;
        await user.save();
        await sendMail(user.token, user.email);
        res.status(200).json({ status: 200, msg: 'Cliente creado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = new Error("El usuario no existe ")
            return res.status(400).json({ status: 200, msg: error.message })
        }
        if (!user.confirm) {
            const error = new Error("Tu cuenta no esta confimada ")
            return res.status(403).json({ status: 403, msg: error.message })
        }

        if (!await user.validPassword(password)) {
            const error = new Error("Contraseña incorrecta ")
            return res.status(400).json({ status: 400, msg: error.message })
        }
        //generate token
        const createUser = generateUser(user) 
        createUser.token = generateJWT(user.id)
        User.update({ jwt: createUser.token }, { where: { id: user.id } })
        res.status(200).json({ status: 200, msg: 'Usuario logueado correctamente', createUser });
    } catch (error) {
        const msg = new Error("Error en el servidor")
        res.status(500).json({ status: 500, msg: msg.message });
    }
}
const confirmToken = async (req, res) => {
    const { token } = req.params
    const userConfirm = await User.findOne({ where: { token } });
    if (!userConfirm) {
        const error = new Error("Usuario no encontrado ")
        return res.status(400).json({ status: 400, msg: error.message })
    }

    try {
        userConfirm.confirm = true
        userConfirm.token = ""
        await userConfirm.save()
        res.status(200).json({ status: 200, msg: 'Usuario confirmado correctamente' });

    } catch (error) {
        const msg = new Error("Error en al actualizar token")
        res.status(500).json({ status: 500, msg: msg.message });
    }


}

const recoverPassword = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
        const error = new Error("Usuario no encontrado ")
        return res.status(400).json({ status: 400, msg: error.message })
    }
    try {
        const token = generateToken()
        user.password = token
        console.log(user.password)
        await user.save()
        await sendMailRecover(token, user.email)
        res.status(200).json({ status: 200, msg: 'Correo enviado correctamente' });
    } catch (error) {
        const msg = new Error("Error en el servidor")
        res.status(500).json({ status: 500, msg: msg.message });
    }
}


const generateUser = (user) => {
    const userReturn = {
        id: user.id,
        name: user.name,
        email: user.email,
        rol_id: user.rol_id,
       

    }
    return userReturn
}

export { register, login, confirmToken, recoverPassword}