import express from 'express'
import db from './src/config/db.js'
import userRoutes from './src/routes/userRoutes.js'
const app = express()

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
app.use('/',userRoutes)

const port = 3000   || process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})