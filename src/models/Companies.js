import db from '../config/db.js'
import DataType from 'sequelize'
import User from './User.js'

const companiesSchema = db.define('companies', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyName: {
        type: DataType.STRING,
        allowNull: false
    },
    companyCountry: {
        type: DataType.STRING,
        allowNull: false
    },
    productType: {
        type: DataType.STRING,
        allowNull: false
    },
    companyPhone: {
        type: DataType.STRING,
        allowNull: false
    },
    companyContact: {
        type: DataType.STRING,
        allowNull: false
    },
    companyRfc: {
        type: DataType.STRING,
        allowNull: false
    },
    status: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    user_id: {
        type: DataType.INTEGER,
        allowNull: false
    },

})

 companiesSchema.associate = (models) => {
    companiesSchema.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    })
}
 
export default companiesSchema;
