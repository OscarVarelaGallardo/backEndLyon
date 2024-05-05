import nodeMailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD
    }
})

const sendMail = async (token, email) => {
    const mailToken = {

        from: ' ',
        to: email,
        subject: 'Bienvenido a la plataforma  para configurar tu cuenta',
        text: `Bienvenido a la plataforma  para configurar tu cuenta`,
        html:
            '<div  style="padding:50px; border-radius:10px; text-align:center; box-shadow: 10px 5px 5px yellow; line-height: 1.6; background-color: #f2f2f2; ">' +
            '<h1>Hola, bienvenido a la plataforma  </h1>' +

            '<p>Por favor sigue el siguiente enlace para configurar tu cuenta</p>' +

            /* `<a style="background-color:green;
            color:white;margin:10px;padding:10px;border-radius:10px;text-decoration:none; 
            "href="https://backendlyon.onrender.com/user/confirm/${token}">Click aqui para confirmar tu cuenta</a>` */
            ` <a style="background-color:green;
            color:white;margin:10px;padding:10px;border-radius:10px;text-decoration:none;
            " https://hivexlatam.com/confirmed${token}">Click aqui para confirmar tu cuenta</a>` +
            + '</div>'
    }
    transporter.sendMail(mailToken, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }
    }
    )

}

const sendMailRecover = async (token, email) => {

    const mailToken = {

        from: ' ',
        to: email,
        subject: 'Recuperar contraseña',
        text: `Recuperar contraseña`,
        html:
            '<div  style="padding:50px; border-radius:10px; text-align:center; box-shadow: 10px 5px 5px yellow; line-height: 1.6; background-color: #f2f2f2; ">' +
            '<h1>Recuperar contraseña </h1>' +
            '<p>Por favor copia y pega la siguiente contraseña temporal en la aplicacion</p>' +
            '<p>Si no has solicitado este cambio, por favor ignora este mensaje</p>' +
            //esta es tu contraseña temporal
            `<p style="background-color:green;  
            color:white;margin:10px;padding:10px;border-radius:10px;text-decoration:none;">Esta  es tu contraseña temporal es : 
            <br style="margin:10px;padding:10px;border-radius:10px;text-decoration:none;">
            ${token}</br></p>`

            + '</div>'
    }
    transporter.sendMail(mailToken, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }
    }
    )

}




export { transporter, sendMail, sendMailRecover }