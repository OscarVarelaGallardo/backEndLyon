import nodeMailer from 'nodemailer'
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
        text: ' Hola, bienvenido a la plataforma  para configurar tu cuenta, por favor sigue el siguiente enlace para configurar tu cuenta',
        html: '<h1>Hola, bienvenido a la plataforma  para configurar tu cuenta, por favor sigue el siguiente enlace para configurar tu cuenta</h1>' +
            '<img src="https://backendlyon.onrender.com/assets/logo.png" alt="logo" width="100px" height="100px" />' +
            `<a style="background-color:green "  href="https://backendlyon.onrender.com/user/confirm/${token}">Click aqui para confirmar tu cuenta</a>`
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




export { transporter, sendMail }