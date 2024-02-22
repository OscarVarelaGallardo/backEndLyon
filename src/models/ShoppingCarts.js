import db from '../config/db.js'
import DataType from 'sequelize'

const ShoppingCarts = db.define('shoppingCarts', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataType.FLOAT,
        allowNull: false
    },
    CartStatus: {
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

ShoppingCarts.associate = (models) => {
    ShoppingCarts.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    })
}

export default ShoppingCarts;