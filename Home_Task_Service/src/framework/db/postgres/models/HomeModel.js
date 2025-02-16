const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Home', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        zipCodeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'home',
    });
};
