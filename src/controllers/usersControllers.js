import User from '../models/User.js';
import Companies from '../models/Companies.js';
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
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("El usuario no existe ")
            return res.status(400).json({ status: 200, msg: error.message })
        }
      

        const validPassword = await user.validPassword(password);

        if (!validPassword) {
            const error = new Error("Contraseña incorrecta ")
            return res.status(400).json({ status: 400, msg: error.message })
        }
        if (!user.confirm) {
            const error = new Error("Tu cuenta no esta confimada ")
            return res.status(403).json({ status: 403, msg: error.message })
        }
        const createUser = generateUser(user)
        console.log("createUser", createUser)
        const company = await Companies.findOne({ user_id: createUser.id });
        createUser.token = generateJWT(user.id)
        User.updateOne({ _id: user.id }, { $set: { jwt: createUser.token } });
        company ? createUser.company = company : "No tiene empresa registrada";
        res.status(200).json({ status: 200, msg: 'Usuario logueado correctamente', createUser });
    } catch (error) {
        const msg = new Error("Error en el servidor al iniciar sesion")
        res.status(500).json({ status: 500, msg: msg.message });
    }
}
const confirmToken = async (req, res) => {
    const { token } = req.params
    const userConfirm = await User.findOne({ token: token });
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
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = new Error("Usuario no encontrado ")
        return res.status(400).json({ status: 400, msg: error.message })
    }

    try {
        const token = generateToken()
        user.password = token
        //TODO:validar que no se envien mas de 3 correos
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

export { register, login, confirmToken, recoverPassword }