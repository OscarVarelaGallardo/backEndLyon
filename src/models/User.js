import db from '../config/db.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        allowNull: false,
        required: true
    },
    email: {
        type: String,
        allowNull: false
    },
    password: {
        type: String,
        allowNull: false
    },
    confirm: {
        type: Boolean,
        allowNull: false,
        defaultValue: false
    },
    token: {
        type: String,
        allowNull: true
    },
    jwt: {
        type: String,
        allowNull: true
    },
    createdAt: {
        type: Date,
        allowNull: false,
        defaultValue:   Date.now()
    },
    updatedAt: {
        type: Date,
        allowNull: false,
        defaultValue: Date.now()
    },
    rol_id: {
        type: Number,
        allowNull: false
    }

}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },

    timestamps: true

});

userSchema.methods.validPassword = async function (password) {
    console.log('this is', this.password)
    return await bcrypt.compare(password, this.password);
};

userSchema.associate = (models) => {
    Rol.hasMany(models.User, {
        foreignKey: 'rol_id',
        onDelete: 'CASCADE'
    })

}



const Usuario = mongoose.model("User", userSchema);

export default Usuario;