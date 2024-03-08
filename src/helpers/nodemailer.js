import nodeMailer from 'nodemailer'


const mailToken ={
    from: ' ',
    to: 'zipper91191@gmail.com',
    subject: 'Bienvenido a la plataforma  para configurar tu cuenta',
    text: ' Hola, bienvenido a la plataforma  para configurar tu cuenta, por favor sigue el siguiente enlace para configurar tu cuenta',
    html: '<h1>Hola, bienvenido a la plataforma  para configurar tu cuenta, por favor sigue el siguiente enlace para configurar tu cuenta</h1>' +
    '<a href="http://localhost:3000/user/confirm/123456">Click aqui para confirmar tu cuenta</a>'
}
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD
    }
})


//
/* transporter.sendMail(mail, (error, info) => {
    if (error) {
        console.log(error)
    } else {
        console.log(info)
    }
}
) */

export { transporter, mailToken }