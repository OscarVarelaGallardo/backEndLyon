import db from '../config/db.js'
import DataType from 'sequelize'

const Rol = db.define('rols', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataType.STRING,
        allowNull: false
    }
})
Rol.sync({ force: true })


export default Rol;