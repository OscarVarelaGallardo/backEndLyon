import Sequelize from 'sequelize';
import dotenv from 'dotenv';
//Cargamos las variables de entorno
dotenv.config({
    path: '.env'
});
//Datos de conexion a la base de datos
const dataBase = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWD ?? '', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    define: {
        timestamps: false
    }, pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false,

});

export default dataBase;