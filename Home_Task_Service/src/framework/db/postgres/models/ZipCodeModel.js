const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('ZipCode', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        postalCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'zipcode',
    });
};
