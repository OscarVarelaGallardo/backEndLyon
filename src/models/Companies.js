import db from '../config/db.js'
import DataType from 'sequelize'

const Companies = db.define('companies', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyName: {
        type: DataType.STRING,
        allowNull: false
    },
    companyDescription: {
        type: DataType.STRING,
        allowNull: false
    },
    companyAddress: {
        type: DataType.STRING,
        allowNull: false
    },
    companyPhone: {
        type: DataType.STRING,
        allowNull: false
    },
    companyEmail: {
        type: DataType.STRING,
        allowNull: false
    },
    companyWeb: {
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

Companies.associate = (models) => {
    Companies.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    })
}

export default Companies;
