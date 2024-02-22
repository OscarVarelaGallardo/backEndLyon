import e from 'express'
import db from '../config/db.js'
import DataType from 'sequelize'

const Orders = db.define('orders', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataType.FLOAT,
        allowNull: false
    },
    status: {
        type: DataType.STRING,
        allowNull: false
    },
    dateShipped: {
        type: DataType.DATE,
        allowNull: false
    },
    productId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
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

Orders.associate = (models) => {
    Orders.belongsTo(models.Products, {
        foreignKey: 'productId',
        onDelete: 'CASCADE'
    })
    Orders.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    })
}

export default Orders;