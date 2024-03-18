import db from '../config/db.js'
import DataType from 'sequelize'
import User from '../models/User.js'
import Products from '../models/Products.js'
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
   
})

User.associate = (models) => {
    User.hasMany(models.Coments, {
        foreignKey: 'user_Id',
        onDelete: 'CASCADE'
    })
}

Products.associate = (models) => {
    Products.belongsTo(models.Product, {
        foreignKey: 'product_Id',
        onDelete: 'CASCADE'
    })
}


export default Coments