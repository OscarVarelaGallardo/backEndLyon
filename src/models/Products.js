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
 
    description: {
        type: DataType.STRING,
        allowNull: false
    },
    productStatus:{
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
  
    createdAt: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
})

Products.associate = (models) => {
    Products.belongsTo(models.Category, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE'
    })
}




export default Products;