const { DataTypes } = require('sequelize'); //
const sequelize = require('../config');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roles: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    verificationCode: {
        type: DataTypes.CHAR(6),
        allowNull: true,
    },
    codeExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'user',
    timestamps: false, // Disable timestamps if not needed
});

module.exports = User;