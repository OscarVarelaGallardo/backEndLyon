import db from '../config/db.js'
import DataType from 'sequelize'


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
    category: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataType.STRING,
        allowNull: false
    }
});

export default Products;