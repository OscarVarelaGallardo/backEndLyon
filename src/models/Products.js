import db from '../config/db.js'
import DataType from 'sequelize'
import Users from './User.js'

const Products = db.define('products', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    price: {
        type: DataType.FLOAT,
        allowNull: false
    },
    image: {
        type: DataType.STRING,
        allowNull: false
    },
    stock: {
        type: DataType.INTEGER,
        allowNull: false
    },

    description: {
        type: DataType.STRING,
        allowNull: false
    },
    status: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    createdAt: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    user_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
})

Products.associate = (models) => {
    Products.belongsTo(models.Category, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE'
    })
}

Users.associate = (models) => {
    Users.hasMany(models.Products, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    })
}




export default Products;