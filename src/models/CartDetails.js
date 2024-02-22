import db from '../config/db.js'
import DataType from 'sequelize'

const CartDetails = db.define('cartDetails', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataType.INTEGER,
        allowNull: false
    },
    total: {
        type: DataType.FLOAT,
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
    shoppingCartId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'shoppingCarts',
            key: 'id'
        }
    }
})

CartDetails.associate = (models) => {
    CartDetails.belongsTo(models.Products, {
        foreignKey: 'productId',
        onDelete: 'CASCADE'
    })
    CartDetails.belongsTo(models.ShoppingCarts, {
        foreignKey: 'shoppingCartId',
        onDelete: 'CASCADE'
    })
}

export default CartDetails;
