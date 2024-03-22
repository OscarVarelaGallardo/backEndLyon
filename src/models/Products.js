import DataType from 'sequelize'
import Users from './User.js'
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        allowNull: false
    },
    price: {
        type: Number,
        allowNull: false
    },
    image: {
        type: String,
        allowNull: false
    },
    stock: {
        type:Number,
        allowNull: false
    },

    description: {
        type: String,
        allowNull: false
    },
    productStatus:{
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: Boolean,
        allowNull: false,
        defaultValue: false
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