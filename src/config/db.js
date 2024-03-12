import Sequelize from 'sequelize';
import dotenv from 'dotenv';
//Cargamos las variables de entorno
dotenv.config({
    path: 'local.env'
});
//Datos de conexion a la base de datos
const dataBase = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        port: process.env.DATABASE_PORT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            timestamps: false,

        }
    }
);

export default dataBase;