import mongoose from 'mongoose';
import RolSchema from './Rol.js';
import bcrypt from 'bcrypt';

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
    pdf: {
        type: String,
        allowNull: false
    },
    status: {
        type: String,
        allowNull: false,
        defaultValue: false
    },
    user_id: {
        type: String,
        allowNull: false
    },
    email: {
        type: String,
        allowNull: false
    },
    password: {
        type: String,
        allowNull: false
    },
    rol_id: {
        type: String,
        allowNull: true
    }

})

companiesSchema.associate = (models) => {
    companiesSchema.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    })
}

RolSchema.associate = (models) => {
    RolSchema.hasMany(models.Companies, {
        foreignKey: 'rol_id'
    })
}
companiesSchema.pre('save', async function (next) {
    const company = this;
    if (!company.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(company.password, salt);
    company.password = hash;
    next();
}
)

companiesSchema.methods.validPassword = async function (password) {
    console.log('this is', this.password)
    return await bcrypt.compare(password, this.password);
};


const Companies = mongoose.model("Company", companiesSchema);

export default Companies;