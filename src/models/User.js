import db from '../config/db.js'
import DataType from 'sequelize'
import bcrypt from 'bcrypt'



const userSchema = db.define('user', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    email: {
        type: DataType.STRING,
        allowNull: false
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    confirm: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    token: {
        type: DataType.STRING,
        allowNull: true
    },

}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },

    timestamps: true

});
userSchema.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.prototype.changePassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
    await this.save();
}

export default userSchema;