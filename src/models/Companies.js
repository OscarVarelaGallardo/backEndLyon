import db from '../config/db.js'
import DataType from 'sequelize'

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
/*     userId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    } */

})

/* companiesSchema.associate = (models) => {
    companiesSchema.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    })
}
 */
export default companiesSchema;
