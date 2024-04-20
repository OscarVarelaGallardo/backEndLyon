import DataType from 'sequelize'
import Users from './User.js'
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        allowNull: false
    },
    price: {
        type: String,
        allowNull: false
    },
    file: {
        type: String,
        allowNull: false
    },
    stock: {
        type:String,
        allowNull: false
    },
  
    brand: {
        type: String,
        allowNull: false
    },
    color: {
        type: String,
        allowNull: false
    },

    description: {
        type: String,
        allowNull: false
    },
    productStatus:{
        type: Boolean,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: String,
        allowNull: false,
        defaultValue: false
    },
    company_id: {
        type: String,
        allowNull: false
    },
    category: {
        type: String,
        allowNull: false
    },
    createdAt: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now()
    },
    user_id: {
        type: String,
        allowNull: false
    },
})

productSchema.associate = (models) => {
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


const Product = mongoose.model("Product", productSchema);

export default Product;