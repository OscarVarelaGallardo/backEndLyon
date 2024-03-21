import mongoose from 'mongoose';

const companiesSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyCountry: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        allowNull: false
    },
    companyPhone: {
        type: String,
        allowNull: false
    },
    companyContact: {
        type: String,
        allowNull: false
    },
    companyRfc: {
        type: String,
        allowNull: false
    },
    status: {
        type: Boolean,
        allowNull: false,
        defaultValue: false
    },
    user_id: {
        type: Number,
        allowNull: false
    },

})

 companiesSchema.associate = (models) => {
    companiesSchema.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    })
}

const Companies = mongoose.model("Company", companiesSchema);

export default Companies;