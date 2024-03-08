import userSchema from '../models/User.js';
import generateToken from '../helpers/generateId.js';
import generateJWT from '../helpers/generarJWT.js';
import { transporter } from '../helpers/nodemailer.js';
const register = async (req, res) => {
    const { email, password } = req.body;
    const existEmail = await userSchema.findOne({ where: { email } });
    if (existEmail) {
        return res.status(400).json({ status: 400, msg: 'El email ya se encuentra registrado' });
    }
    try {
        const user = new userSchema(req.body);
        user.token = generateToken();
        user.confirm = false;
        await user.save();

        const mail = {
            from: ' ',
            to: user.email,
            subject: 'Bienvenido a la plataforma  para configurar tu cuenta',
            text: ' Hola, bienvenido a la plataforma  para configurar tu cuenta, por favor sigue el siguiente enlace para configurar tu cuenta',
            html: '<h1>Hola, bienvenido a la plataforma  para configurar tu cuenta, por favor sigue el siguiente enlace para configurar tu cuenta</h1>' +
                `<a href="https://backendlyon.onrender.com/user/confirm/${user.token}">Click aqui para confirmar tu cuenta</a>`
        }
        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log(info)
            }
        }
        )
        res.status(200).json({ status: 200, msg: 'Cliente creado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }

}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ where: { email } });
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

        res.status(200).json({ status: 200, msg: 'Usuario logueado correctamente', user: generateUser(user) });

    } catch (error) {
        const msg = new Error("Error en el servidor")
        res.status(500).json({ status: 500, msg: msg.message });
    }
}

const confirmToken = async (req, res) => {
    const { token } = req.params
    const userConfirm = await userSchema.findOne({ where: { token } });
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

const generateUser = (user) => {
    const userReturn = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateJWT(user.id)
    }
    return userReturn
}

export { register, login, confirmToken }