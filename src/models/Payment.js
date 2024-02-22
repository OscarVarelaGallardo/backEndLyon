import db from '../config/db.js'
import DataType from 'sequelize'


const Payment = db.define('payment', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataType.FLOAT,
        allowNull: false
    },
    paymentMethod: {
        type: DataType.STRING,
        allowNull: false
    },
    paymentStatus: {
        type: DataType.STRING,
        allowNull: false
    },
    userId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
})