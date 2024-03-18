import db from '../config/db.js'
import DataType from 'sequelize'
import Users from './User.js'
import Products from './Product.js'
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

Users.associate = (models) => {
    Users.belongsTo(models.User, {
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