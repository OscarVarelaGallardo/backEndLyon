import db from '../config/db.js'
import DataType from 'sequelize'
import bcrypt from 'bcrypt'
const User = db.define('user', {
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
    jwt: {
        type: DataType.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    rol_id: {
        type: DataType.INTEGER,
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
User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
User.prototype.changePassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
    await this.save();
}
User.associate = (models) => {
    User.hasMany(models.Products, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    })
    User.belongsTo(models.Rol, {
        foreignKey: 'rol_id',
        onDelete: 'CASCADE'
    })
}

export default User;