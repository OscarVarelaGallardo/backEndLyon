import express from 'express'
import db from './src/config/db.js'
import userRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js';
import comentRoutes from './src/routes/comentRoutes.js'
import companiesRoutes from './src/routes/companiesRoutes.js'
import {transporter} from './src/helpers/nodemailer.js'
import cors from 'cors';

const app = express()

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
try {
    await db.authenticate();
    db.sync();
    console.log('Conexión a la base de datos establecida correctamente.');
}
catch (error) {
    console.log(error);
}


transporter.verify().then(() => {
    console.log('Ready for send emails')
}).catch((error) => {
    console.log(error)
})


//recibir json
app.use(express.json());
//recibir datos por formulario
app.use(express.urlencoded({ extended: true }));

app.use('/companies', companiesRoutes);
app.use('/coments', comentRoutes);
app.use('/user',userRoutes);
app.use('/product', productRoutes);

const port = 3000   || process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})