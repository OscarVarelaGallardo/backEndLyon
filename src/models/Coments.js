import db from '../config/db.js'
import DataType from 'sequelize'

const Coments = db.define('coments', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataType.STRING,
        allowNull: false
    },
    rating: {
        type: DataType.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    productId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    }
})